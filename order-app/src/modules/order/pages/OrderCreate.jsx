import React, { useState } from "react";
import CategoryTabs from "./MenuPanel/CategoryTabs";
import MenuGrid from "./MenuPanel/MenuGrid";
import OptionPanel from "./MenuPanel/OptionPanel";
import OrderSummary from "./SummaryPanel/OrderSummary";
import "./OrderCreate.css";

const OrderCreate = ({ onBack, onComplete }) => {

  const categories = ["Food", "Drink", "Dessert"];

  const sampleMenu = {
    Food: [
      { id: 1, name: "Americano", price: 5.0 },
      { id: 2, name: "Latte", price: 6.5 },
    ],
    Drink: [{ id: 3, name: "Coke", price: 2.5 }],
    Dessert: [{ id: 4, name: "Cheesecake", price: 4.5 }],
  };

  const [selectedCategory, setSelectedCategory] = useState("Food");
  const [orderItems, setOrderItems] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const finishOption = (finalItem) => {
    setOrderItems(prev => [...prev, finalItem]);
    setSelectedMenu(null);    // ← 왼쪽 패널을 다시 메뉴로 되돌림
  };

  const subtotal = orderItems.reduce((sum, i) => sum + i.totalPrice, 0);
  const discount = 0;
  const total = subtotal - discount;

  return (
  
    <div className="order-container">
        

      {/* LEFT SIDE */}
      <div className="menu-panel">
        {selectedMenu ? (
          <OptionPanel
            item={selectedMenu}
            onCancel={() => setSelectedMenu(null)}
            onAdd={finishOption}
          />
        ) : (
          <>
            <CategoryTabs
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <MenuGrid
              items={sampleMenu[selectedCategory]}
              addItemToOrder={(item) => setSelectedMenu(item)}
            />
          </>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="summary-panel">
        <div className="order-header">order no. 13567</div>
        <button className="back-button" onClick={onBack}>
        ← Back to Dashboard
        </button>
        <OrderSummary
          orderItems={orderItems}
          subtotal={subtotal}
          discount={discount}
          total={total}
        />
      </div>

    </div>
  );
};

export default OrderCreate;
