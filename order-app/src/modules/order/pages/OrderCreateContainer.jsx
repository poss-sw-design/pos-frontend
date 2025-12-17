import React, { useEffect, useState } from 'react';
import { ProductsAPI } from '../../../api/products.api';
import OrderCreate from './OrderCreate';

const OrderCreateContainer = ({ onBack }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductsAPI.getAll();
        setMenuItems(
          data.map(p => ({
            id: p.productId,
            name: p.name,
            price: p.price,
            taxRateValue: p.taxRate?.rate || 0,
          }))
        );
      } catch (e) {
        console.error('Failed to fetch products:', e);
      }
    };

    fetchProducts();
  }, []);

  return <OrderCreate onBack={onBack} menuItems={menuItems} />;
};

export default OrderCreateContainer;
