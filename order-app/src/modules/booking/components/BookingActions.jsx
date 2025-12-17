import React from 'react';
import './BookingActions.css';

const BookingActions = ({ disabled, onConfirm, label }) => {
  return (
    <div className="booking-actions">
      <button className="confirm-btn" disabled={disabled} onClick={onConfirm}>
        {label || 'Confirm Booking'}
      </button>
    </div>
  );
};

export default BookingActions;
