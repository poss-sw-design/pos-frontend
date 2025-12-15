import React, { useEffect, useState } from 'react';
import './ReservationList.css';
import { Trash } from 'lucide-react';
import { ReservationsAPI } from '../../../api/reservations.api';

const ReservationList = ({ onBack }) => {
  const [reservations, setReservations] = useState([]);

  async function loadReservations() {
    try {
      const data = await ReservationsAPI.getAll();
      setReservations(data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    const fetchReservations = async () => {
      await loadReservations();
    };
    fetchReservations();
  }, []);

  const cancelReservation = async id => {
    try {
      await ReservationsAPI.cancel(id);
      await loadReservations();
    } catch (e) {
      console.error(e);
    }
  };

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
            <th>Phone</th>
            <th>Party Size</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {reservations.map(r => (
            <tr key={r.reservationId}>
              <td>{r.status}</td>
              <td>{r.customerName}</td>
              <td>{r.customerPhone}</td>
              <td>{r.partySize}</td>
              <td>{r.reservationDate}</td>
              <td>
                <button className="icon-btn" onClick={() => cancelReservation(r.reservationId)}>
                  <Trash size={18} color="red" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;
