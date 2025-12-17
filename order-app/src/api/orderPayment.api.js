import { request } from './client';

export const OrderPaymentAPI = {
  // 주문 결제
  pay(orderId, data, discountId) {
    return request(`/orders/${orderId}/payment`, {
      method: 'POST',
      params: discountId ? { discountId } : undefined,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
