import React, { useState } from "react";
import { ROLES } from "./permissionConfig";
import "./UserManagement.css";

const UserForm = ({ editing, onSave, onClose }) => {
  const [name, setName] = useState(editing?.name || "");
  const [email, setEmail] = useState(editing?.email || "");
  const [phone, setPhone] = useState(editing?.phone || "");
  const [role, setRole] = useState(editing?.role || ROLES.EMPLOYEE);
  const isEditing = Boolean(editing);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{isEditing ? "Edit User" : "Create User"}</h2>

        <div className="form-group">
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value={ROLES.EMPLOYEE}>Employee</option>
            <option value={ROLES.MANAGER}>Manager</option>
            <option value={ROLES.SUPERADMIN}>SuperAdmin</option>
          </select>
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>

          <button
            className="save-btn"
            onClick={() =>
              onSave({
                id: editing?.id || Date.now(),
                name,
                email,
                phone,
                role,
                active: true,
              })
            }
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
