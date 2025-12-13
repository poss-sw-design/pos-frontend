import React from "react";
import { Pencil, Trash } from "lucide-react";

const ProductList = ({ products, onAdd, onEdit, onDelete }) => {
  return (
    <div className="product-panel">
      <h2>Products</h2>

      <button className="add-btn" onClick={onAdd}>+ Add Product</button>

      {products.length === 0 ? (
        <p className="empty">Select a category</p>
      ) : (
        <ul className="product-list">
          {products.map((p) => (
            <li key={p.id}>
              <div>
                <strong>{p.name}</strong>
                <div className="mini">${p.price.toFixed(2)}</div>
              </div>

              <div className="actions">
                <Pencil size={16} onClick={() => onEdit(p)} />
                <Trash size={16} color="red" onClick={() => onDelete(p.id)} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
