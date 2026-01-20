import { useEffect, useRef, useState } from "react";

export type UserRecord = {
  id?: number;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: string;
};

const CURRENT_USER_KEY = "auth-current-user";

export function useAuthIndexedDB() {
  const dbRef = useRef<IDBDatabase | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentUser, setCurrentUser] = useState<UserRecord | null>(null);

  useEffect(() => {
    const openReq = indexedDB.open("auth-db", 1);

    openReq.onupgradeneeded = () => {
      const db = openReq.result;
      if (!db.objectStoreNames.contains("users")) {
        const store = db.createObjectStore("users", {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("email", "email", { unique: true });
      }
    };

    openReq.onsuccess = () => {
      dbRef.current = openReq.result;
      setReady(true);
    };

    openReq.onerror = () => {
      setError(openReq.error ?? new Error("IndexedDB open error"));
    };

    return () => {
      if (dbRef.current) {
        dbRef.current.close();
        dbRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const saved = localStorage.getItem(CURRENT_USER_KEY);
    if (saved) setCurrentUser(JSON.parse(saved));
  }, [ready]);

  const withStore = <T>(
    mode: IDBTransactionMode,
    cb: (store: IDBObjectStore) => IDBRequest | Promise<T>
  ) =>
    new Promise<T>((resolve, reject) => {
      const db = dbRef.current;
      if (!db) return reject(new Error("DB not initialized"));
      const tx = db.transaction("users", mode);
      const store = tx.objectStore("users");

      try {
        const result = cb(store);
        if ((result as IDBRequest).onsuccess !== undefined) {
          const req = result as IDBRequest;
          req.onsuccess = () => resolve(req.result as T);
          req.onerror = () => reject(req.error);
        } else if (result instanceof Promise) {
          (result as Promise<T>).then(resolve).catch(reject);
        } else {
          resolve(result as unknown as T);
        }
      } catch (err) {
        reject(err);
      }

      tx.onabort = () => reject(tx.error ?? new Error("transaction aborted"));
      tx.onerror = () => reject(tx.error);
    });

  const hashString = async (value: string) => {
    const enc = new TextEncoder();
    const data = enc.encode(value);
    const hashBuf = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuf));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const addUser = async (payload: {
    username: string;
    email: string;
    password: string;
  }) => {
    const passwordHash = await hashString(payload.password);
    const record: UserRecord = {
      username: payload.username,
      email: payload.email.toLowerCase(),
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    return withStore<IDBValidKey>("readwrite", (store) => store.add(record));
  };

  const getUserByEmail = async (
    email: string
  ): Promise<UserRecord | undefined> => {
    return withStore<UserRecord | undefined>("readonly", (store) => {
      const idx = store.index("email");
      return idx.get(email.toLowerCase());
    });
  };

  const validateCredentials = async (email: string, password: string) => {
    const user = await getUserByEmail(email);
    if (!user) return { valid: false, user: undefined };
    const hash = await hashString(password);
    return { valid: hash === user.passwordHash, user };
  };

  const login = async (email: string, password: string) => {
    const { valid, user } = await validateCredentials(email, password);
    if (valid && user) {
      setCurrentUser(user);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      
      const expires = new Date();
      expires.setHours(expires.getHours() + 24);
      
      const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
      document.cookie = `auth-token=${user.id}; expires=${expires.toUTCString()}; path=/; SameSite=Strict${secure}`;
      document.cookie = `auth-session=active; expires=${expires.toUTCString()}; path=/; SameSite=Strict${secure}`;
    }
    return { valid, user };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
    document.cookie = `auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `auth-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const getAllUsers = async () => {
    return withStore<UserRecord[]>("readonly", (store) => store.getAll());
  };

  const clear = async () => {
    return withStore<void>("readwrite", (store) => store.clear());
  };

  return {
    ready,
    error,
    currentUser,
    addUser,
    getUserByEmail,
    validateCredentials,
    getAllUsers,
    clear,
    login,
    logout,
  };
}
