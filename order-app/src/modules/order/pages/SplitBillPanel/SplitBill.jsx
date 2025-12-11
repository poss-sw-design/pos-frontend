import React, { useState, useMemo } from "react";
import SplitBillItem from "./SplitBillItem";
import SplitBillSummary from "./SplitBillSummary";
import "./SplitBill.css";

const SplitBill = ({ orderItems, onBack, onComplete }) => {
  const unpaidItems = orderItems.filter(item => !item.paid);

  const [selected, setSelected] = useState([]);
  const [tip, setTip] = useState(0);
  const [payerName, setPayerName] = useState("");

  const toggleSelect = (item) => {
    setSelected(prev =>
      prev.some(i => i.id === item.id)
        ? prev.filter(i => i.id !== item.id)
        : [...prev, item]
    );
  };

  const subtotal = useMemo(() => {
    return selected.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [selected]);

  const total = subtotal + Number(tip);

  const confirmPayment = () => {
    const paidIds = selected.map(i => i.id);

    onComplete({
      paidIds,
      payerName,
      tip,
      total
    });
  };

  return (
    <div className="split-container">
      {/* 작은 Back 버튼 */}
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>

      <h2 className="split-title">Select Items to Pay</h2>

      <div className="split-layout">
        
        {/* LEFT: Unpaid items */}
        <div className="split-items">
          <h3>Unpaid Items</h3>

          {unpaidItems.map(item => (
            <SplitBillItem
              key={item.id}
              item={item}
              selected={selected.some(i => i.id === item.id)}
              onClick={() => toggleSelect(item)}
            />
          ))}

          {unpaidItems.length === 0 && (
            <p className="empty-text">All items are already paid.</p>
          )}
        </div>

        {/* RIGHT: Summary panel */}
        <div className="split-summary">
          <h3>Cart</h3>

          {/* Selected item list */}
          <div className="summary-selected-list">
            {selected.map(item => (
              <div key={item.id} className="summary-line-item">
                <span>{item.name}</span>
                <span>€{item.totalPrice.toFixed(2)}</span>
              </div>
            ))}

            {selected.length === 0 && (
              <p className="empty-text">No items selected.</p>
            )}
          </div>

          {/* Inputs: payer + tip */}
          <div className="split-input-row">

            <div className="input-group">
              <label>Items Paid By</label>
              <input
                type="text"
                placeholder="Enter name"
                value={payerName}
                onChange={(e) => setPayerName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Add Tip (€)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={tip}
                onChange={(e) => setTip(Number(e.target.value))}
              />
            </div>

          </div>

          {/* Totals */}
          <div className="totals-box">
            <div className="totals-row">
              <span>Subtotal:</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>

            <div className="totals-row total">
              <strong>Total:</strong>
              <strong>€{total.toFixed(2)}</strong>
            </div>
          </div>

          {/* Pay button */}
          <button
            className="pay-btn"
            onClick={confirmPayment}
            disabled={selected.length === 0}
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplitBill;
