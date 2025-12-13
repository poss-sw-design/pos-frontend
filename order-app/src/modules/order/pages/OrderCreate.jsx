import React, { useState, useMemo } from "react";
import CategoryTabs from "./MenuPanel/CategoryTabs";
import MenuGrid from "./MenuPanel/MenuGrid";
import OptionPanel from "./MenuPanel/OptionPanel";
import OrderSummary from "./SummaryPanel/OrderSummary";
import SplitBill from "./SplitBillPanel/SplitBill";
import "./OrderCreate.css";

const OrderCreate = ({ 
  onBack, 
  menuItems = [], 
  categories = [], 
  taxes = [] 
}) => {

  // 현재 선택된 카테고리 ID
  const [selectedCategory, setSelectedCategory] = useState(
    categories[0]?.id || null
  );

  const [orderItems, setOrderItems] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [specialRequest, setSpecialRequest] = useState("");
  const [showSplitBill, setShowSplitBill] = useState(false);
  const appliedTax = taxes.find(
  t => t.categoryId === item.categoryId && t.status === "active"
);

const taxAmount = appliedTax ? item.price * (appliedTax.rate / 100) : 0;

const finalPrice = item.price + taxAmount;

  // 선택된 카테고리의 제품들 필터링
  const filteredMenu = useMemo(() => {
    return menuItems.filter((item) => item.categoryId === selectedCategory);
  }, [menuItems, selectedCategory]);

  // Split Bill 처리
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

  // 메뉴 옵션 선택 완료 → 세금 적용한 totalPrice 계산 포함
  const finishOption = (item) => {
    const taxRule = taxes.find((t) => t.id === item.taxCategoryId);
    const taxRate = taxRule?.rate || 0;

    const taxAmount = item.price * (taxRate / 100);
    const finalPrice = item.price + taxAmount;

    const finalItem = {
      ...item,
      taxRate,
      taxAmount,
      totalPrice: finalPrice,
    };

    setOrderItems((prev) => [...prev, finalItem]);
    setSelectedMenu(null);
  };

  // 총액 계산
  const subtotal = orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const discount = 0; // discount 시스템 추가 시 적용
  const total = subtotal - discount;

  // Split Bill 화면
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
      {/* LEFT SIDE: 메뉴 패널 */}
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
              items={filteredMenu}
              addItemToOrder={(item) => setSelectedMenu(item)}
            />
          </>
        )}
      </div>

      {/* RIGHT SIDE: 요약 패널 */}
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
