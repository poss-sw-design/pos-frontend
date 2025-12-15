import React, { useEffect, useState } from "react";
import "./ReservationList.css";
import { Trash } from "lucide-react";
import { ReservationsAPI } from "../../../api/reservations.api";

const ReservationList = ({ onBack }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadReservations = async () => {
    try {
      setLoading(true);
      const data = await ReservationsAPI.getAll();
      setReservations(data);
    } catch (e) {
      console.error(e);
      setError("Failed to load reservations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const cancelReservation = async (id) => {
    if (!window.confirm("Cancel this reservation?")) return;

    try {
      setDeletingId(id);
      await ReservationsAPI.cancel(id);
      await loadReservations();
    } catch (e) {
      console.error(e);
      alert("Failed to cancel reservation");
    } finally {
      setDeletingId(null);
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

      {!loading && reservations.length === 0 && (
        <p className="empty">No reservations found</p>
      )}

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
            {reservations.map((r) => (
              <tr key={r.reservationId}>
                <td>
                  <span className={`status ${r.status}`}>
                    {r.status}
                  </span>
                </td>
                <td>{r.customerName}</td>
                <td>{r.customerPhone}</td>
                <td>{r.partySize}</td>
                <td>
                  {r.reservationDate}{" "}
                  {r.startTime && `(${r.startTime}–${r.endTime})`}
                </td>
                <td>
                  <button
                    className="icon-btn"
                    disabled={deletingId === r.reservationId}
                    onClick={() => cancelReservation(r.reservationId)}
                  >
                    <Trash size={18} color="red" />
                  </button>
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
