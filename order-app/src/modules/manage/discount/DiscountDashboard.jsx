import React from "react";
import DiscountTable from "./DiscountTable";
import "./DiscountDashboard.css";

const DiscountDashboard = ({ discounts, onBack, onCreate, onEdit, onDelete }) => {
  return (
    <div className="discount-dashboard">
      <button className="back-btn" onClick={onBack}>← Back</button>

      <div className="dashboard-header">
        <h1>Discount Management</h1>
        <button className="create-btn" onClick={onCreate}>+ Create Discount</button>
      </div>

      <DiscountTable
        discounts={discounts}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default DiscountDashboard;
