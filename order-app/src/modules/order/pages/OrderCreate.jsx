import React, { useState } from "react";
import CategoryTabs from "./MenuPanel/CategoryTabs";
import MenuGrid from "./MenuPanel/MenuGrid";
import OptionPanel from "./MenuPanel/OptionPanel";
import OrderSummary from "./SummaryPanel/OrderSummary";
import SplitBill from "./SplitBillPanel/SplitBill"; // ★ SplitBill 추가
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
  // ★ missing state — 반드시 추가해야 함
const [specialRequest, setSpecialRequest] = useState("");
  // ★ Split Bill 화면 열림 여부
  const [showSplitBill, setShowSplitBill] = useState(false);

  // ★ Split Bill 완료 시 데이터 업데이트
  const handleSplitPayment = (paidIds, tip) => {
    setOrderItems(prev =>
      prev.map(item =>
        paidIds.includes(item.id)
          ? { ...item, paid: true }
          : item
      )
    );

    // Split Bill 화면 종료
    setShowSplitBill(false);
  };

  const finishOption = (finalItem) => {
    setOrderItems(prev => [...prev, finalItem]);
    setSelectedMenu(null);
  };

  const subtotal = orderItems.reduce((sum, i) => sum + i.totalPrice, 0);
  const discount = 0;
  const total = subtotal - discount;

  // ★ Split Bill 화면이 열려 있을 때 이 화면을 대신 렌더링
  if (showSplitBill) {
    return (
      <SplitBill
        orderItems={orderItems}
        onBack={() => setShowSplitBill(false)}
        onComplete={handleSplitPayment}
      />
    );
  }

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
          specialRequest={specialRequest}
          setSpecialRequest={setSpecialRequest}
          onSplitBill={() => setShowSplitBill(true)} // ★ Split Bill 버튼 열기
        />
      </div>

    </div>
  );
};

export default OrderCreate;
