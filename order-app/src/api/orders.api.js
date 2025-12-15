import { request } from './client';

export const OrdersAPI = {
  create(data) {
    return request('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
  },

  getById(orderId) {
    return request(`/orders/${orderId}`);
  },

  update(orderId, data) {
    return request(`/orders/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
  },

  remove(orderId) {
    return request(`/orders/${orderId}`, {
      method: 'DELETE',
    });
  },

  addItem(orderId, data) {
    return request(`/orders/${orderId}/items`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
  },

  updateItem(orderId, itemId, data) {
    return request(`/orders/${orderId}/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
  },

  removeItem(orderId, itemId) {
    return request(`/orders/${orderId}/items/${itemId}`, {
      method: 'DELETE',
    });
  },

  getAll(params) {
    return request('/orders', { params });
  },

  createWithPayment(data) {
    return request('/orders/create-with-payment', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
  },
};
