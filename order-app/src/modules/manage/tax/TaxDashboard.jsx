import React, { useState } from "react";
import TaxForm from "./TaxForm";
import "./TaxDashboard.css";

const TaxDashboard = ({ taxes, categories, onAdd, onUpdate, onDelete, onBack }) => {
  const [editingTax, setEditingTax] = useState(null);

  return (
    <div className="tax-dashboard-container">
      <button className="back-btn" onClick={onBack}>← Back</button>

      <div className="header-row">
        <h1>Manage Tax</h1>
        <button className="add-btn" onClick={() => setEditingTax({})}>+ Add Tax Rule</button>
      </div>

      <table className="tax-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rate (%)</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {taxes.map((t) => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.rate}%</td>
              <td>{categories.find(c => c.id === t.categoryId)?.name}</td>
              <td>{t.status}</td>
              <td>
                <button onClick={() => setEditingTax(t)}>✏️</button>
                <button onClick={() => onDelete(t.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {editingTax && (
        <TaxForm
          categories={categories}
          editing={editingTax}
          onClose={() => setEditingTax(null)}
          onSave={(data) => {
            editingTax.id ? onUpdate(data) : onAdd(data);
            setEditingTax(null);
          }}
        />
      )}
    </div>
  );
};

export default TaxDashboard;
