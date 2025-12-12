import React from "react";
import "./HomeDashboard.css";

const HomeDashboard = ({ goOrder, goBooking, goManage }) => {
  return (
    <div className="home-container">
      <h1>Main Dashboard</h1>

      <div className="home-menu">
        <button className="menu-btn" onClick={goOrder}>Order</button>
        <button className="menu-btn" onClick={goBooking}>Booking</button>
        <button className="menu-btn" onClick={goManage}>Manage</button>
      </div>
    </div>
  );
};

export default HomeDashboard;
