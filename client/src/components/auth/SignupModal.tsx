'use client';

import * as React from 'react';
import { useState } from 'react';

import { authService } from '@/services/authService';
import type { AuthSession } from '@/types';

type SignupModalProps = {
  onClose: () => void;
  onSignupSuccess: (session: AuthSession) => void;
};

export function SignupModal({ onClose, onSignupSuccess }: SignupModalProps) {
  const [loginId, setLoginId] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!loginId.trim() || !displayName.trim() || !email.trim() || !password || !passwordConfirm) {
      setErrorMessage('모든 항목을 입력해주세요.');
      return;
    }

    if (password !== passwordConfirm) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      const session = await authService.signup({
        displayName,
        email,
        loginId,
        password,
        adminCode: adminCode.trim() || undefined,
      });

      onSignupSuccess(session);
    } catch (_error) {
      setErrorMessage('회원가입에 실패했습니다. 아이디나 이메일을 확인해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-modal-layer" role="presentation" onMouseDown={onClose}>
      <section className="signup-modal" role="dialog" aria-modal="true" aria-labelledby="signup-title" onMouseDown={(event) => event.stopPropagation()}>
        <header className="signup-modal-header">
          <div>
            <p>TripStack Account</p>
            <h2 id="signup-title">회원가입</h2>
          </div>
          <button type="button" aria-label="회원가입 닫기" onClick={onClose}>
            ×
          </button>
        </header>

        <form className="signup-form" onSubmit={handleSignup}>
          <label className="login-field">
            <span>아이디</span>
            <input type="text" value={loginId} onChange={(event) => setLoginId(event.target.value)} required />
          </label>

          <label className="login-field">
            <span>닉네임</span>
            <input type="text" value={displayName} onChange={(event) => setDisplayName(event.target.value)} required />
          </label>

          <label className="login-field">
            <span>이메일주소</span>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>

          <label className="login-field">
            <span>비밀번호</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>

          <label className="login-field">
            <span>비밀번호 확인</span>
            <input type="password" value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} required />
          </label>

          <label className="login-field">
            <span>관리자 코드</span>
            <input
              type="text"
              value={adminCode}
              onChange={(event) => setAdminCode(event.target.value)}
              placeholder="관리자 계정 생성 시에만 입력"
            />
          </label>

          <div className="signup-modal-footer">
            {errorMessage && <p role="alert">{errorMessage}</p>}
            <button type="button" onClick={onClose}>
              취소
            </button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '저장 중' : '가입하기'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
