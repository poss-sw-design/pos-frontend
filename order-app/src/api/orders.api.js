import { request } from './client';

export const OrdersAPI = {
  // 주문 생성
  create(data) {
    return request('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  // 주문 단건 조회
  getById(orderId) {
    return request(`/orders/${orderId}`);
  },

  // 주문 전체 조회
  getAll(params) {
    return request('/orders', { params });
  },

  // 주문 수정
  update(orderId, data) {
    return request(`/orders/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  // 주문 삭제
  remove(orderId) {
    return request(`/orders/${orderId}`, {
      method: 'DELETE',
    });
  },

  // 주문 아이템 추가
  addItem(orderId, data) {
    return request(`/orders/${orderId}/items`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  // 주문 아이템 수정
  updateItem(orderId, itemId, data) {
    return request(`/orders/${orderId}/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  // 주문 아이템 삭제
  removeItem(orderId, itemId) {
    return request(`/orders/${orderId}/items/${itemId}`, {
      method: 'DELETE',
    });
  },
};
