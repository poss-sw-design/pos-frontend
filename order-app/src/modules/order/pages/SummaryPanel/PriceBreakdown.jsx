import React from 'react';

const PriceBreakdown = ({ subtotal, taxAmount, discount, total }) => {
  const format = num => Number(num || 0).toFixed(2);

  return (
    <div className="price-breakdown">
      <div className="breakdown-row">
        <span>Subtotal</span>
        <span>${format(subtotal)}</span>
      </div>
      <div className="breakdown-row">
        <span>Tax</span>
        <span>${format(taxAmount)}</span>
      </div>
      {discount > 0 && (
        <div className="breakdown-row">
          <span>Discount</span>
          <span>-${format(discount)}</span>
        </div>
      )}
      <div className="total-amount">
        <span>Total Amount</span>
        <span>${format(total)}</span>
      </div>
    </div>
  );
};

export default PriceBreakdown;
