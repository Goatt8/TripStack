'use client';

import { FormEvent, useState } from 'react';

import { useAccountStore } from '@/features/account/accountStore';
import { authService } from '@/services/authService';

type AccountEditModalProps = {
  onClose: () => void;
};

export function AccountEditModal({ onClose }: AccountEditModalProps) {
  const currentUser = useAccountStore((state) => state.currentUser);
  const updateCurrentUser = useAccountStore((state) => state.updateCurrentUser);
  const [email, setEmail] = useState(currentUser?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = currentUser;

  if (!user) {
    return null;
  }

  const userId = user.id;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      setErrorMessage('이메일을 입력해주세요.');
      return;
    }

    if (newPassword || confirmPassword || currentPassword) {
      if (!currentPassword || !newPassword || !confirmPassword) {
        setErrorMessage('비밀번호를 변경하려면 현재 비밀번호와 새 비밀번호를 모두 입력해주세요.');
        return;
      }

      if (newPassword !== confirmPassword) {
        setErrorMessage('새 비밀번호와 확인값이 일치하지 않습니다.');
        return;
      }
    }

    try {
      setErrorMessage('');
      setIsSubmitting(true);
      const updatedUser = await authService.updateAccount(userId, {
        currentPassword: currentPassword || undefined,
        email,
        newPassword: newPassword || undefined,
      });
      updateCurrentUser(updatedUser);
      onClose();
    } catch {
      setErrorMessage('회원정보를 저장하지 못했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="profile-edit-layer" role="presentation" onMouseDown={onClose}>
      <section
        className="profile-edit-modal"
        role="dialog"
        aria-modal="true"
        aria-label="회원정보 수정"
        onMouseDown={(event) => event.stopPropagation()}>
        <div className="profile-edit-header">
          <div>
            <span>Account</span>
            <h2>회원정보 수정</h2>
          </div>
          <button type="button" aria-label="회원정보 수정 닫기" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="profile-edit-form" onSubmit={handleSubmit}>
          <label>
            <span>이메일</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="email@example.com"
            />
          </label>

          <label>
            <span>현재 비밀번호</span>
            <input
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              placeholder="비밀번호 변경 시 입력"
            />
          </label>

          <label>
            <span>새 비밀번호</span>
            <input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="새 비밀번호"
            />
          </label>

          <label>
            <span>새 비밀번호 확인</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="새 비밀번호 확인"
            />
          </label>

          <div className="profile-edit-footer">
            {errorMessage && <p>{errorMessage}</p>}
            <button type="button" onClick={onClose}>취소</button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '저장 중' : '저장'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
