import React, { useEffect, useState } from 'react';
import { ProductsAPI } from '../../../api/products.api';
import OrderCreate from './OrderCreate';

const OrderCreateContainer = ({ onBack, taxes = [] }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    ProductsAPI.getAll()
      .then(res => {
        const data = res || []; // axios면 res.data
        const mappedMenu = data.map(p => ({
          id: p.product_id,
          name: p.name,
          price: p.price,
          description: p.description || '',
          categoryId: p.category_id || 1,
        }));
        setMenuItems(mappedMenu);

        const uniqueCategories = [
          ...new Map(mappedMenu.map(item => [item.categoryId, item])).values(),
        ].map(item => ({
          id: item.categoryId,
          name: `Category ${item.categoryId}`,
        }));
        setCategories(uniqueCategories);
      })
      .catch(err => {
        console.error('Failed to fetch products', err);
        setMenuItems([]);
        setCategories([]);
      });
  }, []);

  return (
    <OrderCreate onBack={onBack} menuItems={menuItems} categories={categories} taxes={taxes} />
  );
};

export default OrderCreateContainer;
