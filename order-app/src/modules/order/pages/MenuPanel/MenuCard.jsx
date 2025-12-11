import React from "react";

const MenuCard = ({ item, addItemToOrder }) => {
  return (
    <div className="menu-card">
      <div className="menu-img"></div>

      <div className="menu-card-title">{item.name}</div>
      <div className="menu-card-price">${item.price.toFixed(2)}</div>

      <button onClick={() => addItemToOrder(item)}>Add</button>
    </div>
  );
};

export default MenuCard;
