'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { AppHeader } from '@/components/common/AppHeader';

export function LoginForm() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    console.log('입력한 아이디:', id);
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

          <div className="login-action-row">
            <button className="login-submit" type="submit">
              로그인하기
            </button>
            <button className="signin-submit" type="button">
              회원가입하기
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
