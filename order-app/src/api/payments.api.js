// src/api/payments.api.js
import { request } from './client';

export const PaymentsAPI = {
  create(data) {
    return request('/payments', {
      method: 'POST',
      body: data,
    });
  },

  getAll(params) {
    return request('/payments', { params });
  },

  getById(id) {
    return request(`/payments/${id}`);
  },

  update(id, data) {
    return request(`/payments/${id}`, {
      method: 'PUT',
      body: data,
    });
  },

  remove(id) {
    return request(`/payments/${id}`, {
      method: 'DELETE',
    });
  },
};
