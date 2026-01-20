'use client';

import { useEffect, useState, ComponentType } from 'react';

interface DynamicRemoteProps {
  remote: string;
  module: string;
  fallback?: React.ReactNode;
}

export function DynamicRemote({ remote, module, fallback }: DynamicRemoteProps) {
  const [Component, setComponent] = useState<ComponentType | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadRemote = async () => {
      try {
        const container = await import(/* @vite-ignore */ remote);
        const factory = await container.get(module);
        const Component = factory();
        
        if (isMounted) {
          setComponent(() => Component);
          setLoading(false);
        }
      } catch (err) {
        console.error(`Failed to load remote ${remote}/${module}:`, err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to load remote'));
          setLoading(false);
        }
      }
    };

    loadRemote();

    return () => {
      isMounted = false;
    };
  }, [remote, module]);

  if (loading) {
    return fallback || (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-600">
          <p>Erro ao carregar microfrontend: {error.message}</p>
          <p className="text-sm mt-2">Tentando carregar módulo local...</p>
        </div>
      </div>
    );
  }

  if (!Component) {
    return fallback || null;
  }

  return <Component />;
}
