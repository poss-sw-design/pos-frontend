import React, { useState } from "react";
import CategoryList from "./CategoryList";
import CategoryForm from "./CategoryForm";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import "./ProductDashboard.css";

const ProductDashboard = ({ onBack }) => {
  // *** State ***
  const [categories, setCategories] = useState([
    { id: 1, name: "Coffee" },
    { id: 2, name: "Tea" },
    { id: 3, name: "Dessert" },
  ]);

  const [products, setProducts] = useState([
    { id: 101, categoryId: 1, name: "Americano", price: 5.0 },
    { id: 102, categoryId: 1, name: "Latte", price: 6.5 },
    { id: 201, categoryId: 2, name: "Green Tea", price: 3.0 },
  ]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  const [editingProduct, setEditingProduct] = useState(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);

  // *** Category CRUD ***
  const addCategory = (cat) => {
    setCategories((prev) => [...prev, cat]);
  };

  const updateCategory = (cat) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === cat.id ? cat : c))
    );
  };

  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));

    // 그 카테고리의 제품도 자동 삭제
    setProducts((prev) => prev.filter((p) => p.categoryId !== id));
  };

  // *** Product CRUD ***
  const addProduct = (p) => {
    setProducts((prev) => [...prev, p]);
  };

  const updateProduct = (p) => {
    setProducts((prev) => prev.map((x) => (x.id === p.id ? p : x)));
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="product-dashboard">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <h1>Manage Products</h1>

      <div className="manage-layout">
        
        {/* --- CATEGORY COLUMN --- */}
        <CategoryList
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          onAdd={() => { setEditingCategory(null); setShowCategoryForm(true); }}
          onEdit={(cat) => { setEditingCategory(cat); setShowCategoryForm(true); }}
          onDelete={deleteCategory}
        />

        {/* --- PRODUCT COLUMN --- */}
        <ProductList
          products={products.filter((p) => p.categoryId === selectedCategory?.id)}
          onAdd={() => { setEditingProduct(null); setShowProductForm(true); }}
          onEdit={(p) => { setEditingProduct(p); setShowProductForm(true); }}
          onDelete={deleteProduct}
        />
      </div>

      {/* Modal-like forms */}
      {showCategoryForm && (
        <CategoryForm
          editing={editingCategory}
          onSubmit={(cat) => {
            editingCategory ? updateCategory(cat) : addCategory(cat);
            setShowCategoryForm(false);
          }}
          onClose={() => setShowCategoryForm(false)}
        />
      )}

      {showProductForm && (
        <ProductForm
  categories={categories}
  ingredientCategories={ingredientCategories}
  onBack={() => setScreen("menu")}
  onSave={handleProductSave}
  editing={editingProduct}
/>

      )}
      
    </div>
  );
};

export default ProductDashboard;
