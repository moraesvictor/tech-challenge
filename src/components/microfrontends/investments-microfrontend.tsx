'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState, useEffect } from 'react';

const InvestmentsContainerLocal = dynamic(
  () => import('@/modules/investments/investmets-container').then(mod => ({ default: mod.InvestmentsContainer })),
  { ssr: false }
);

export function InvestmentsMicrofrontend() {
  const [RemoteComponent, setRemoteComponent] = useState<React.ComponentType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const remote = (window as any).investments;
        if (remote && remote.get) {
          remote.get('./InvestmentsContainer')
            .then((factory: any) => {
              const Component = factory();
              setRemoteComponent(() => Component);
            })
            .catch(() => {
              console.log('Remote investments not available, using local module');
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log('Remote investments not available, using local module');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const Component = RemoteComponent || InvestmentsContainerLocal;

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
