import React, { useState, useEffect } from "react";
import CustomerInfo from "../components/CustomerInfo";
import ServiceSelector from "../components/ServiceSelector";
import EmployeeSelector from "../components/EmployeeSelector";
import DateSelector from "../components/DateSelector";
import TimeSelector from "../components/TimeSelector";
import BookingReview from "../components/BookingReview";
import BookingActions from "../components/BookingActions";
import "./BookingCreate.css";

const BookingCreate = ({ onBack, onConfirm, editing }) => {
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [service, setService] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  /* --------------------------------------------
     If editing = existing booking → preload data
  --------------------------------------------- */
  useEffect(() => {
    if (editing) {
      setCustomer(editing.customer || {});
      setService(editing.service || null);
      setEmployee(editing.employee || null);
      setDate(editing.date || null);
      setTime(editing.time || null);
    }
  }, [editing]);

  /* --------------------------------------------
     Confirm handler (create or update)
  --------------------------------------------- */
  const handleConfirm = () => {
    const data = {
      id: editing ? editing.id : Date.now(),
      customer,
      service,
      employee,
      date,
      time,
      status: editing ? editing.status : "active",
    };

    onConfirm(data); // App.jsx 로 전달
  };

  return (
    <div className="booking-container">
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>

      <h1>{editing ? "Edit Booking" : "Create Booking"}</h1>

      {/* CUSTOMER INFO */}
      <CustomerInfo customer={customer} setCustomer={setCustomer} />

      {/* SERVICE */}
      <ServiceSelector selected={service} onSelect={setService} />

      {/* EMPLOYEE */}
      <EmployeeSelector selected={employee} onSelect={setEmployee} />

      {/* DATE + TIME */}
      <div className="date-time-section">
        <DateSelector date={date} onSelect={setDate} />
        <TimeSelector date={date} selected={time} onSelect={setTime} />
      </div>

      {/* REVIEW */}
      <BookingReview
        customer={customer}
        service={service}
        employee={employee}
        date={date}
        time={time}
      />

      {/* ACTION BUTTONS */}
      <BookingActions
        disabled={!customer.name || !service || !date || !time}
        onConfirm={handleConfirm}
        label={editing ? "Update Booking" : "Confirm Booking"}
      />
    </div>
  );
};

export default BookingCreate;
