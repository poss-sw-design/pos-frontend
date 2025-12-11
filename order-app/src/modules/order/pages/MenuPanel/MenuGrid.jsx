import React from "react";
import MenuCard from "./MenuCard";

const MenuGrid = ({ items, addItemToOrder }) => {
  return (
    <div className="menu-grid">
      {items.map((item) => (
        <MenuCard key={item.id} item={item} addItemToOrder={addItemToOrder} />
      ))}
    </div>
  );
};

export default MenuGrid;
