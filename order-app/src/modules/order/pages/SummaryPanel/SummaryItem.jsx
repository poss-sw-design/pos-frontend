import React from "react";

const SummaryItem = ({ item }) => {
  if (!item) return null;  // item 자체가 undefined인 케이스 방지

  // totalPrice가 없으면 가격 계산 fallback
  const price =
    item.totalPrice !== undefined
      ? item.totalPrice
      : item.price || 0;

  return (
    <div className="summary-item">
      <div>
        <span className="summary-item-name">{item.name}</span>

        {item.size && (
          <span className="summary-item-option"> ({item.size})</span>
        )}

        {/* Extras list */}
        {item.extras && item.extras.length > 0 && (
          <div className="summary-item-option">
            + {item.extras.join(", ")}
          </div>
        )}
      </div>

      <div className="summary-item-price">
        ${price.toFixed(2)}
      </div>
    </div>
  );
};

export default SummaryItem;
