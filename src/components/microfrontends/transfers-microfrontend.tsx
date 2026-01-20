'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState, useEffect } from 'react';

const TransfersContainerLocal = dynamic(
  () => import('@/modules/transfers/transfers-container').then(mod => ({ default: mod.TransfersContainer })),
  { ssr: false }
);

export function TransfersMicrofrontend() {
  const [RemoteComponent, setRemoteComponent] = useState<React.ComponentType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const remote = (window as any).transfers;
        if (remote && remote.get) {
          remote.get('./TransfersContainer')
            .then((factory: any) => {
              const Component = factory();
              setRemoteComponent(() => Component);
            })
            .catch(() => {
              console.log('Remote transfers not available, using local module');
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log('Remote transfers not available, using local module');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const Component = RemoteComponent || TransfersContainerLocal;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
        </div>
      }
    >
      <Component />
    </Suspense>
  );
}
