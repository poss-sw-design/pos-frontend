// src/api/reservations.api.js
import { request } from './client';

export const ReservationsAPI = {
  // 예약 전체 조회
  getAll(params) {
    return request('/reservations', { params });
  },

  // 예약 단건 조회
  getById(reservationId) {
    return request(`/reservations/${reservationId}`);
  },

  // 예약 생성
  create(data) {
    return request('/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data), // 객체를 JSON 문자열로 변환
    });
  },

  // 예약 수정
  update(reservationId, data) {
    return request(`/reservations/${reservationId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data), // 객체를 JSON 문자열로 변환
    });
  },

  // 예약 취소 (상태 변경)
  cancel(reservationId) {
    return request(`/reservations/${reservationId}/cancel`, {
      method: 'PATCH',
    });
  },

  // 예약 삭제
  remove(reservationId) {
    return request(`/reservations/${reservationId}`, {
      method: 'DELETE',
    });
  },
};
