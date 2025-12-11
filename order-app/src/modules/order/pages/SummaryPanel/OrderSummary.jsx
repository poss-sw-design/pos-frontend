import React from "react";
import SummaryItem from "./SummaryItem";
import PriceBreakdown from "./PriceBreakdown";
import SpecialRequestInput from "./SpecialRequestInput";
import SummaryActions from "./SummaryActions";

const OrderSummary = ({
  orderItems,
  subtotal,
  discount,
  total,
  specialRequest,
  setSpecialRequest,
  onSplitBill
}) => {
  return (
    <div className="summary-wrapper">
      <h2 className="summary-title">Order Summary</h2>

      <button className="cancel-btn">Cancel</button>

      {/* ITEM LIST */}
      <div className="summary-items">
        {orderItems.map((item, index) => (
          <SummaryItem key={index} item={item} />
        ))}
      </div>

      {/* SPACER — pushes bottom section down */}
      <div className="summary-spacer"></div>

      {/* BOTTOM FIXED AREA */}
      <SpecialRequestInput
        specialRequest={specialRequest}
        setSpecialRequest={setSpecialRequest}
      />

      <PriceBreakdown subtotal={subtotal} discount={discount} total={total} />
      <SummaryActions onSplitBill={onSplitBill} />

   
    </div>
  );
};

export default OrderSummary;
