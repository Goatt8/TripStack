'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { LoginForm } from '@/components/auth/LoginForm';
import { useAccountStore } from '@/features/account/accountStore';

export default function LoginPage() {
  const router = useRouter();
  const currentUser = useAccountStore((state) => state.currentUser);
  const loadCurrentUser = useAccountStore((state) => state.loadCurrentUser);

  useEffect(() => {
    loadCurrentUser();
  }, [loadCurrentUser]);

  useEffect(() => {
    if (currentUser) {
      router.replace('/consumer');
    }
  }, [currentUser, router]);

  return <LoginForm />;
}
