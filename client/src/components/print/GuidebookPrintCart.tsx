'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useAccountStore } from '@/features/account/accountStore';
import { usePrintCartStore } from '@/features/basket/printCartStore';
import { guidebookService } from '@/services/guidebookService';
import type { Order } from '@/types';

function formatCurrency(value: number) {
  return `${value.toLocaleString()}원`;
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

function getActiveView(value: string | null) {
  if (value === 'history' || value === 'sales') {
    return value;
  }

  return 'order';
}

export function GuidebookPrintCart() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [didSetInitialSelection, setDidSetInitialSelection] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderError, setOrderError] = useState('');
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const currentUser = useAccountStore((state) => state.currentUser);
  const loadCurrentUser = useAccountStore((state) => state.loadCurrentUser);
  const currentUserId = currentUser?.id;
  const cartItems = usePrintCartStore((state) => state.items);
  const error = usePrintCartStore((state) => state.error);
  const loading = usePrintCartStore((state) => state.loading);
  const loadCart = usePrintCartStore((state) => state.loadCart);
  const clearCart = usePrintCartStore((state) => state.clearCart);
  const removeCartGuidebook = usePrintCartStore((state) => state.removeGuidebook);
  const updateCartQuantity = usePrintCartStore((state) => state.updateQuantity);
  const activeView = getActiveView(searchParams.get('view'));

  useEffect(() => {
    loadCurrentUser();
  }, [loadCurrentUser]);

  useEffect(() => {
    if (currentUserId) {
      void loadCart();
    }
  }, [currentUserId, loadCart]);

  useEffect(() => {
    void loadOrders();
    void loadMyOrders();
  }, [currentUserId]);

  useEffect(() => {
    const guidebookIds = cartItems.map((item) => item.guidebookId);

    if (!didSetInitialSelection && guidebookIds.length > 0) {
      setSelectedIds(guidebookIds);
      setDidSetInitialSelection(true);
      return;
    }

    setSelectedIds((previous) => previous.filter((id) => guidebookIds.includes(id)));
  }, [cartItems, didSetInitialSelection]);

  const allSelected = cartItems.length > 0 && cartItems.every((item) => selectedIds.includes(item.guidebookId));
  const selectedItems = cartItems.filter((item) => selectedIds.includes(item.guidebookId));
  const selectedCount = selectedItems.length;
  const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const salesOrders = orders.filter((order) => order.creatorId === currentUserId);
  const salesTotalPrice = salesOrders.reduce((sum, order) => sum + order.totalPrice, 0);
  const myOrderTotalPrice = myOrders.reduce((sum, order) => sum + order.totalPrice, 0);

  const selectedIdSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  async function loadOrders() {
    setOrderError('');

    try {
      setOrders(await guidebookService.getOrders());
    } catch {
      setOrderError('주문 목록을 불러오지 못했습니다.');
    }
  }

  async function loadMyOrders() {
    if (!currentUserId) {
      setMyOrders([]);
      return;
    }

    setOrderError('');

    try {
      setMyOrders(await guidebookService.getMyOrders());
    } catch {
      setOrderError('내 주문내역을 불러오지 못했습니다.');
    }
  }

  function toggleAll() {
    setSelectedIds(allSelected ? [] : cartItems.map((item) => item.guidebookId));
  }

  function toggleGuidebook(guidebookId: number) {
    setSelectedIds((previous) => (
      previous.includes(guidebookId)
        ? previous.filter((id) => id !== guidebookId)
        : [...previous, guidebookId]
    ));
  }

  async function updateQuantity(guidebookId: number, amount: number) {
    const currentItem = cartItems.find((item) => item.guidebookId === guidebookId);
    const nextQuantity = Math.max(1, (currentItem?.quantity ?? 1) + amount);

    await updateCartQuantity(guidebookId, nextQuantity);
  }

  async function removeGuidebook(guidebookId: number) {
    await removeCartGuidebook(guidebookId);
    setSelectedIds((previous) => previous.filter((id) => id !== guidebookId));
  }

  async function clearPrintCart() {
    await clearCart();
    setSelectedIds([]);
    setDidSetInitialSelection(false);
  }

  async function submitPrintOrder() {
    if (selectedItems.length === 0) {
      return;
    }

    try {
      setIsSubmittingOrder(true);
      setOrderError('');

      if (!currentUserId) {
        setOrderError('로그인이 필요합니다.');
        return;
      }

      const createdOrders = await Promise.all(selectedItems.map((item) => (
        guidebookService.createOrder({
          consumerId: currentUserId,
          guidebookId: item.guidebookId,
          quantity: item.quantity,
          selectedLayoutType: '기본 인쇄형',
          shippingMemo: 'TripStack 데모 인쇄 주문',
          totalPrice: item.quantity * item.price,
        })
      )));

      await Promise.all(selectedItems.map((item) => removeCartGuidebook(item.guidebookId)));
      setSelectedIds([]);
      setOrders((previous) => [...createdOrders, ...previous]);
      setMyOrders((previous) => [...createdOrders, ...previous]);
      setIsSubmitted(true);
      router.push('/print-cart?view=history');
    } catch {
      setOrderError('인쇄 주문을 생성하지 못했습니다.');
    } finally {
      setIsSubmittingOrder(false);
    }
  }

  if (loading) {
    return <p className="empty-state">인쇄 장바구니를 불러오는 중입니다.</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <section className="print-cart-view" aria-label="가이드북 인쇄 장바구니">
      <div className="print-cart-heading">
        <span>Print cart</span>
        <h2>주문목록</h2>
        <p>인쇄 주문을 만들고, 내 가이드북에 들어온 판매 주문을 확인합니다.</p>
      </div>

      <div className="print-cart-tabs" role="tablist" aria-label="인쇄 주문 메뉴">
        <button
          className={activeView === 'order' ? 'active' : ''}
          type="button"
          onClick={() => router.push('/print-cart?view=order')}>
          인쇄하기
        </button>
        <button
          className={activeView === 'history' ? 'active' : ''}
          type="button"
          onClick={() => router.push('/print-cart?view=history')}>
          주문내역
        </button>
        <button
          className={activeView === 'sales' ? 'active' : ''}
          type="button"
          onClick={() => router.push('/print-cart?view=sales')}>
          판매목록
        </button>
      </div>

      {orderError && <p className="error-message">{orderError}</p>}

      {activeView === 'order' && (
        cartItems.length === 0 ? (
          <div className="print-cart-empty">
            <strong>담아둔 가이드북이 없습니다.</strong>
            <p>가이드북 상세화면에서 인쇄목록에 담기를 누르면 이곳에 표시됩니다.</p>
          </div>
        ) : (
          <div className="print-cart-layout">
            <div className="print-cart-table-panel">
              <div className="print-cart-table-toolbar">
                <label>
                  <input type="checkbox" checked={allSelected} onChange={toggleAll} />
                  <span>전체 선택</span>
                </label>
                <button type="button" onClick={() => void clearPrintCart()}>
                  전체삭제
                </button>
              </div>

              <div className="print-cart-list">
                {cartItems.map((item) => {
                  const isSelected = selectedIdSet.has(item.guidebookId);

                  return (
                    <article className={isSelected ? 'print-cart-row selected' : 'print-cart-row'} key={item.id}>
                      <input
                        type="checkbox"
                        aria-label={`${item.title} 선택`}
                        checked={isSelected}
                        onChange={() => toggleGuidebook(item.guidebookId)}
                      />
                      <img src={item.coverImageUrl} alt={`${item.title} cover`} />
                      <div className="print-cart-info">
                        <strong>{item.title}</strong>
                        <p>{item.creatorName} · {item.region}, {item.country}</p>
                        <span>단가 {formatCurrency(item.price)}</span>
                        <em>주문목록 대기중</em>
                      </div>
                      <div className="print-cart-quantity" aria-label={`${item.title} 출력 부수`}>
                        <button type="button" onClick={() => void updateQuantity(item.guidebookId, -1)}>-</button>
                        <strong>{item.quantity}</strong>
                        <button type="button" onClick={() => void updateQuantity(item.guidebookId, 1)}>+</button>
                      </div>
                      <strong className="print-cart-price">{formatCurrency(item.quantity * item.price)}</strong>
                      <button className="print-cart-remove" type="button" onClick={() => void removeGuidebook(item.guidebookId)}>
                        제거하기
                      </button>
                    </article>
                  );
                })}
              </div>
            </div>

            <aside className="print-cart-summary" aria-label="주문 요약">
              <h3>주문 요약</h3>
              <dl>
                <div>
                  <dt>선택 가이드북</dt>
                  <dd>{selectedCount}개</dd>
                </div>
                <div>
                  <dt>총 출력 부수</dt>
                  <dd>{totalQuantity}부</dd>
                </div>
                <div>
                  <dt>상품 금액</dt>
                  <dd>{formatCurrency(totalPrice)}</dd>
                </div>
                <div className="total">
                  <dt>총 금액</dt>
                  <dd>{formatCurrency(totalPrice)}</dd>
                </div>
              </dl>
              <button type="button" disabled={selectedCount === 0 || isSubmittingOrder} onClick={() => void submitPrintOrder()}>
                {isSubmittingOrder ? '주문 생성 중' : '인쇄 주문하기'}
              </button>
              {isSubmitted && <p>인쇄 주문이 생성되었습니다. 판매목록에서 주문 데이터를 확인할 수 있습니다.</p>}
            </aside>
          </div>
        )
      )}

      {activeView === 'history' && (
        <div className="sales-order-panel">
          <div className="sales-order-summary">
            <div>
              <span>Order history</span>
              <strong>내 주문내역</strong>
            </div>
            <p>{myOrders.length}건 · {formatCurrency(myOrderTotalPrice)}</p>
          </div>

          {myOrders.length === 0 ? (
            <div className="print-cart-empty">
              <strong>아직 주문한 가이드북이 없습니다.</strong>
              <p>인쇄하기 탭에서 가이드북을 주문하면 이곳에서 주문상태를 확인할 수 있습니다.</p>
            </div>
          ) : (
            <div className="sales-order-table-wrap">
              <table className="sales-order-table order-history-table">
                <thead>
                  <tr>
                    <th>주문 가이드북</th>
                    <th>크리에이터</th>
                    <th>지역</th>
                    <th>수량</th>
                    <th>금액</th>
                    <th>주문상태</th>
                    <th>주문일</th>
                  </tr>
                </thead>
                <tbody>
                  {myOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.guidebookTitle}</td>
                      <td>{order.creatorName}</td>
                      <td>{order.region}, {order.country}</td>
                      <td>{order.quantity}부</td>
                      <td>{formatCurrency(order.totalPrice)}</td>
                      <td>
                        <span className={`sales-order-status ${order.status}`}>{formatOrderStatus(order.status)}</span>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString('ko-KR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeView === 'sales' && (
        <div className="sales-order-panel">
          <div className="sales-order-summary">
            <div>
              <span>Sales orders</span>
              <strong>{currentUser?.displayName ?? currentUser?.username ?? '내'} 판매목록</strong>
            </div>
            <p>{salesOrders.length}건 · {formatCurrency(salesTotalPrice)}</p>
          </div>

          {salesOrders.length === 0 ? (
            <div className="print-cart-empty">
              <strong>아직 판매 주문이 없습니다.</strong>
              <p>구매자가 내 가이드북을 인쇄 주문하면 이곳에 표시됩니다.</p>
            </div>
          ) : (
            <div className="sales-order-table-wrap">
              <table className="sales-order-table">
                <thead>
                  <tr>
                    <th>선택된 가이드북</th>
                    <th>타이틀</th>
                    <th>구매자 ID</th>
                    <th>판매수량</th>
                    <th>금액</th>
                    <th>상태</th>
                    <th>주문일</th>
                  </tr>
                </thead>
                <tbody>
                  {salesOrders.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.guidebookId}</td>
                      <td>{order.guidebookTitle}</td>
                      <td>
                        <strong className="sales-order-buyer-id">{order.consumerId}</strong>
                        <span>{order.consumerName}</span>
                      </td>
                      <td>{order.quantity}부</td>
                      <td>{formatCurrency(order.totalPrice)}</td>
                      <td>
                        <span className={`sales-order-status ${order.status}`}>{formatOrderStatus(order.status)}</span>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString('ko-KR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
