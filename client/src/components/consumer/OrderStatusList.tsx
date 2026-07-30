import type { Order, OrderStatus } from '@/types';

type OrderStatusListProps = {
  orders: Order[];
  onStatusChange: (order: Order, status: OrderStatus) => void;
};

export function OrderStatusList({ orders, onStatusChange }: OrderStatusListProps) {
  return (
    <section className="section-card">
      <div className="section-heading">
        <h2>주문 상태 관리</h2>
        <p>Lv2 핵심 기능: 주문을 기록하고 상태 흐름을 관리합니다.</p>
      </div>
      <div className="order-list">
        {orders.map((order) => (
          <article className="order-row" key={order.id}>
            <div>
              <strong>{order.guidebookTitle}</strong>
              <p>{order.consumerName} · {order.selectedLayoutType} · {order.shippingMemo}</p>
            </div>
            <select value={order.status} onChange={(event) => onStatusChange(order, event.target.value as OrderStatus)}>
              <option value="pending">pending</option>
              <option value="processing">processing</option>
              <option value="completed">completed</option>
            </select>
          </article>
        ))}
      </div>
    </section>
  );
}
