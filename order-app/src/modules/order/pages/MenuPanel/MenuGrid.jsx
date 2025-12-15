import React from 'react';
import MenuCard from './MenuCard';
import { v4 as uuidv4 } from 'uuid';

const MenuGrid = ({ items, addItemToOrder }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="menu-grid">
      {items.map(item => (
        <MenuCard key={item.id || uuidv4()} item={item} addItemToOrder={addItemToOrder} />
      ))}
    </div>
  );
};

export default MenuGrid;
