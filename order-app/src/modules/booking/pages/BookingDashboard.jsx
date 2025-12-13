import React from "react";
import "./BookingDashboard.css";

const BookingDashboard = ({ onBack, onCreateBooking, onViewList }) => {
  return (
    <div className="booking-dashboard">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <h1>Booking Menu</h1>

      <div className="booking-buttons">
        <button onClick={onCreateBooking} className="big-btn">
          Create Booking
        </button>
        <button onClick={onViewList} className="big-btn">
          Reservation List
        </button>
      </div>
    </div>
  );
};

export default BookingDashboard;
