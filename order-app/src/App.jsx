import React, { useState } from "react";
import MainLayout from "./layout/MainLayout";

import OrderDashboard from "./modules/order/pages/OrderDashboard";
import OrderCreate from "./modules/order/pages/OrderCreate";

import BookingDashboard from "./modules/booking/pages/BookingDashboard";
import BookingCreate from "./modules/booking/pages/BookingCreate";
import ReservationList from "./modules/booking/pages/ReservationList";

import ManageDashboard from "./modules/manage/pages/ManageDashboard";

// Discount
import DiscountDashboard from "./modules/manage/discount/DiscountDashboard";
import DiscountForm from "./modules/manage/discount/DiscountForm";

// Manage Menu
import ManageMenu from "./modules/manage/product/ManageMenu";

// Tax
import TaxDashboard from "./modules/manage/tax/TaxDashboard";
import ManageUsers from "./modules/manage/user/ManageUsers";

function App() {
  const [screen, setScreen] = useState("order");

  // BOOKINGS
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);

  // DISCOUNTS
  const [discounts, setDiscounts] = useState([]);
  const [editingDiscount, setEditingDiscount] = useState(null);

  // MENU CATEGORIES & PRODUCTS
  const [menuCategories, setMenuCategories] = useState([
    { id: 1, name: "Coffee" },
    { id: 2, name: "Tea" },
    { id: 3, name: "Dessert" },
  ]);

  const [menuItems, setMenuItems] = useState([
    { id: 101, categoryId: 1, name: "Americano", price: 5.0 },
    { id: 102, categoryId: 1, name: "Latte", price: 6.5 },
    { id: 201, categoryId: 2, name: "Earl Grey", price: 3.0 },
  ]);

  // TAX RULES
  const [taxes, setTaxes] = useState([
    {
      id: 1,
      name: "Food Tax",
      rate: 10,
      categoryId: 1,
      description: "Applies to all food items",
      status: "active",
    },
    {
      id: 2,
      name: "Beverage Tax",
      rate: 12,
      categoryId: 2,
      description: "Beverages category",
      status: "active",
    },
  ]);

  /** DISCOUNT HANDLERS **/
  const addDiscount = (d) => setDiscounts(prev => [...prev, d]);
  const updateDiscount = (d) =>
    setDiscounts(prev => prev.map(x => x.id === d.id ? d : x));
  const deleteDiscount = (id) =>
    setDiscounts(prev => prev.filter(x => x.id !== id));

  /** BOOKING **/
  const cancelBooking = (id) =>
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status: "cancelled" } : b))
    );

  const handleBookingConfirm = (data) => {
    setBookings(prev => [...prev, { id: Date.now(), ...data }]);
    setScreen("reservation-list");
  };

  const handleBookingUpdate = (updated) => {
    setBookings(prev =>
      prev.map(b => (b.id === updated.id ? updated : b))
    );
    setScreen("reservation-list");
  };

  // USERS (User Management)
