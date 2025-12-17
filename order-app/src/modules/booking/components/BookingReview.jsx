import React from 'react';

const BookingReview = ({ customer, partySize, date, startTime, endTime }) => {
  return (
    <div className="booking-review">
      <h3>Reservation Summary</h3>
      <p>
        Customer: {customer.name} ({customer.phone})
      </p>
      <p>Party Size: {partySize}</p>
      <p>Date: {date instanceof Date ? date.toDateString() : date}</p>
      <p>
        Time: {startTime} - {endTime || 'Not specified'}
      </p>
    </div>
  );
};

export default BookingReview;
