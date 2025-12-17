import React from 'react';

const SummaryActions = ({ onSplitBill, onPayment }) => {
  return (
    <div className="summary-actions">
      <button className="action-btn">Discount Coupon</button>
      <button className="action-btn" onClick={onSplitBill}>
        Split Bill
      </button>
      <button className="action-btn primary" onClick={onPayment}>
        Payment
      </button>
    </div>
  );
};

export default SummaryActions;
