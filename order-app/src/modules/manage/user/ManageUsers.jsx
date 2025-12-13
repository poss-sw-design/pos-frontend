import React, { useState } from "react";
import UserTable from "./UserTable";
import UserForm from "./UserForm";
import "./UserManagement.css";

const ManageUsers = ({ users, onAdd, onUpdate, onDelete, onBack }) => {
  const [editingUser, setEditingUser] = useState(null);

  return (
    <div className="manage-users-container">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <h1>User Management</h1>

      <div className="header-row">
        <h2>Users</h2>
        <button className="add-btn" onClick={() => setEditingUser({})}>
          + Add User
        </button>
      </div>

      <UserTable
        users={users}
        onEdit={(user) => setEditingUser(user)}
        onDelete={onDelete}
      />

      {editingUser && (
        <UserForm
          editing={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={(data) => {
            editingUser.id ? onUpdate(data) : onAdd(data);
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
};

export default ManageUsers;
