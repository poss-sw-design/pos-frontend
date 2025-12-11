import React from "react";

const PriceBreakdown = ({ subtotal, discount, total }) => {
  return (
    <div className="price-breakdown">
      <div>
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div>
        <span>Discount</span>
        <span>-${discount.toFixed(2)}</span>
      </div>

      <div className="total-amount">
        <span>Total Amount</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default PriceBreakdown;
