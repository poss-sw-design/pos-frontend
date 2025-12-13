import React from "react";
import "./ManageDashboard.css";

const ManageDashboard = ({ onBack, goDiscount, goMenu, goTax, goUsers }) => {
  return (
    <div className="manage-dashboard">
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>
      <h1>Manage System</h1>

      <div className="manage-grid">
        <button className="manage-btn" onClick={goUsers}>
          Manage Users
          </button>

        <button className="manage-btn" onClick={goMenu}>
          Manage Menu
        </button>

        <button className="manage-btn" onClick={goDiscount}>
          Manage Discounts
        </button>

        <button className="manage-btn" onClick={goTax}>
          Manage Tax
        </button>
      </div>
    </div>
  );
};

export default ManageDashboard;
