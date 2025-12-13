import React, { useState, useEffect } from "react";
import "./ProductForm.css";
import { X } from "lucide-react";

const TAX_CATEGORIES = ["Food", "Beverages", "Service"];

// 예시: Tax Category 선택에 따라 Subcategory 바뀜
const SUBCATEGORY_MAP = {
  Food: ["Pizza", "Pasta", "Salad"],
  Beverages: ["Juices", "Coffee", "Tea"],
  Service: ["Haircut", "Massage", "Nails"]
};

// Ingredient Category 리스트 예시
// 실제로는 backend에서 가져올 예정
const INGREDIENT_CATEGORY_MAP = {
  Sugar: ["White", "Brown"],
  Milk: ["Whole", "Skim", "Soy"],
  Toppings: ["Cheese", "Olives", "Bacon"]
};

const ProductForm = ({ categories, editing, onClose, onSave }) => {
  const isEdit = editing && editing.id;

  const [name, setName] = useState(editing?.name || "");
  const [taxCategory, setTaxCategory] = useState(editing?.taxCategory || "Food");
  const [subcategory, setSubcategory] = useState(editing?.subcategory || "");
  const [ingredientCategory, setIngredientCategory] = useState("");
  const [ingredientOptions, setIngredientOptions] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState(
    editing?.ingredients || []
  );
  const [price, setPrice] = useState(editing?.price || "");
  const [description, setDescription] = useState(editing?.description || "");

  // Subcategory 업데이트
  useEffect(() => {
    const subs = SUBCATEGORY_MAP[taxCategory] || [];
    setSubcategory(subs[0] || "");
  }, [taxCategory]);

  // Ingredient Category 선택 시 Ingredient 목록 업데이트
  useEffect(() => {
    if (ingredientCategory) {
      setIngredientOptions(INGREDIENT_CATEGORY_MAP[ingredientCategory] || []);
    }
  }, [ingredientCategory]);

  const toggleIngredient = (item) => {
    setSelectedIngredients((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const handleSubmit = () => {
    if (!name.trim()) return alert("Product name is required");
    if (!price) return alert("Price is required");

    onSave({
      id: editing?.id || Date.now(),
      name,
      taxCategory,
      subcategory,
      ingredientCategory,
      ingredients: selectedIngredients,
      price: Number(price),
      description
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal product-modal">

        {/* HEADER */}
        <div className="modal-header">
          <h2>{isEdit ? "Edit Product" : "Add Product"}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="modal-body">

          {/* PRODUCT NAME */}
          <label className="form-label">Product Name *</label>
          <input
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
          />

          {/* TAX CATEGORY */}
          <label className="form-label">Tax Category *</label>
          <select
            className="form-input"
            value={taxCategory}
            onChange={(e) => setTaxCategory(e.target.value)}
          >
            {TAX_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          {/* SUBCATEGORY */}
          <label className="form-label">Subcategory *</label>
          <select
            className="form-input"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
          >
            {(SUBCATEGORY_MAP[taxCategory] || []).map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          {/* INGREDIENT CATEGORY */}
          <label className="form-label">Ingredient Category</label>
          <select
            className="form-input"
            value={ingredientCategory}
            onChange={(e) => setIngredientCategory(e.target.value)}
          >
            <option value="">Select category...</option>
            {Object.keys(INGREDIENT_CATEGORY_MAP).map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          {/* INGREDIENT TAGS */}
          {selectedIngredients.length > 0 && (
            <div className="selected-tags">
              {selectedIngredients.map((i) => (
                <span className="tag" key={i}>{i}</span>
              ))}
            </div>
          )}

          {/* INGREDIENT OPTIONS */}
          {ingredientOptions.length > 0 && (
            <div className="ingredient-options">
              {ingredientOptions.map((item) => (
                <label
                  key={item}
                  className={`ingredient-option ${
                    selectedIngredients.includes(item) ? "active" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedIngredients.includes(item)}
                    onChange={() => toggleIngredient(item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          )}

          {/* PRICE */}
          <label className="form-label">Price *</label>
          <input
            className="form-input"
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          {/* DESCRIPTION */}
          <label className="form-label">Description</label>
          <textarea
            className="form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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

export default ProductForm;
