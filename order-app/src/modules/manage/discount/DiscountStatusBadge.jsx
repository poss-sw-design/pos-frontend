import React from "react";

const DiscountStatusBadge = ({ status }) => {
  const colors = {
    Active: "#d1fae5",
    Expired: "#fee2e2",
    Upcoming: "#fef9c3",
  };

  const text = {
    Active: "#065f46",
    Expired: "#b91c1c",
    Upcoming: "#92400e",
  };

  return (
    <span
      className="status-badge"
      style={{
        backgroundColor: colors[status] || "#eee",
        color: text[status] || "#333",
      }}
    >
      {status}
    </span>
  );
};

export default DiscountStatusBadge;
