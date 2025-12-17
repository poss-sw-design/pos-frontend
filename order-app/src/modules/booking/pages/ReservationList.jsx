import React, { useEffect, useState } from 'react';
import './ReservationList.css';
import { X } from 'lucide-react';
import { ReservationsAPI } from '../../../api/reservations.api';

const ReservationList = ({ onBack }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  const loadReservations = async () => {
    try {
      setLoading(true);
      let data = await ReservationsAPI.getAll();
      // 백엔드 'canceled' → UI용 'cancelled'로 변환
      data = data.map(r => ({
        ...r,
        status: r.status.toLowerCase() === 'canceled' ? 'cancelled' : r.status.toLowerCase(),
      }));
      setReservations(data);
    } catch (e) {
      console.error(e);
      setError('Failed to load reservations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const cancelReservation = async id => {
    if (!window.confirm('Cancel this reservation?')) return;

    try {
      setCancellingId(id);
      await ReservationsAPI.cancel(id);
      // 취소 후 상태 업데이트
      setReservations(prev =>
        prev.map(r => (r.reservationId === id ? { ...r, status: 'cancelled' } : r))
      );
    } catch (e) {
      console.error(e);
      alert('Failed to cancel reservation');
    } finally {
      setCancellingId(null);
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

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && reservations.length === 0 && <p className="empty">No reservations found</p>}

      {!loading && reservations.length > 0 && (
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
              <tr key={r.reservationId} className={r.status === 'cancelled' ? 'cancelled' : ''}>
                <td>
                  <span className={`status ${r.status}`}>{r.status}</span>
                </td>
                <td>{r.customerName}</td>
                <td>{r.customerPhone}</td>
                <td>{r.partySize}</td>
                <td>
                  {r.reservationDate} {r.startTime && `(${r.startTime}–${r.endTime})`}
                </td>
                <td>
                  {r.status !== 'cancelled' && (
                    <button
                      className="icon-btn"
                      disabled={cancellingId === r.reservationId}
                      onClick={() => cancelReservation(r.reservationId)}
                    >
                      <X size={18} color="red" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReservationList;
