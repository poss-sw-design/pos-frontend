export const ROLES = {
  EMPLOYEE: "Employee",
  MANAGER: "Manager",
  SUPERADMIN: "SuperAdmin",
};

export const PERMISSIONS = {
  Employee: [
    "role:read",
    "product:read",
    "order:create",
    "order:read",
    "order:update",
    "orderItem:add",
    "orderItem:update",
    "orderItem:remove",
    "order:cancel",
    "order:receipt",
    "payment:create",
    "payment:read",
    "paymentSplit:create",
    "paymentSplit:read",
    "tip:add",
    "reservation:create",
    "reservation:read",
    "reservation:update",
    "reservation:cancel",
    "service:read",
    "schedule:read"
  ],
  Manager: [
    // Employee permissions 포함
    "user:create", "user:read", "user:update", "user:delete",
    "role:assign", "role:read",
    "merchant:update",
    "branch:create","branch:read","branch:update","branch:delete",
    "product:create","product:update","product:delete",
    "ingredientCategory:create","ingredientCategory:update","ingredientCategory:delete",
    "catalogue:upsert",
    "discount:*","taxRate:*",
    "order:close","payment:refund","order:refund",
    "service:*","schedule:*",
    "reservationDeposit:create","reservationDeposit:refund",
    "cancellationFee:apply","cancellationFee:waive"
  ],
  SuperAdmin: ["*"], // 모든 권한
};
