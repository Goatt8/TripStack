'use client';

import { ChangeEvent, FormEvent, useState } from 'react';

import { useAccountStore } from '@/features/account/accountStore';
import { authService } from '@/services/authService';

type ProfileEditModalProps = {
  onClose: () => void;
};

export function ProfileEditModal({ onClose }: ProfileEditModalProps) {
  const currentUser = useAccountStore((state) => state.currentUser);
  const updateCurrentUser = useAccountStore((state) => state.updateCurrentUser);
  const [displayName, setDisplayName] = useState(currentUser?.displayName || currentUser?.username || '');
  const [profileImageUrl, setProfileImageUrl] = useState(currentUser?.profileImageUrl || currentUser?.avatarUrl || '');
  const [imageLoadFailed, setImageLoadFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = currentUser;

  if (!user) {
    return null;
  }

  const userId = user.id;
  const profileInitial = (displayName || user.username || 'T').slice(0, 1).toUpperCase();

  function handleProfileImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setProfileImageUrl(String(reader.result ?? ''));
      setImageLoadFailed(false);
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!displayName.trim()) {
      setErrorMessage('디스플레이명을 입력해주세요.');
      return;
    }

    try {
      setErrorMessage('');
      setIsSubmitting(true);
      const updatedUser = await authService.updateProfile(userId, {
        displayName,
        profileImageUrl,
      });
      updateCurrentUser(updatedUser);
      onClose();
    } catch {
      setErrorMessage('프로필 정보를 저장하지 못했습니다.');
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
        aria-label="프로필 편집"
        onMouseDown={(event) => event.stopPropagation()}>
        <div className="profile-edit-header">
          <div>
            <span>Profile</span>
            <h2>프로필 편집</h2>
          </div>
          <button type="button" aria-label="프로필 편집 닫기" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="profile-edit-form" onSubmit={handleSubmit}>
          <div className="profile-edit-preview">
            <div className="profile-edit-avatar-preview">
              {(profileImageUrl || user.avatarUrl) && !imageLoadFailed ? (
                <img
                  src={profileImageUrl || user.avatarUrl}
                  alt=""
                  onError={() => setImageLoadFailed(true)}
                />
              ) : (
                <span>{profileInitial}</span>
              )}
            </div>
            <div>
              <strong>{displayName || user.username}</strong>
              <span>{user.loginId}</span>
            </div>
          </div>

          <label className="profile-image-upload">
            <span>프로필 사진 변경</span>
            <input type="file" accept="image/*" onChange={handleProfileImageChange} />
          </label>

          <label>
            <span>디스플레이명</span>
            <input
              type="text"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder="화면에 표시될 이름"
            />
          </label>

          <label>
            <span>프로필 이미지 경로</span>
            <input
              type="text"
              value={profileImageUrl}
              onChange={(event) => {
                setProfileImageUrl(event.target.value);
                setImageLoadFailed(false);
              }}
              placeholder="/images/users/profile.png"
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
