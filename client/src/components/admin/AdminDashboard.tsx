'use client';

import { useEffect, useMemo, useState } from 'react';

import { guidebookService } from '@/services/guidebookService';
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
    return '완료';
  }

  if (status === 'processing') {
    return '인쇄준비';
  }

  return '주문접수';
}

export function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [guidebooks, setGuidebooks] = useState<Guidebook[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAdminData() {
      try {
        setLoading(true);
        setErrorMessage('');
        const [userData, guidebookData, orderData] = await Promise.all([
          guidebookService.getCreators(),
          guidebookService.getGuidebooks(),
          guidebookService.getOrders(),
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
                  <td>{formatOrderStatus(order.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
