import React, { useState } from "react";
import CategoryTabs from "./MenuPanel/CategoryTabs";
import MenuGrid from "./MenuPanel/MenuGrid";
import OptionPanel from "./MenuPanel/OptionPanel";
import OrderSummary from "./SummaryPanel/OrderSummary";
import SplitBill from "./SplitBillPanel/SplitBill";
import "./OrderCreate.css";

const OrderCreate = ({ onBack, discounts = [] }) => {
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

  const [specialRequest, setSpecialRequest] = useState("");

  // Split Bill 화면 제어
  const [showSplitBill, setShowSplitBill] = useState(false);

  // Split Bill 완료 처리
  const handleSplitPayment = ({ paidIds }) => {
    setOrderItems((prev) =>
      prev.map((item) =>
        paidIds.includes(item.id)
          ? { ...item, paid: true }
          : item
      )
    );

    setShowSplitBill(false);
  };

  // 메뉴 옵션 선택 완료
  const finishOption = (finalItem) => {
    setOrderItems((prev) => [...prev, finalItem]);
    setSelectedMenu(null);
  };


  // 가격 계산
  const subtotal = orderItems.reduce((sum, i) => sum + i.totalPrice, 0);

  // ⚠️ 향후 실제 할인 로직 적용 가능
  const discount = 0;

  const total = subtotal - discount;

  // SPLIT BILL 화면 렌더링
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
      {/* LEFT PANEL */}
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

      {/* RIGHT PANEL */}
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
          onSplitBill={() => setShowSplitBill(true)}
        />
      </div>
    </div>
  );
};

export default OrderCreate;
