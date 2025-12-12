import React from "react";
import { ShoppingBag, CalendarCheck, Settings } from "lucide-react";
import "./Sidebar.css";

const Sidebar = ({ screen, goOrder, goBooking, goManage }) => {
  return (
    <div className="sidebar">
      <h2 className="logo">POS</h2>

      <button
        className={`side-btn ${screen === "order" ? "active" : ""}`}
        onClick={goOrder}
      >
        <ShoppingBag size={22} /> <span>Order</span>
      </button>

      <button
        className={`side-btn ${screen === "booking" ? "active" : ""}`}
        onClick={goBooking}
      >
        <CalendarCheck size={22} /> <span>Booking</span>
      </button>

      <button
        className={`side-btn ${screen === "manage" ? "active" : ""}`}
        onClick={goManage}
      >
        <Settings size={22} /> <span>Manage</span>
      </button>
    </div>
  );
};

export default Sidebar;
