import React from 'react';
import SummaryItem from './SummaryItem';
import SummaryActions from './SummaryActions';

const OrderSummary = ({
  orderItems,
  subtotal,
  taxAmount,
  total,
  discount = 0,
  specialRequest,
  setSpecialRequest,
  onPayment,
  onSplitBill,
  handleQuantityChange,
}) => {
  return (
    <div className="summary-panel">
      <div className="summary-wrapper">
        <div className="summary-items">
          {orderItems.map(item => (
            <SummaryItem
              key={item.orderItemId}
              item={item}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>

        <div className="special-request">
          <label htmlFor="specialRequest">Special request </label>
          <input
            id="specialRequest"
            type="text"
            placeholder="Add a special request..."
            value={specialRequest}
            onChange={e => setSpecialRequest(e.target.value)}
          />
        </div>

        <div className="price-breakdown">
          <div>
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div>
            <span>Tax:</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div>
              <span>Discount:</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="total-amount">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="summary-spacer" />

        <SummaryActions onSplitBill={onSplitBill} onPayment={onPayment} />
      </div>
    </div>
  );
};

export default OrderSummary;