const [users, setUsers] = useState([
  {
    id: 1,
    name: "Robert Johnson",
    email: "robert@example.com",
    phone: "(555) 123-4567",
    role: "Employee",          // Employee | Manager | SuperAdmin
    status: "active",          // active | inactive
  },
  {
    id: 2,
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "(555) 987-6543",
    role: "Manager",
    status: "active",
  },
  {
    id: 3,
    name: "James Brown",
    email: "james@example.com",
    phone: "(555) 456-7890",
    role: "Employee",
    status: "inactive",
  },
]);



  return (
    <MainLayout
      screen={screen}
      goOrder={() => setScreen("order")}
      goBooking={() => setScreen("booking")}
      goManage={() => setScreen("manage")}
    >
      {/* ORDER */}
      {screen === "order" && (
        <OrderDashboard onCreateOrder={() => setScreen("order-create")} />
      )}

      {screen === "order-create" && (
        <OrderCreate
          onBack={() => setScreen("order")}
          discounts={discounts}
          categories={menuCategories}
          products={menuItems}
          taxes={taxes}               
        />
      )}

      {/* BOOKING */}
      {screen === "booking" && (
        <BookingDashboard
          onCreateBooking={() => setScreen("create-booking")}
          onViewList={() => setScreen("reservation-list")}
        />
      )}

      {screen === "create-booking" && (
        <BookingCreate
          onBack={() => setScreen("booking")}
          onConfirm={handleBookingConfirm}
        />
      )}

      {screen === "reservation-list" && (
        <ReservationList
          bookings={bookings}
          onBack={() => setScreen("booking")}
          onEdit={(b) => {
            setEditingBooking(b);
            setScreen("edit-booking");
          }}
          onCancelBooking={cancelBooking}
        />
      )}

      {screen === "edit-booking" && (
        <BookingCreate
          editing={editingBooking}
          onBack={() => setScreen("reservation-list")}
          onConfirm={handleBookingUpdate}
        />
      )}

      {/* MANAGE */}
      {screen === "manage" && (
        <ManageDashboard
          onBack={() => setScreen("order")}
          goDiscount={() => setScreen("discount")}
          goMenu={() => setScreen("menu")}
          goTax={() => setScreen("tax")}
          goUsers={() => setScreen("users")}
        />
      )}

      {/* DISCOUNT */}
      {screen === "discount" && (
        <DiscountDashboard
          discounts={discounts}
          onBack={() => setScreen("manage")}
          onCreate={() => setScreen("discount-create")}
          onEdit={(d) => {
            setEditingDiscount(d);
            setScreen("discount-edit");
          }}
          onDelete={deleteDiscount}
        />
      )}

      {screen === "discount-create" && (
        <DiscountForm
          onBack={() => setScreen("discount")}
          onSave={(d) => {
            addDiscount(d);
            setScreen("discount");
          }}
        />
      )}

      {screen === "discount-edit" && (
        <DiscountForm
          editing={editingDiscount}
          onBack={() => setScreen("discount")}
          onSave={(d) => {
            updateDiscount(d);
            setScreen("discount");
          }}
        />
      )}

      {/* MENU MANAGEMENT */}
      {screen === "menu" && (
        <ManageMenu
          onBack={() => setScreen("manage")}
          categories={menuCategories}
          products={menuItems}
          onAddCategory={(c) => setMenuCategories(prev => [...prev, c])}
          onUpdateCategory={(c) =>
            setMenuCategories(prev =>
              prev.map(x => (x.id === c.id ? c : x))
            )
          }
          onDeleteCategory={(id) => {
            setMenuCategories(prev => prev.filter(x => x.id !== id));
            setMenuItems(prev => prev.filter(p => p.categoryId !== id));
          }}
          onAddProduct={(p) => setMenuItems(prev => [...prev, p])}
          onUpdateProduct={(p) =>
            setMenuItems(prev =>
              prev.map(x => (x.id === p.id ? p : x))
            )
          }
          onDeleteProduct={(id) =>
            setMenuItems(prev => prev.filter(x => x.id !== id))
          }
        />
      )}

      {/* TAX MANAGEMENT */}
      {screen === "tax" && (
        <TaxDashboard
          taxes={taxes}
          categories={menuCategories}     
          onAdd={(t) => setTaxes(prev => [...prev, t])}
          onUpdate={(t) =>
            setTaxes(prev => prev.map(x => (x.id === t.id ? t : x)))
          }
          onDelete={(id) =>
            setTaxes(prev => prev.filter(x => x.id !== id))
          }
          onBack={() => setScreen("manage")}
        />
      )}

      {screen === "users" && (
  <ManageUsers
    users={users}
    onBack={() => setScreen("manage")}
    onAdd={(user) => setUsers(prev => [...prev, user])}
    onUpdate={(u) => setUsers(prev => prev.map(x => x.id === u.id ? u : x))}
    onDelete={(id) => setUsers(prev => prev.map(x => x.id === id ? { ...x, active:false } : x))}
  />
)}


    </MainLayout>
  );
}

export default App;
