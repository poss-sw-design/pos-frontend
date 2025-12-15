import React, { useEffect, useState } from 'react';
import CategoryTable from './CategoryTable';
import ProductTable from './ProductTable';
import { ProductsAPI } from '../../../api/products.api';
import './ManageMenu.css';

const ManageMenu = ({ onBack }) => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const data = await ProductsAPI.getAll();
      setProducts(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      await loadProducts();
    };
    fetchProducts();
  }, []);

  const deleteProduct = async id => {
    try {
      await ProductsAPI.remove(id);
      await loadProducts();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="manage-wrapper">
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>
      <h1 className="page-title">Manage Menu</h1>

      <div className="card">
        <h2>Products</h2>
        <ProductTable products={products} onDelete={deleteProduct} />
      </div>
    </div>
  );
};

export default ManageMenu;
