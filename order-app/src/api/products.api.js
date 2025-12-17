import { request } from './client';

export const ProductsAPI = {
  // 상품 전체 조회
  getAll(params) {
    return request('/products', { params });
  },

  // 상품 단건 조회
  getById(productId) {
    return request(`/products/${productId}`);
  },

  // 상품 생성
  create(data) {
    return request('/products', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  // 상품 수정
  update(productId, data) {
    return request(`/products/${productId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  // 상품 삭제
  remove(productId) {
    return request(`/products/${productId}`, {
      method: 'DELETE',
    });
  },
};
