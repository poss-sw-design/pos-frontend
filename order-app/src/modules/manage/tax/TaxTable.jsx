import React from "react";
import TaxStatusBadge from "./TaxStatusBadge";
import { Pencil, Trash } from "lucide-react";

const TaxTable = ({ taxes, onEdit, onDelete }) => {
  return (
    <table className="tax-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Rate</th>
          <th>Status</th>
          <th>Description</th>
          <th>Created</th>
          <th>Updated</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {taxes.map((t) => (
          <tr key={t.id}>
            <td>{t.name}</td>
            <td>{t.rate}%</td>
            <td><TaxStatusBadge status={t.status} /></td>
            <td>{t.description}</td>
            <td>{t.createdAt}</td>
            <td>{t.updatedAt}</td>

            <td className="actions">
              <button className="icon-btn" onClick={() => onEdit(t)}>
                <Pencil size={18} />
              </button>

              <button className="icon-btn" onClick={() => onDelete(t.id)}>
                <Trash size={18} color="red" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaxTable;
