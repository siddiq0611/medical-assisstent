'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuth(redirectTo?: string) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session && redirectTo) {
      router.push(redirectTo);
    }
  }, [session, status, router, redirectTo]);

  return {
    session,
    status,
    isLoading: status === 'loading',
    isAuthenticated: !!session,
    user: session?.user,
  };
}

export function useRequireAuth(redirectTo: string = '/auth/signin') {
  return useAuth(redirectTo);
}

export function useAuthRedirect(redirectTo: string = '/dashboard') {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    
    if (session) {
      router.push(redirectTo);
    }
  }, [session, status, router, redirectTo]);

  return {
    session,
    status,
    isLoading: status === 'loading',
    isAuthenticated: !!session,
  };
}