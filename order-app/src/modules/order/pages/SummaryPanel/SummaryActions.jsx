import React from "react";

const SummaryActions = ({ onSplitBill }) => {
  return (
    <div className="summary-actions">
      <button className="action-btn">Discount Coupon</button>

      {/* ← 고친 부분: onClick + props 받아오기 */}
      <button className="action-btn" onClick={onSplitBill}>
        Split Bill
      </button>

      <button className="action-btn primary">Payment</button>
    </div>
  );
};

export default SummaryActions;
