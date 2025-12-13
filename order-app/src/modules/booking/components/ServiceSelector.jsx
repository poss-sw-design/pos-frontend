import React from "react";

const SERVICES = [
  { id: 1, name: "Haircut & Styling", duration: 60, price: 45 },
  { id: 2, name: "Hair Coloring", duration: 120, price: 85 },
  { id: 3, name: "Consultation", duration: 30, price: 25 },
];

const ServiceSelector = ({ selected, onSelect }) => {
  return (
    <div className="section">
      <h2>Select Service</h2>

      <div className="selector-grid">
        {SERVICES.map((s) => (
          <div
            key={s.id}
            className={`selector-card ${selected?.id === s.id ? "selected" : ""}`}
            onClick={() => onSelect(s)}
          >
            <h3>{s.name}</h3>
            <p>{s.duration} min</p>
            <p>${s.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelector;
