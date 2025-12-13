import React, { useState, useEffect } from "react";
import "./CategoryForm.css";
import { X, Minus } from "lucide-react";

const CategoryForm = ({ editing = null, onClose, onSave }) => {
  const isEdit = editing && editing.id;

  const [name, setName] = useState(editing?.name || "");
  const [description, setDescription] = useState(editing?.description || "");
  const [ingredients, setIngredients] = useState(
    editing?.ingredients || [{ name: "", id: "" }]
  );

  // Ingredient 추가
  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", id: "" }]);
  };

  // Ingredient 삭제
  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // Ingredient 값 변경
  const updateIngredient = (index, field, value) => {
    const newList = [...ingredients];
    newList[index][field] = value;
    setIngredients(newList);
  };

  const handleSubmit = () => {
    if (!name.trim()) return alert("Category name is required");

    onSave({
      id: editing?.id || Date.now(),
      name,
      description,
      ingredients
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal category-modal">

        {/* HEADER */}
        <div className="modal-header">
          <h2>{isEdit ? "Edit Category" : "Add Category"}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* FORM CONTENT */}
        <div className="modal-body">

          {/* CATEGORY NAME */}
          <label className="form-label">Category Name *</label>
          <input
            className="form-input"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* DESCRIPTION */}
          <label className="form-label">Description</label>
          <textarea
            className="form-textarea"
            placeholder="Short description…"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* INGREDIENTS */}
          <div className="ingredient-header">
            <label className="form-label">Ingredients</label>
            <button className="add-ingredient-btn" onClick={addIngredient}>
              + Add Ingredient
            </button>
          </div>

          {/* INGREDIENT LIST */}
          <div className="ingredient-list">
            {ingredients.map((ing, index) => (
              <div key={index} className="ingredient-item">

                <input
                  className="form-input ingredient-name"
                  placeholder="Ingredient name"
                  value={ing.name}
                  onChange={(e) =>
                    updateIngredient(index, "name", e.target.value)
                  }
                />

                <input
                  className="form-input ingredient-id"
                  placeholder="ID"
                  value={ing.id}
                  onChange={(e) =>
                    updateIngredient(index, "id", e.target.value)
                  }
                />

                <button
                  className="remove-btn"
                  onClick={() => removeIngredient(index)}
                >
                  <Minus size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER BUTTONS */}
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={handleSubmit}>
            {isEdit ? "Update" : "Add"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default CategoryForm;
