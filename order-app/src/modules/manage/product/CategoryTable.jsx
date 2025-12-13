import React from "react";
import { Pencil, Trash } from "lucide-react";

const CategoryTable = ({ categories, products, onEdit, onDelete }) => {

  const countProducts = (categoryId) =>
    products.filter((p) => p.categoryId === categoryId).length;

  return (
    <table className="category-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Total Products</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {categories.map((c) => (
          <tr key={c.id}>
            <td>{c.name}</td>
            <td>{countProducts(c.id)}</td>

            <td className="actions">
              <button className="icon-btn" onClick={() => onEdit(c)}>
                <Pencil size={18} />
              </button>
              <button className="icon-btn" onClick={() => onDelete(c.id)}>
                <Trash size={18} color="red" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoryTable;
