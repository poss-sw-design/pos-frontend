// src/api/orders.api.js
import { request } from "./http";

export const OrdersAPI = {
  /**
   * 1. 주문 생성
   * POST /api/orders
   */
  create(orderPayload) {
    return request("/api/orders", {
      method: "POST",
      body: JSON.stringify(orderPayload),
    });
  },

  /**
   * 2. 특정 주문 조회
   * GET /api/orders/{orderId}
   */
  getById(orderId) {
    return request(`/api/orders/${orderId}`);
  },

  /**
   * 3. 주문 수정
   * PUT /api/orders/{orderId}
   */
  update(orderId, updatePayload) {
    return request(`/api/orders/${orderId}`, {
      method: "PUT",
      body: JSON.stringify(updatePayload),
    });
  },

  /**
   * 4. 주문 삭제
   * DELETE /api/orders/{orderId}
   */
  remove(orderId) {
    return request(`/api/orders/${orderId}`, {
      method: "DELETE",
    });
  },

  /**
   * 5. 주문 항목 추가
   * POST /api/orders/{orderId}/items
   */
  addItem(orderId, itemPayload) {
    return request(`/api/orders/${orderId}/items`, {
      method: "POST",
      body: JSON.stringify(itemPayload),
    });
  },

  /**
   * 6. 주문 항목 수정
   * PUT /api/orders/{orderId}/items/{orderItemId}
   */
  updateItem(orderId, orderItemId, updatePayload) {
    return request(
      `/api/orders/${orderId}/items/${orderItemId}`,
      {
        method: "PUT",
        body: JSON.stringify(updatePayload),
      }
    );
  },

  /**
   * 7. 주문 항목 삭제
   * DELETE /api/orders/{orderId}/items/{orderItemId}
   */
  removeItem(orderId, orderItemId) {
    return request(
      `/api/orders/${orderId}/items/${orderItemId}`,
      {
        method: "DELETE",
      }
    );
  },

  /**
   * 8. 모든 주문 조회
   * GET /api/orders
   */
  getAll() {
    return request("/api/orders");
  },
};
