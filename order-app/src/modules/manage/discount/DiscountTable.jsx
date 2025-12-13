import React from "react";
import DiscountRow from "./DiscountRow";

const DiscountTable = ({ discounts, onEdit, onDelete }) => {
  return (
    <table className="discount-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Scope</th>
          <th>Value</th>
          <th>Min Price</th>
          <th>Valid Until</th>
          <th>Uses</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {discounts.map((d) => (
          <DiscountRow
            key={d.id}
            discount={d}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default DiscountTable;
