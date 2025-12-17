import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import OrderSummary from './SummaryPanel/OrderSummary';
import { OrdersAPI } from '../../../api/orders.api';
import { OrderPaymentAPI } from '../../../api/orderPayment.api';
import './OrderCreate.css';

const OrderCreate = ({ onBack, menuItems = [] }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [specialRequest, setSpecialRequest] = useState('');
  const [orderNumber] = useState(() => `ORD-${uuidv4()}`);

  const [activeCategory, setActiveCategory] = useState('');

  const addItemToOrder = item => {
    setOrderItems(prev => {
      const found = prev.find(i => i.productId === item.id);
      if (found) {
        return prev.map(i => (i.productId === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          id: Date.now(),
          orderItemId: Date.now(),
          productId: item.id,
          name: item.name,
          unitPrice: parseFloat(item.price),
          quantity: 1,
          taxRate: parseFloat(item.taxRate ?? 0.1),
        },
      ];
    });
  };

  const handleQuantityChange = (productId, delta) => {
    setOrderItems(prev =>
      prev.map(item =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const subtotal = orderItems.reduce(
    (sum, i) => sum + parseFloat(i.unitPrice) * parseInt(i.quantity),
    0
  );
  const taxAmount = orderItems.reduce(
    (sum, i) => sum + parseFloat(i.unitPrice) * parseInt(i.quantity) * (parseFloat(i.taxRate) || 0),
    0
  );
  const total = subtotal + taxAmount;

  const handlePayment = async () => {
    try {
      if (orderItems.length === 0) {
        alert('Cannot pay empty order. Please add items first.');
        return;
      }

      const orderRes = await OrdersAPI.create({
        merchantId: 1,
        employeeId: 1,
        orderNumber,
        specialRequests: specialRequest,
        items: orderItems.map(i => ({
          productId: i.productId,
          quantity: i.quantity,
        })),
      });

      const orderData = orderRes.data || orderRes;

      await OrderPaymentAPI.pay(orderData.orderId, {
        orderId: orderData.orderId,
        paymentMethod: 'cash',
        split: true,
        tipAmount: 0,
      });

      alert('Payment completed');
      setOrderItems([]);
      setSpecialRequest('');
    } catch (e) {
      console.error('Payment failed:', e);
      alert('Payment failed: ' + (e.message || JSON.stringify(e)));
    }
  };

  // 카테고리 목록
  const categories = [...new Set(menuItems.map(item => item.category).filter(Boolean))];

  // 카테고리 필터 적용, 없으면 전체 메뉴
  const filteredItems =
    activeCategory && categories.includes(activeCategory)
      ? menuItems.filter(item => item.category === activeCategory)
      : menuItems;

  return (
    <div className="order-container">
      <div className="menu-panel">
        {/* 카테고리 탭 */}
        {categories.length > 0 && (
          <div className="category-tabs">
            {categories.map(cat => (
              <div
                key={cat}
                className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </div>
            ))}
            <div
              className={`category-tab ${activeCategory === '' ? 'active' : ''}`}
              onClick={() => setActiveCategory('')}
            >
              All
            </div>
          </div>
        )}

        {/* 메뉴 그리드 */}
        <div className="menu-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="menu-card">
              <div className="menu-img" />
              <div className="menu-card-title">{item.name}</div>
              <div className="menu-card-price">${item.price}</div>
              <button onClick={() => addItemToOrder(item)}>Add</button>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div style={{ marginTop: 20, color: '#888', textAlign: 'center' }}>
            No items in this category.
          </div>
        )}
      </div>

      <OrderSummary
        orderItems={orderItems}
        subtotal={subtotal}
        taxAmount={taxAmount}
        total={total}
        discount={0}
        specialRequest={specialRequest}
        setSpecialRequest={setSpecialRequest}
        onPayment={handlePayment}
        handleQuantityChange={handleQuantityChange}
      />

      <button className="back-button" onClick={onBack}>
        Back
      </button>
    </div>
  );
};

export default OrderCreate;
