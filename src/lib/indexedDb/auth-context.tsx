"use client";
import React, { createContext, useContext } from "react";
import { useAuthIndexedDB } from "./useAuthIndexedDb";

const AuthContext = createContext<ReturnType<typeof useAuthIndexedDB> | null>(
  null
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuthIndexedDB();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
