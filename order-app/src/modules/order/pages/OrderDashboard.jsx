import React, { useState } from "react";
import OrderCreate from "./OrderCreate";
import "./OrderDashboard.css";

const OrderDashboard = () => {
  const [view, setView] = useState("dashboard"); // dashboard / create / viewOrder
  const [orders, setOrders] = useState([]);

  // 새 주문 생성 후 저장하는 함수
  const addOrder = (order) => {
    setOrders((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        createdAt: new Date().toLocaleTimeString(),
        status: "Pending",
        ...order,
      },
    ]);
    setView("dashboard");
  };

  // -------------------------
  // 화면 전환
  // -------------------------
  if (view === "create") {
  return <OrderCreate onBack={() => setView("dashboard")} onComplete={addOrder} />;
}


  return (
    <div className="dashboard-container">

      {/* TOP BAR */}
      <header className="dashboard-header">
        <h1>Order Dashboard</h1>
        <span>{new Date().toLocaleDateString()}</span>
      </header>

      {/* NEW ORDER CARD */}
      <div className="new-order-card" onClick={() => setView("create")}>
        <h2>+ Create New Order</h2>
        <p>Start a new customer order</p>
      </div>

      {/* ONGOING ORDERS */}
      <section className="orders-section">
        <h3>Ongoing Orders</h3>

        {orders.filter((o) => o.status !== "Completed").length === 0 && (
          <div className="empty-text">No orders in progress</div>
        )}

        {orders
          .filter((o) => o.status !== "Completed")
          .map((order) => (
            <div key={order.id} className="order-card">
              <div>
                <div className="order-title">Order #{order.id}</div>
                <div className="order-time">{order.createdAt}</div>
              </div>
              <div className="order-actions">
                <button>View</button>
                <button>Complete</button>
              </div>
            </div>
          ))}
      </section>

      {/* COMPLETED ORDERS */}
      <section className="orders-section">
        <h3>Completed Orders</h3>

        {orders.filter((o) => o.status === "Completed").length === 0 && (
          <div className="empty-text">No completed orders</div>
        )}

        {orders
          .filter((o) => o.status === "Completed")
          .map((order) => (
            <div key={order.id} className="order-card completed">
              <div>
                <div className="order-title">Order #{order.id}</div>
                <div className="order-time">{order.createdAt}</div>
              </div>
              <div className="order-actions">
                <button>View</button>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
};

export default OrderDashboard;
