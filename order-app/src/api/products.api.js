import { request } from "./http";

// Product API 연결부
export const ProductsAPI = {
  // 1. 모든 상품 조회
  getAll: () => request("/products"),

  // 2. 특정 상품 조회
  getById: (productId) =>
    request(`/products/${productId}`),

  // 3. 상품 생성
  create: (data) =>
    request("/products", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // 4. 상품 수정
  update: (productId, data) =>
    request(`/products/${productId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  // 5. 상품 삭제
  remove: (productId) =>
    request(`/products/${productId}`, {
      method: "DELETE",
    }),
};
