declare global {
  interface Window {
    dashboard?: {
      get: (module: string) => Promise<() => React.ComponentType>;
      init: (shared: any) => Promise<void>;
    };
    transactions?: {
      get: (module: string) => Promise<() => React.ComponentType>;
      init: (shared: any) => Promise<void>;
    };
    transfers?: {
      get: (module: string) => Promise<() => React.ComponentType>;
      init: (shared: any) => Promise<void>;
    };
    investments?: {
      get: (module: string) => Promise<() => React.ComponentType>;
      init: (shared: any) => Promise<void>;
    };
  }
}

export {};
