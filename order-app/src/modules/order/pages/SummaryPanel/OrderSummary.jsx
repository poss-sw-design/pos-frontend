import React from 'react';
import SummaryItem from './SummaryItem';
import PriceBreakdown from './PriceBreakdown';
import SpecialRequestInput from './SpecialRequestInput';
import SummaryActions from './SummaryActions';

const OrderSummary = ({
  orderItems,
  subtotal,
  discount,
  total,
  specialRequest,
  setSpecialRequest,
  onSplitBill,
  onPayment,
  handleQuantityChange,
}) => {
  return (
    <div className="summary-wrapper">
      <h2 className="summary-title">Order Summary</h2>
      <button className="cancel-btn">Cancel</button>

      <div className="summary-items">
        {orderItems.map(item => (
          <SummaryItem key={item.id} item={item} onQuantityChange={handleQuantityChange} />
        ))}
      </div>

      <div className="summary-spacer"></div>

      <SpecialRequestInput specialRequest={specialRequest} setSpecialRequest={setSpecialRequest} />

      <PriceBreakdown subtotal={subtotal} discount={discount} total={total} />
      <SummaryActions onSplitBill={onSplitBill} onPayment={onPayment} />
    </div>
  );
};

export default OrderSummary;
