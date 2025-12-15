import React, { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CategoryTabs from './MenuPanel/CategoryTabs';
import MenuGrid from './MenuPanel/MenuGrid';
import OrderSummary from './SummaryPanel/OrderSummary';
import SplitBill from './SplitBillPanel/SplitBill';
import { OrdersAPI } from '../../../api/orders.api';
import './OrderCreate.css';

const OrderCreate = ({ onBack, menuItems = [], categories = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    categories[0]?.id || menuItems[0]?.categoryId || null
  );
  const [orderItems, setOrderItems] = useState([]);
  const [specialRequest, setSpecialRequest] = useState('');
  const [showSplitBill, setShowSplitBill] = useState(false);
  const [orderNumber] = useState(() => `ORD-${Date.now()}`);

  const filteredMenu = useMemo(() => {
    if (!selectedCategory) return [];
    return menuItems.filter(item => item.categoryId === selectedCategory);
  }, [menuItems, selectedCategory]);

  // 메뉴를 orderItems에 추가
  const addItemToOrder = item => {
    setOrderItems(prev => {
      const existing = prev.find(
        i =>
          i.productId === item.id &&
          i.size === item.size &&
          JSON.stringify(i.extras) === JSON.stringify(item.extras)
      );
      if (existing) {
        return prev.map(i =>
          i === existing
            ? {
                ...i,
                quantity: (i.quantity || 1) + (item.quantity || 1),
                totalPrice: ((i.quantity || 1) + (item.quantity || 1)) * Number(i.price || 0),
              }
            : i
        );
      } else {
        const finalItem = {
          id: uuidv4(),
          productId: item.id,
          name: item.name,
          price: Number(item.price || 0),
          quantity: item.quantity || 1,
          totalPrice: Number(item.price || 0) * (item.quantity || 1),
          size: item.size || '',
          extras: item.extras || [],
        };
        return [...prev, finalItem];
      }
    });
  };

  // 수량 증가/감소
  const handleQuantityChange = (id, delta) => {
    setOrderItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max((item.quantity || 1) + delta, 1),
              totalPrice: Number(item.price || 0) * Math.max((item.quantity || 1) + delta, 1),
            }
          : item
      )
    );
  };

  const subtotal = orderItems.reduce((sum, item) => sum + Number(item.totalPrice || 0), 0);
  const discount = 0;
  const total = subtotal - discount;

  const handlePayment = async () => {
    if (orderItems.length === 0) return alert('Order is empty.');
    try {
      const payload = {
        order: { merchantId: 1, employeeId: 1, orderNumber },
        items: orderItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity || 1,
          unitPrice: Number(item.price || 0),
        })),
        discountId: null,
        payment: { orderId: null, paymentMethod: 'cash', split: false, tipAmount: 0 },
      };
      console.log('Sending payload:', payload);
      await OrdersAPI.createWithPayment(payload);
      alert(`Payment successful! Order No: ${orderNumber}`);
      setOrderItems([]);
      setSpecialRequest('');
    } catch (err) {
      console.error(err);
      alert('Payment failed');
    }
  };

  if (showSplitBill) {
    return (
      <SplitBill
        orderItems={orderItems}
        onBack={() => setShowSplitBill(false)}
        onComplete={paidIds =>
          setOrderItems(prev =>
            prev.map(item => (paidIds.includes(item.id) ? { ...item, paid: true } : item))
          )
        }
      />
    );
  }

  return (
    <div className="order-container">
      <div className="menu-panel">
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <MenuGrid items={filteredMenu} addItemToOrder={addItemToOrder} />
      </div>

      <div className="summary-panel">
        <div className="order-header">Order No. {orderNumber}</div>
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
          onPayment={handlePayment}
          handleQuantityChange={handleQuantityChange}
        />
      </div>
    </div>
  );
};

export default OrderCreate;
