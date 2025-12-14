import { request } from "./http";

export const PaymentsAPI = {
  create: (data) =>
    request("/api/payments", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getAll: () => request("/api/payments"),

  getById: (id) => request(`/api/payments/${id}`),

  update: (id, data) =>
    request(`/api/payments/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  remove: (id) =>
    request(`/api/payments/${id}`, {
      method: "DELETE",
    }),
};
