import React, { useState } from "react";
import CategoryTable from "./CategoryTable";
import CategoryForm from "./CategoryForm";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
import "./ManageMenu.css";

const ManageMenu = ({
  categories,
  products,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onBack,
}) => {
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  return (
    <div className="manage-wrapper">
      <button className="back-btn" onClick={onBack}>← Back</button>

      <h1 className="page-title">Manage Menu</h1>

      {/* CATEGORY CARD */}
      <div className="card">
        <div className="card-header">
          <h2>Manage Category</h2>
          <button className="add-btn-small" onClick={() => setEditingCategory({})}>
            + Add Category
          </button>
        </div>

        <CategoryTable
          categories={categories}
          products={products}
          onEdit={(cat) => setEditingCategory(cat)}
          onDelete={onDeleteCategory}
        />
      </div>

      {/* PRODUCT CARD */}
      <div className="card">
        <div className="card-header">
          <h2>Manage Product</h2>
          <button className="add-btn-small" onClick={() => setEditingProduct({})}>
            + Add Product
          </button>
        </div>

        <ProductTable
          categories={categories}
          products={products}
          onEdit={(p) => setEditingProduct(p)}
          onDelete={onDeleteProduct}
        />
      </div>

      {/* CATEGORY FORM MODAL */}
      {editingCategory && (
        <CategoryForm
          editing={editingCategory}
          onClose={() => setEditingCategory(null)}
          onSave={(data) => {
            editingCategory.id
              ? onUpdateCategory(data)
              : onAddCategory(data);
            setEditingCategory(null);
          }}
        />
      )}

      {/* PRODUCT FORM MODAL */}
      {editingProduct && (
        <ProductForm
          categories={categories}
          editing={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={(data) => {
            editingProduct.id
              ? onUpdateProduct(data)
              : onAddProduct(data);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default ManageMenu;
