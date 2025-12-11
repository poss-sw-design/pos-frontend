import React from "react";

const SplitBillSummary = ({
  selectedItems,
  subtotal,
  tip,
  setTip,
  total,
  payerName,
  setPayerName,
  onConfirm
}) => {
  return (
    <div className="split-summary">
      <h3>Cart</h3>

      {/* 선택된 아이템 목록 */}
      {selectedItems.map((item) => (
        <div key={item.id} className="summary-line">
          {item.name} - €{item.totalPrice.toFixed(2)}
        </div>
      ))}

      <div className="summary-totals">

        {/* Name Input */}
        <label className="payer-label">
          Items Paid by:
          <input
            type="text"
            value={payerName}
            onChange={(e) => setPayerName(e.target.value)}
            placeholder="Enter name"
          />
        </label>

        {/* Tip Input */}
        <label className="tip-label">
          Add Tip:
          <input
            type="number"
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            placeholder="Tip amount"
          />
        </label>

        <p>Subtotal: €{subtotal.toFixed(2)}</p>
        <h3>Total: €{total.toFixed(2)}</h3>
      </div>

      <button
        className="pay-btn"
        disabled={selectedItems.length === 0}
        onClick={onConfirm}
      >
        Pay
      </button>
    </div>
  );
};

export default SplitBillSummary;
