import React from 'react';

const SummaryItem = ({ item, onQuantityChange }) => {
  return (
    <div className="summary-item">
      <div className="summary-item-name">{item.name}</div>

      <div className="qty-box">
        <button onClick={() => onQuantityChange(item.productId, -1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onQuantityChange(item.productId, 1)}>+</button>
      </div>

      <div className="summary-item-price">
        ${(item.unitPrice * item.quantity * (1 + (item.taxRate || 0))).toFixed(2)}
      </div>
    </div>
  );
};

export default SummaryItem;
