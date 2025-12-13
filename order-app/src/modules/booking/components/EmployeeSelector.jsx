import React from "react";

const EMPLOYEES = [
  { id: 1, name: "John Smith", role: "Stylist" },
  { id: 2, name: "Jane Doe", role: "Color Specialist" },
  { id: 3, name: "Mike Johnson", role: "Senior Stylist" },
  { id: 0, name: "Any Available", role: "System will assign" },
];

const EmployeeSelector = ({ selected, onSelect }) => {
  return (
    <div className="section">
      <h2>Select Employee</h2>

      <div className="selector-grid employee-grid">
        {EMPLOYEES.map((e) => (
          <div
            key={e.id}
            className={`employee-card ${selected?.id === e.id ? "selected" : ""}`}
            onClick={() => onSelect(e)}
          >
            <div className="photo-placeholder"></div>
            <h3>{e.name}</h3>
            <p>{e.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeSelector;
