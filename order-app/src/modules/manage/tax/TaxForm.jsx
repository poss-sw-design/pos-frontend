import React, { useState } from "react";
import "./TaxForm.css";

const TaxForm = ({ categories, editing, onSave, onClose }) => {
  const isEdit = Boolean(editing);

  const [name, setName] = useState(editing?.name || "");
  const [rate, setRate] = useState(editing?.rate || "");
  const [description, setDescription] = useState(editing?.description || "");
  const [categoryId, setCategoryId] = useState(editing?.categoryId || "");
  const [status, setStatus] = useState(editing?.status || "active");

  const handleSubmit = () => {
    if (!name || !rate || !categoryId) return alert("Please fill all required fields");

    onSave({
      id: editing?.id || Date.now(),
      name,
      rate: Number(rate),
      description,
      categoryId: Number(categoryId),
      status,
      createdAt: editing?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    onClose();
  };

  return (
    <div className="tax-modal-overlay">
      <div className="tax-modal">
        <h2>{isEdit ? "Edit Tax Rule" : "Add Tax Rule"}</h2>

        <div className="form-group">
          <label>Tax Name *</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Tax Rate (%) *</label>
          <input
            type="number"
            min="0"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Apply to Category *</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="tax-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="add-btn" onClick={handleSubmit}>
            {isEdit ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaxForm;
