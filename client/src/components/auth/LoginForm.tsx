'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { SignupModal } from '@/components/auth/SignupModal';
import { AppHeader } from '@/components/common/AppHeader';
import { useAccountStore } from '@/features/account/accountStore';
import { authService } from '@/services/authService';
import type { AuthSession } from '@/types';

export function LoginForm() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setAuthSession = useAccountStore((state) => state.setAuthSession);
  const router = useRouter();

  const saveAuthSession = (session: AuthSession) => {
    setAuthSession(session);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      const session = await authService.login({
        loginId: id,
        password,
      });

      saveAuthSession(session);
      router.push('/consumer');
    } catch (_error) {
      setErrorMessage('아이디 또는 비밀번호가 일치하지 않습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupSuccess = (session: AuthSession) => {
    saveAuthSession(session);
    setIsSignupOpen(false);
    router.push('/consumer');
  };

  return (
    <main className="app-shell">
      <AppHeader compact title="LOGIN" />

      <section className="login-panel">
        <form className="login-form" onSubmit={handleLogin}>
          <label className="login-field">
            <span>아이디</span>
            <input type="text" value={id} onChange={(event) => setId(event.target.value)} required />
          </label>

          <label className="login-field">
            <span>비밀번호</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>

          {errorMessage && <p className="login-error" role="alert">{errorMessage}</p>}

          <div className="login-action-row">
            <button className="login-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? '확인 중' : '로그인하기'}
            </button>
            <button className="signin-submit" type="button" onClick={() => setIsSignupOpen(true)}>
              회원가입하기
            </button>
          </div>
        </form>
      </section>

      {isSignupOpen && <SignupModal onClose={() => setIsSignupOpen(false)} onSignupSuccess={handleSignupSuccess} />}
    </main>
  );
}
