import React, { useEffect, useState } from 'react';
import { OrdersAPI } from '../../../api/orders.api';
import { ProductsAPI } from '../../../api/products.api'; // ProductsAPI 사용
import './OrderDashboard.css';

const OrderDashboard = ({ goCreate }) => {
  const [orders, setOrders] = useState([]);
  const [productMap, setProductMap] = useState({}); // productId → name 매핑

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await OrdersAPI.getAll();
        setOrders(res || []);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await ProductsAPI.getAll(); // 전체 상품 조회
        const map = {};
        res.forEach(product => {
          map[product.productId] = product.name;
        });
        setProductMap(map);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
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
            <div className="order-card-header">
              <div className="order-title">Order #{order.orderNumber}</div>
              <div className="order-time">{new Date(order.orderDate).toLocaleTimeString()}</div>
            </div>

            <div className="order-items">
              {order.items.map(item => (
                <div key={item.productId}>
                  {productMap[item.productId] || `Product ${item.productId}`} x{item.quantity}
                </div>
              ))}
            </div>

            <div className="order-footer">
              <div className="order-total">Total: ${order.finalAmount.toFixed(2)}</div>
              <div className={`order-status ${order.status.toLowerCase()}`}>{order.status}</div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default OrderDashboard;
