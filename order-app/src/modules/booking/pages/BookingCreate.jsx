import React, { useState, useEffect } from 'react';
import CustomerInfo from '../components/CustomerInfo';
import BookingReview from '../components/BookingReview';
import BookingActions from '../components/BookingActions';
import { ReservationsAPI } from '../../../api/reservations.api';
import './BookingCreate.css';

const BookingCreate = ({ onBack, editing }) => {
  /* ================= STATE ================= */
  const [customer, setCustomer] = useState({ name: '', phone: '' });
  const [partySize, setPartySize] = useState(2);
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false);

  /* ================= EDIT MODE ================= */
  useEffect(() => {
    if (!editing) return;

    setCustomer({
      name: editing.customerName || '',
      phone: editing.customerPhone || '',
    });
    setPartySize(editing.partySize || 2);
    setDate(editing.reservationDate ? new Date(editing.reservationDate) : new Date());
    setStartTime(editing.startTime || '');
    setEndTime(editing.endTime || '');
  }, [editing]);

  /* ================= SUBMIT ================= */
  const handleConfirm = async () => {
    const payload = {
      merchantId: 1,
      employeeId: 1, // 고정값
      customerName: customer.name,
      customerPhone: customer.phone,
      partySize,
      reservationDate: date.toISOString().split('T')[0],
      startTime,
      endTime,
    };

    try {
      setLoading(true);

      if (editing) {
        await ReservationsAPI.update(editing.reservationId, payload);
      } else {
        await ReservationsAPI.create(payload);
      }

      onBack();
    } catch (e) {
      console.error(e);
      alert('Failed to save reservation');
    } finally {
      setLoading(false);
    }
  };

  /* ================= DATE / TIME ================= */
  const today = new Date();
  const maxDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const minDate = today.toISOString().split('T')[0];

  return (
    <div className="booking-container">
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>

      <h1>{editing ? 'Edit Reservation' : 'Create Reservation'}</h1>

      {/* CUSTOMER INFO */}
      <CustomerInfo customer={customer} setCustomer={setCustomer} />

      {/* PARTY SIZE */}
      <div className="customer-info-card">
        <h3>Party Size</h3>
        <input
          type="number"
          min="1"
          value={partySize}
          onChange={e => setPartySize(Number(e.target.value))}
        />
      </div>

      {/* DATE SELECTOR */}
      <div className="customer-info-card">
        <h3>Reservation Date</h3>
        <input
          type="date"
          value={date.toISOString().split('T')[0]}
          min={minDate}
          max={maxDate}
          onChange={e => setDate(new Date(e.target.value))}
        />
      </div>

      {/* TIME SELECTOR */}
      <div className="customer-info-card">
        <h3>Start Time</h3>
        <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
      </div>
      <div className="customer-info-card">
        <h3>End Time</h3>
        <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
      </div>

      {/* REVIEW */}
      <BookingReview
        customer={customer}
        partySize={partySize}
        date={date}
        startTime={startTime}
        endTime={endTime}
      />

      {/* ACTIONS */}
      <BookingActions
        disabled={loading || !customer.name || !customer.phone || !date || !startTime}
        onConfirm={handleConfirm}
        label={editing ? 'Update Reservation' : 'Confirm Reservation'}
      />
    </div>
  );
};

export default BookingCreate;
