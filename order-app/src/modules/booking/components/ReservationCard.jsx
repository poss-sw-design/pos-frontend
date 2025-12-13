import React from "react";

const ReservationCard = ({ data }) => {
  return (
    <div className="reservation-card">
      <h3>{data.customer}</h3>
      <p><strong>Service:</strong> {data.service}</p>
      <p><strong>Employee:</strong> {data.employee}</p>
      <p><strong>Date:</strong> {data.date}</p>
      <p><strong>Time:</strong> {data.time}</p>
      <span className="status">{data.status}</span>
    </div>
  );
};

export default ReservationCard;
