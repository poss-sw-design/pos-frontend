import { request } from './client';

export const PaymentsAPI = {
  // 결제 전체 조회
  getAll(params) {
    return request('/payments', { params });
  },

  // 결제 단건 조회
  getById(id) {
    return request(`/payments/${id}`);
  },

  // 결제 수정
  update(id, data) {
    return request(`/payments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  // 결제 삭제
  remove(id) {
    return request(`/payments/${id}`, {
      method: 'DELETE',
    });
  },
};
