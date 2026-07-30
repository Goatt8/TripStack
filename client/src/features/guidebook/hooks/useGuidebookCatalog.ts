'use client';

import { useEffect, useMemo, useState } from 'react';

import { layouts } from '@/features/guidebook/constants';
import { guidebookService } from '@/services/guidebookService';
import type { Guidebook, GuidebookBlock, Order, OrderStatus, User } from '@/types';

export function useGuidebookCatalog() {
  const [creators, setCreators] = useState<User[]>([]);
  const [guidebooks, setGuidebooks] = useState<Guidebook[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedGuidebook, setSelectedGuidebook] = useState<Guidebook | null>(null);
  const [blocks, setBlocks] = useState<GuidebookBlock[]>([]);
  const [selectedLayout, setSelectedLayout] = useState(layouts[0].id);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        setError('');
        const [creatorData, orderData] = await Promise.all([
          guidebookService.getCreators(),
          guidebookService.getOrders(),
        ]);
        setCreators(creatorData);
        setOrders(orderData);
      } catch {
        setError('초기 데이터를 불러오지 못했습니다. API 서버 상태를 확인해 주세요.');
      } finally {
        setLoading(false);
      }
    }

    void loadInitialData();
  }, []);

  useEffect(() => {
    async function loadGuidebooks() {
      try {
        setError('');
        const data = await guidebookService.getGuidebooks(selectedRegion);
        setGuidebooks(data);
        setSelectedGuidebook((previous) => {
          if (previous && data.some((item) => item.id === previous.id)) {
            return previous;
          }

          return data[0] ?? null;
        });
      } catch {
        setError('가이드북 목록을 불러오지 못했습니다.');
      }
    }

    void loadGuidebooks();
  }, [selectedRegion]);

  useEffect(() => {
    if (!selectedGuidebook) {
      setBlocks([]);
      return;
    }

    const guidebookId = selectedGuidebook.id;

    async function loadBlocks() {
      try {
        setBlocks(await guidebookService.getGuidebookBlocks(guidebookId));
      } catch {
        setError('가이드북 상세 블록을 불러오지 못했습니다.');
      }
    }

    void loadBlocks();
  }, [selectedGuidebook]);

  const topGuidebook = guidebooks[0];
  const totalPrintCount = useMemo(
    () => guidebooks.reduce((sum, guidebook) => sum + guidebook.printCount, 0),
    [guidebooks],
  );

  async function createPrintOrder() {
    if (!selectedGuidebook) {
      return;
    }

    const order = await guidebookService.createOrder({
      consumerId: 4,
      guidebookId: selectedGuidebook.id,
      selectedLayoutType: selectedLayout,
      shippingMemo: '샘플 주문: 여행 전 휴대하기 좋은 미니 가이드북으로 제작 요청',
    });

    setOrders((previous) => [order, ...previous]);
    setMessage(`${selectedGuidebook.title} 주문이 접수되었습니다.`);
  }

  async function updateOrderStatus(order: Order, status: OrderStatus) {
    const updated = await guidebookService.updateOrderStatus(order.id, status);
    setOrders((previous) => previous.map((item) => (item.id === updated.id ? updated : item)));
  }

  return {
    blocks,
    createPrintOrder,
    creators,
    error,
    guidebooks,
    loading,
    message,
    orders,
    selectedGuidebook,
    selectedLayout,
    selectedRegion,
    setSelectedGuidebook,
    setSelectedLayout,
    setSelectedRegion,
    topGuidebook,
    totalPrintCount,
    updateOrderStatus,
  };
}
