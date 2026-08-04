'use client';

import { useEffect, useMemo, useState } from 'react';

import {
  BASKET_GUIDEBOOK_EVENT_NAME,
  emitBasketGuidebookIds,
} from '@/features/basket/guidebookBasket';
import { cartService } from '@/services/cartService';
import type { PrintCartItem } from '@/types';

function formatCurrency(value: number) {
  return `${value.toLocaleString()}원`;
}

export function GuidebookPrintCart() {
  const [cartItems, setCartItems] = useState<PrintCartItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    async function loadCartItems() {
      try {
        setLoading(true);
        setError('');
        const items = await cartService.getItems();
        const ids = items.map((item) => item.guidebookId);
        setCartItems(items);
        setSelectedIds(ids);
        emitBasketGuidebookIds(ids);
      } catch {
        setError('담아둔 가이드북 정보를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    }

    void loadCartItems();

    function syncBasket(event: Event) {
      const nextIds = (event as CustomEvent<number[]>).detail ?? [];
      setSelectedIds((previous) => previous.filter((id) => nextIds.includes(id)));
      void cartService.getItems().then(setCartItems).catch(() => setError('담아둔 가이드북 정보를 불러오지 못했습니다.'));
    }

    window.addEventListener(BASKET_GUIDEBOOK_EVENT_NAME, syncBasket);
    return () => window.removeEventListener(BASKET_GUIDEBOOK_EVENT_NAME, syncBasket);
  }, []);

  const allSelected = cartItems.length > 0 && cartItems.every((item) => selectedIds.includes(item.guidebookId));
  const selectedItems = cartItems.filter((item) => selectedIds.includes(item.guidebookId));
  const selectedCount = selectedItems.length;
  const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const selectedIdSet = useMemo(() => new Set(selectedIds), [selectedIds]);

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

    setCartItems((previous) => previous.map((item) => (
      item.guidebookId === guidebookId ? { ...item, quantity: nextQuantity } : item
    )));

    try {
      const updated = await cartService.updateQuantity(guidebookId, nextQuantity);
      setCartItems((previous) => previous.map((item) => (
        item.guidebookId === guidebookId ? updated : item
      )));
    } catch {
      setError('수량을 저장하지 못했습니다.');
    }
  }

  async function removeGuidebook(guidebookId: number) {
    await cartService.removeItem(guidebookId);
    const nextItems = cartItems.filter((item) => item.guidebookId !== guidebookId);
    setCartItems(nextItems);
    setSelectedIds((previous) => previous.filter((id) => id !== guidebookId));
    emitBasketGuidebookIds(nextItems.map((item) => item.guidebookId));
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
        <h2>담아둔 가이드북 인쇄</h2>
        <p>저장한 가이드북을 선택하고 출력 부수를 조정해 인쇄 주문을 준비합니다.</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="print-cart-empty">
          <strong>담아둔 가이드북이 없습니다.</strong>
          <p>가이드북 상세화면에서 내 가이드북에 담기를 누르면 이곳에 표시됩니다.</p>
        </div>
      ) : (
        <div className="print-cart-layout">
          <div className="print-cart-table-panel">
            <div className="print-cart-table-toolbar">
              <label>
                <input type="checkbox" checked={allSelected} onChange={toggleAll} />
                <span>전체 선택</span>
              </label>
              <strong>{cartItems.length}개 상품</strong>
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
            <button type="button" disabled={selectedCount === 0} onClick={() => setIsSubmitted(true)}>
              인쇄 주문하기
            </button>
            {isSubmitted && <p>인쇄 주문 흐름이 준비되었습니다. 결제/배송 단계는 데모에서 생략합니다.</p>}
          </aside>
        </div>
      )}
    </section>
  );
}
