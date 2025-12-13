import React from "react";
import { Pencil, Trash } from "lucide-react";

const CategoryList = ({ categories, selected, onSelect, onAdd, onEdit, onDelete }) => {
  return (
    <div className="category-panel">
      <h2>Categories</h2>

      <button className="add-btn" onClick={onAdd}>+ Add Category</button>

      <ul className="category-list">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className={selected?.id === cat.id ? "active" : ""}
            onClick={() => onSelect(cat)}
          >
            <span>{cat.name}</span>

            <div className="actions">
              <Pencil size={16} onClick={(e) => { e.stopPropagation(); onEdit(cat); }} />
              <Trash size={16} color="red" onClick={(e) => { e.stopPropagation(); onDelete(cat.id); }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
