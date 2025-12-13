import React from "react";

const TIMES = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "4:00 PM", "5:00 PM"];

const TimeSelector = ({ date, selected, onSelect }) => {
  if (!date) {
    return <p>Select a date first.</p>;
  }

  return (
    <div className="time-selector">
      <h3>Available Times for {date.toDateString()}</h3>

      <div className="time-list">
        {TIMES.map((t) => (
          <button
            key={t}
            className={`time-btn ${selected === t ? "selected" : ""}`}
            onClick={() => onSelect(t)}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSelector;
