import React from "react";
import { Pencil, Trash } from "lucide-react";
import "./UserManagement.css";

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>User</th>
          <th>Role</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>
              <div className="user-info">
                <div className="user-avatar"></div>
                <div>
                  <div className="user-name">{u.name}</div>
                  <div className="user-email">{u.email}</div>
                </div>
              </div>
            </td>

            <td><span className={`role-badge ${u.role}`}>{u.role}</span></td>

            <td className={u.active ? "status-active" : "status-inactive"}>
              {u.active ? "Active" : "Inactive"}
            </td>

            <td>
              <button className="icon-btn" onClick={() => onEdit(u)}>
                <Pencil size={18} />
              </button>

              <button className="icon-btn" onClick={() => onDelete(u.id)}>
                <Trash size={18} color="red" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
