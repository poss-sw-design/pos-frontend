import React from "react";
import "./ReservationList.css";
import { Pencil, Trash } from "lucide-react";

const mockReservations = [
  {
    id: 1,
    status: "Pending",
    customer: "Robert Johnson",
    phone: "(555) 123-4567",
    service: "Haircut & Styling",
    duration: "45 min",
    price: "$35",
    employee: "Sarah Miller",
    datetime: "Oct 15, 2023 - 10:30 AM",
  },
  {
    id: 2,
    status: "Active",
    customer: "Emily Davis",
    phone: "(555) 987-6543",
    service: "Manicure & Pedicure",
    duration: "60 min",
    price: "$50",
    employee: "Michael Chen",
    datetime: "Oct 15, 2023 - 11:00 AM",
  },
  {
    id: 3,
    status: "Completed",
    customer: "James Wilson",
    phone: "(555) 456-7890",
    service: "Facial Treatment",
    duration: "90 min",
    price: "$80",
    employee: "Lisa Anderson",
    datetime: "Oct 14, 2023 - 2:15 PM",
  },
  {
    id: 4,
    status: "Cancelled",
    customer: "Patricia Brown",
    phone: "(555) 234-5678",
    service: "Massage Therapy",
    duration: "60 min",
    price: "$70",
    employee: "David Thompson",
    datetime: "Oct 13, 2023 - 4:00 PM",
  },
  {
    id: 5,
    status: "Pending",
    customer: "Thomas Garcia",
    phone: "(555) 876-5432",
    service: "Hair Coloring",
    duration: "120 min",
    price: "$95",
    employee: "Sarah Miller",
    datetime: "Oct 16, 2023 - 9:00 AM",
  },
];

const StatusBadge = ({ status }) => {
  const bg = {
    Pending: "#fcefc7",
    Active: "#d4f4dd",
    Completed: "#dbeafe",
    Cancelled: "#fde2e1",
  };

  const color = {
    Pending: "#b7791f",
    Active: "#276749",
    Completed: "#1e40af",
    Cancelled: "#c53030",
  };

  return (
    <span
      className="status-badge"
      style={{ backgroundColor: bg[status], color: color[status] }}
    >
      {status}
    </span>
  );
};

const ReservationList = ({ onBack, onEdit, onCancelBooking }) => {
  return (
    <div className="reservation-container">
      <div className="reservation-header">
        <h2>Reservations</h2>
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
      </div>

      <table className="reservation-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Customer</th>
            <th>Service</th>
            <th>Employee</th>
            <th>Date & Time</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {mockReservations.map((r) => (
            <tr key={r.id}>
              <td>
                <StatusBadge status={r.status} />
              </td>

              <td>
                <div className="customer-info">
                  <div className="customer-photo"></div>
                  <div>
                    <div className="name">{r.customer}</div>
                    <div className="phone">{r.phone}</div>
                  </div>
                </div>
              </td>

              <td>
                {r.service}
                <br />
                <span className="mini-text">
                  {r.duration} — {r.price}
                </span>
              </td>

              <td>
                <div className="employee-info">
                  <div className="employee-photo"></div>
                  <span>{r.employee}</span>
                </div>
              </td>

              <td>{r.datetime}</td>

              <td className="actions">
                {/* EDIT BUTTON */}
                <button className="icon-btn" onClick={() => onEdit(r)}>
                  <Pencil size={18} />
                </button>

                {/* CANCEL BUTTON */}
                <button
                  className="icon-btn"
                  onClick={() => onCancelBooking(r.id)}
                >
                  <Trash size={18} color="red" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="reservation-footer">
        Showing 1 to 5 of 24 results
        <div className="nav-buttons">
          <button>Previous</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
};

export default ReservationList;
