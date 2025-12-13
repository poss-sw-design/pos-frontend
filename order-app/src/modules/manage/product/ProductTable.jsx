import React from "react";
import { Pencil, Trash } from "lucide-react";

const ProductTable = ({ categories, products, onEdit, onDelete }) => {
  const getCategoryName = (id) =>
    categories.find((c) => c.id === id)?.name || "Unknown";

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{getCategoryName(p.categoryId)}</td>
            <td>${p.price}</td>
            <td className="actions">
              <button onClick={() => onEdit(p)} className="icon-btn">
                <Pencil size={18} />
              </button>

              <button onClick={() => onDelete(p.id)} className="icon-btn">
                <Trash size={18} color="red" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
