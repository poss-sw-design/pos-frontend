import React from 'react';

const SummaryItem = ({ item, onQuantityChange }) => {
  if (!item) return null;

  // 안전하게 기본값 지정
  const price = Number(item.price || 0);
  const quantity = Number(item.quantity || 1);

  return (
    <div className="summary-item">
      <div>
        <span className="summary-item-name">{item.name}</span>
        {item.size && <span className="summary-item-option"> ({item.size})</span>}
        {item.extras && item.extras.length > 0 && (
          <div className="summary-item-option">+ {item.extras.join(', ')}</div>
        )}
      </div>

      <div className="summary-item-controls">
        <button onClick={() => onQuantityChange(item.id, -1)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => onQuantityChange(item.id, 1)}>+</button>
      </div>

      <div className="summary-item-price">${(price * quantity).toFixed(2)}</div>
    </div>
  );
};

export default SummaryItem;
