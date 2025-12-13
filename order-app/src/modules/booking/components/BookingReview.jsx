import React from "react";

const BookingReview = ({ customer, service, employee, date, time }) => {
  return (
    <div className="review-box">
      <h2>Review Appointment</h2>

      <p><strong>Customer:</strong> {customer.name || "-"}</p>
      <p><strong>Service:</strong> {service?.name || "-"}</p>
      <p><strong>Employee:</strong> {employee?.name || "-"}</p>
      <p><strong>Date & Time:</strong> {date ? date.toDateString() : "-"} {time || ""}</p>
    </div>
  );
};

export default BookingReview;
