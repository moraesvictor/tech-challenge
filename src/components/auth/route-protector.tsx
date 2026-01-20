'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/indexedDb/auth-context';

export function RouteProtector({ children }: { children: React.ReactNode }) {
  const { currentUser, ready } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  const publicRoutes = ['/home', '/'];
  const isPublicRoute = publicRoutes.includes(pathname);
  
  useEffect(() => {
    if (!ready) return;
    
    if (!isPublicRoute && !currentUser) {
      document.cookie = `auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `auth-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      router.push(`/home?redirect=${encodeURIComponent(pathname)}&auth=required`);
      return;
    }
    
    if (currentUser) {
      const expires = new Date();
      expires.setHours(expires.getHours() + 24);
      
      const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
      document.cookie = `auth-token=${currentUser.id}; expires=${expires.toUTCString()}; path=/; SameSite=Strict${secure}`;
      document.cookie = `auth-session=active; expires=${expires.toUTCString()}; path=/; SameSite=Strict${secure}`;
    }
  }, [currentUser, ready, isPublicRoute, pathname, router]);
  
  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
      </div>
    );
  }
  
  if (!isPublicRoute && !currentUser) {
    return null;
  }
  
  return <>{children}</>;
}
