import React, { useState, useEffect } from "react";
import CustomerInfo from "../components/CustomerInfo";
import EmployeeSelector from "../components/EmployeeSelector";
import DateSelector from "../components/DateSelector";
import TimeSelector from "../components/TimeSelector";
import BookingReview from "../components/BookingReview";
import BookingActions from "../components/BookingActions";
import { ReservationsAPI } from "../../../api/reservations.api";
import "./BookingCreate.css";

const BookingCreate = ({ onBack, editing }) => {
  /* ================= STATE ================= */
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
  });

  const [partySize, setPartySize] = useState(2);
  const [employee, setEmployee] = useState(null);
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= EDIT MODE ================= */
  useEffect(() => {
    if (!editing) return;

    setCustomer({
      name: editing.customerName || "",
      phone: editing.customerPhone || "",
    });

    setPartySize(editing.partySize || 2);
    setEmployee(editing.employeeId || null);
    setDate(editing.reservationDate || null);
    setStartTime(editing.startTime || null);
    setEndTime(editing.endTime || null);
  }, [editing]);

  /* ================= SUBMIT ================= */
  const handleConfirm = async () => {
    const payload = {
      merchantId: 1,
      employeeId: employee,
      customerName: customer.name,
      customerPhone: customer.phone,
      partySize,
      reservationDate: date,
      startTime,
      endTime,
    };

    try {
      setLoading(true);

      if (editing) {
        await ReservationsAPI.update(editing.reservationId, {
          ...payload,
          status: "confirmed",
        });
      } else {
        await ReservationsAPI.create(payload);
      }

      onBack();
    } catch (e) {
      console.error(e);
      alert("Failed to save reservation");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="booking-container">
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>

      <h1>{editing ? "Edit Reservation" : "Create Reservation"}</h1>

      {/* CUSTOMER */}
      <CustomerInfo customer={customer} setCustomer={setCustomer} />

      {/* PARTY SIZE */}
     <div className="customer-info-card">
  <h3>Party Size</h3>

  <div className="input-row single">
    <input
      type="number"
      min="1"
      placeholder="Number of guests"
      value={partySize}
      onChange={(e) => setPartySize(Number(e.target.value))}
    />
  </div>
</div>


      {/* EMPLOYEE */}
      <EmployeeSelector selected={employee} onSelect={setEmployee} />

      {/* DATE */}
      <DateSelector date={date} onSelect={setDate} />

      {/* TIME RANGE */}
      <div className="date-time-section">
        <TimeSelector
          label="Start Time"
          date={date}
          selected={startTime}
          onSelect={setStartTime}
        />
        <TimeSelector
          label="End Time"
          date={date}
          selected={endTime}
          onSelect={setEndTime}
        />
      </div>

      {/* REVIEW */}
      <BookingReview
        customer={customer}
        partySize={partySize}
        employee={employee}
        date={date}
        startTime={startTime}
        endTime={endTime}
      />

      {/* ACTIONS */}
      <BookingActions
        disabled={
          loading ||
          !customer.name ||
          !customer.phone ||
          !date ||
          !startTime ||
          !endTime
        }
        onConfirm={handleConfirm}
        label={editing ? "Update Reservation" : "Confirm Reservation"}
      />
    </div>
  );
};

export default BookingCreate;
