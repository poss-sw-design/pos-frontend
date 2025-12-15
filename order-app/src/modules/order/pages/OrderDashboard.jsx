import React, { useEffect, useState } from 'react';
import { OrdersAPI } from '../../../api/orders.api';
import './OrderDashboard.css';

const OrderDashboard = ({ goCreate }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await OrdersAPI.getAll();
        setOrders(res || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Order Dashboard</h1>
        <span>{new Date().toLocaleDateString()}</span>
      </header>

      <div className="new-order-card" onClick={goCreate}>
        <h2>+ Create New Order</h2>
        <p>Start a new customer order</p>
      </div>

      <section className="orders-section">
        <h3>Ongoing Orders</h3>
        {orders.length === 0 && <div className="empty-text">No orders</div>}
        {orders.map(order => (
          <div key={order.orderId} className="order-card">
            <div>
              <div className="order-title">Order #{order.orderNumber}</div>
              <div className="order-time">{new Date(order.orderDate).toLocaleTimeString()}</div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default OrderDashboard;
