import React from "react";

const SplitBillItem = ({ item, selected, onClick }) => {
  return (
    <div
      className={`split-item ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="split-item-left">
        <h4>{item.name}</h4>
        <p className="split-item-options">
          {item.size && `Size: ${item.size} `}
          {item.extras?.length > 0 && ` • Extras: ${item.extras.join(", ")}`}
        </p>
      </div>

      <div className="split-item-right">
        <p className="price">${item.totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default SplitBillItem;
