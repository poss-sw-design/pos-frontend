import React, { useState, useEffect } from "react";
import "./DiscountForm.css";

const DiscountForm = ({ editing, onBack, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    scope: "order",
    type: "percent",
    value: 0,
    minPrice: "",
    expires: "",
    maxUses: "",
    status: "Active",
  });

  // editing mode → 기존 값 채우기
  useEffect(() => {
    if (editing) {
      setForm(editing);
    }
  }, [editing]);

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const payload = {
      ...form,
      id: editing ? editing.id : Date.now(),
    };
    onSave(payload);
  };

  return (
    <div className="discount-form-container">
      <button className="back-btn" onClick={onBack}>← Back</button>

      <h1>{editing ? "Edit Discount" : "Create Discount"}</h1>

      <div className="discount-form">

        <label>
          Discount Name
          <input
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
        </label>

        <label>
          Scope
          <select
            value={form.scope}
            onChange={(e) => updateField("scope", e.target.value)}
          >
            <option value="order">Order Wide</option>
            <option value="product">Specific Product / Service</option>
          </select>
        </label>

        <label>
          Discount Type
          <select
            value={form.type}
            onChange={(e) => updateField("type", e.target.value)}
          >
            <option value="percent">Percentage</option>
            <option value="amount">Fixed Amount</option>
          </select>
        </label>

        <label>
          Discount Value
          <input
            type="number"
            value={form.value}
            onChange={(e) => updateField("value", Number(e.target.value))}
          />
        </label>

        <label>
          Minimum Price (optional)
          <input
            type="number"
            value={form.minPrice}
            onChange={(e) => updateField("minPrice", e.target.value)}
          />
        </label>

        <label>
          Expires On
          <input
            type="date"
            value={form.expires}
            onChange={(e) => updateField("expires", e.target.value)}
          />
        </label>

        <label>
          Max Uses (optional)
          <input
            type="number"
            value={form.maxUses}
            onChange={(e) => updateField("maxUses", e.target.value)}
          />
        </label>

        <button className="save-btn" onClick={handleSubmit}>
          {editing ? "Save Changes" : "Create Discount"}
        </button>
      </div>
    </div>
  );
};

export default DiscountForm;
