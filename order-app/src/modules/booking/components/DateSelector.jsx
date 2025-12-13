import React from "react";

const DateSelector = ({ date, onSelect }) => {
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  return (
    <div className="date-selector">
      <h3>Select Date</h3>

      <div className="date-list">
        {days.map((d) => {
          const label = d.toDateString();
          const selected = date?.toDateString() === label;

          return (
            <button
              key={label}
              className={`date-btn ${selected ? "selected" : ""}`}
              onClick={() => onSelect(d)}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DateSelector;
