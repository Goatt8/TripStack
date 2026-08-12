'use client';

import { useEffect, useMemo, useState } from 'react';

import { useAccountStore } from '@/features/account/accountStore';
import { adminService } from '@/services/adminService';
import type { Guidebook, Order, User } from '@/types';

function formatCurrency(value: number) {
  return `${value.toLocaleString()}원`;
}

function formatCompactCount(count: number) {
  if (count >= 10000) {
    return `${Math.floor(count / 10000)}만`;
  }

  return count.toLocaleString();
}

function formatOrderStatus(status: Order['status']) {
  if (status === 'completed') {
    return '배송완료';
  }

  if (status === 'shipping') {
    return '배송중';
  }

  if (status === 'producing') {
    return '인쇄중';
  }

  return '결제 대기중';
}

const orderStatusOptions: Array<{ label: string; value: Order['status'] }> = [
  { label: '결제 대기중', value: 'pending' },
  { label: '인쇄중', value: 'producing' },
  { label: '배송중', value: 'shipping' },
  { label: '배송완료', value: 'completed' },
];

type AdminTab = 'users' | 'guidebooks' | 'orders';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [guidebooks, setGuidebooks] = useState<Guidebook[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const currentUser = useAccountStore((state) => state.currentUser);

  useEffect(() => {
    async function loadAdminData() {
      try {
        setLoading(true);
        setErrorMessage('');
        const [userData, guidebookData, orderData] = await Promise.all([
          adminService.getUsers(),
          adminService.getGuidebooks(),
          adminService.getOrders(),
        ]);
        setUsers(userData);
        setGuidebooks(guidebookData);
        setOrders(orderData);
      } catch {
        setErrorMessage('관리자 데이터를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    }

    void loadAdminData();
  }, []);

  const totalSales = useMemo(
    () => orders.reduce((sum, order) => sum + order.totalPrice, 0),
    [orders],
  );

  async function updateUser(user: User) {
    try {
      setErrorMessage('');
      const updatedUser = await adminService.updateUser(user.id, {
        displayName: user.displayName || user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        profileImageUrl: user.profileImageUrl || user.avatarUrl,
      });
      setUsers((previous) => previous.map((item) => (item.id === updatedUser.id ? updatedUser : item)));
      setEditingUser(null);
    } catch {
      setErrorMessage('사용자 정보를 수정하지 못했습니다.');
    }
  }

  async function deleteUser(user: User) {
    if (!window.confirm(`${user.displayName || user.username} 계정을 삭제할까요?`)) {
      return;
    }

    try {
      setErrorMessage('');
      await adminService.deleteUser(user.id);
      setUsers((previous) => previous.filter((item) => item.id !== user.id));
    } catch {
      setErrorMessage('연결된 가이드북 또는 주문이 있는 계정은 삭제할 수 없습니다.');
    }
  }

  async function updateOrderStatus(order: Order, status: Order['status']) {
    try {
      setErrorMessage('');
      const updatedOrder = await adminService.updateOrderStatus(order.id, status);
      setOrders((previous) => previous.map((item) => (item.id === updatedOrder.id ? updatedOrder : item)));
    } catch {
      setErrorMessage('주문 상태를 변경하지 못했습니다.');
    }
  }

  if (loading) {
    return <p className="empty-state">관리자 데이터를 불러오는 중입니다.</p>;
  }

  return (
    <section className="admin-dashboard" aria-label="TripStack 관리자페이지">
      <div className="admin-heading">
        <span>Admin</span>
        <h2>서비스 운영 현황</h2>
        <p>사용자, 가이드북, 주문 데이터를 한 화면에서 확인합니다.</p>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="admin-stat-grid">
        <article>
          <span>Users</span>
          <strong>{users.length.toLocaleString()}</strong>
        </article>
        <article>
          <span>Guidebooks</span>
          <strong>{guidebooks.length.toLocaleString()}</strong>
        </article>
        <article>
          <span>Orders</span>
          <strong>{orders.length.toLocaleString()}</strong>
        </article>
        <article>
          <span>Sales</span>
          <strong>{formatCurrency(totalSales)}</strong>
        </article>
      </div>

      <div className="admin-table-tabs" role="tablist" aria-label="관리자 데이터 카테고리">
        <button
          className={activeTab === 'users' ? 'active' : ''}
          type="button"
          role="tab"
          aria-selected={activeTab === 'users'}
          onClick={() => setActiveTab('users')}>
          사용자목록
        </button>
        <button
          className={activeTab === 'guidebooks' ? 'active' : ''}
          type="button"
          role="tab"
          aria-selected={activeTab === 'guidebooks'}
          onClick={() => setActiveTab('guidebooks')}>
          가이드북 목록
        </button>
        <button
          className={activeTab === 'orders' ? 'active' : ''}
          type="button"
          role="tab"
          aria-selected={activeTab === 'orders'}
          onClick={() => setActiveTab('orders')}>
          주문목록
        </button>
      </div>

      {activeTab === 'users' && (
        <div className="admin-table-section">
        <div className="admin-section-title">
          <span>User table</span>
          <h3>사용자 목록</h3>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>이름</th>
                <th>로그인 ID</th>
                <th>이메일</th>
                <th>Admin</th>
                <th>출판수</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>#{user.id}</td>
                  <td>{user.displayName || user.username}</td>
                  <td>{user.loginId}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? 'Y' : 'N'}</td>
                  <td>{formatCompactCount(user.followerCount)}</td>
                  <td>
                    <div className="admin-row-actions">
                      <button type="button" onClick={() => setEditingUser(user)}>
                        수정
                      </button>
                      <button
                        className="danger"
                        type="button"
                        disabled={user.id === currentUser?.id}
                        onClick={() => void deleteUser(user)}>
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {activeTab === 'guidebooks' && (
        <div className="admin-table-section">
        <div className="admin-section-title">
          <span>Guidebook table</span>
          <h3>가이드북 목록</h3>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>타이틀</th>
                <th>크리에이터</th>
                <th>지역</th>
                <th>조회수</th>
                <th>가격</th>
              </tr>
            </thead>
            <tbody>
              {guidebooks.map((guidebook) => (
                <tr key={guidebook.id}>
                  <td>#{guidebook.id}</td>
                  <td>{guidebook.title}</td>
                  <td>{guidebook.creatorName}</td>
                  <td>{guidebook.region}, {guidebook.country}</td>
                  <td>{formatCompactCount(guidebook.printCount)}</td>
                  <td>{formatCurrency(guidebook.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {activeTab === 'orders' && (
        <div className="admin-table-section">
        <div className="admin-section-title">
          <span>Order table</span>
          <h3>주문 목록</h3>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>가이드북</th>
                <th>구매자</th>
                <th>판매자</th>
                <th>수량</th>
                <th>금액</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.guidebookTitle}</td>
                  <td>{order.consumerName}</td>
                  <td>{order.creatorName}</td>
                  <td>{order.quantity}부</td>
                  <td>{formatCurrency(order.totalPrice)}</td>
                  <td>
                    <select
                      className={`admin-order-status-select ${order.status}`}
                      value={order.status}
                      aria-label={`${order.guidebookTitle} 주문 상태 변경`}
                      onChange={(event) => void updateOrderStatus(order, event.target.value as Order['status'])}>
                      {orderStatusOptions.map((option) => (
                        <option value={option.value} key={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {editingUser && (
        <AdminUserEditModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={(user) => void updateUser(user)}
        />
      )}
    </section>
  );
}

type AdminUserEditModalProps = {
  onClose: () => void;
  onSave: (user: User) => void;
  user: User;
};

function AdminUserEditModal({ onClose, onSave, user }: AdminUserEditModalProps) {
  const [displayName, setDisplayName] = useState(user.displayName || user.username);
  const [email, setEmail] = useState(user.email);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);
  const [profileImageUrl, setProfileImageUrl] = useState(user.profileImageUrl || user.avatarUrl);

  function handleSave() {
    onSave({
      ...user,
      avatarUrl: profileImageUrl,
      displayName,
      email,
      isAdmin,
      profileImageUrl,
      username: displayName,
    });
  }

  return (
    <div className="admin-modal-layer" role="presentation" onMouseDown={onClose}>
      <section
        className="admin-user-modal"
        role="dialog"
        aria-modal="true"
        aria-label="사용자 정보 수정"
        onMouseDown={(event) => event.stopPropagation()}>
        <div className="admin-modal-header">
          <div>
            <span>User edit</span>
            <h3>계정정보 수정</h3>
          </div>
          <button type="button" aria-label="사용자 수정 닫기" onClick={onClose}>×</button>
        </div>

        <div className="admin-user-form">
          <label>
            <span>디스플레이명</span>
            <input value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
          </label>
          <label>
            <span>이메일</span>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label>
            <span>프로필 이미지</span>
            <input value={profileImageUrl} onChange={(event) => setProfileImageUrl(event.target.value)} />
          </label>
          <label className="admin-check-field">
            <input type="checkbox" checked={isAdmin} onChange={(event) => setIsAdmin(event.target.checked)} />
            <span>관리자 권한 부여</span>
          </label>
        </div>

        <div className="admin-modal-footer">
          <button type="button" onClick={onClose}>취소</button>
          <button type="button" onClick={handleSave}>저장</button>
        </div>
      </section>
    </div>
  );
}
