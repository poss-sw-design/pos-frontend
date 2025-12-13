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

// NEW: Manage Menu
import ManageMenu from "./modules/manage/product/ManageMenu";

function App() {
  const [screen, setScreen] = useState("order");

  // 예약 (Booking)
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);

  // Discounts
  const [discounts, setDiscounts] = useState([]);
  const [editingDiscount, setEditingDiscount] = useState(null);

  // Menu Categories & Products
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

  /** DISCOUNT HANDLERS **/
  const addDiscount = (discount) => setDiscounts((prev) => [...prev, discount]);
  const updateDiscount = (updated) =>
    setDiscounts((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
  const deleteDiscount = (id) =>
    setDiscounts((prev) => prev.filter((d) => d.id !== id));

  /** BOOKING **/
  const cancelBooking = (id) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b))
    );
  };

  const handleBookingConfirm = (bookingData) => {
    console.log("Booking saved:", bookingData);
    setBookings((prev) => [...prev, { id: Date.now(), ...bookingData }]);
    setScreen("reservation-list");
  };

  const handleBookingUpdate = (updatedBooking) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === updatedBooking.id ? updatedBooking : b))
    );
    setScreen("reservation-list");
  };

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
          goMenu={() => setScreen("menu")}  // ← HERE
          goTax={() => setScreen("tax")}
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
          onSave={(newDiscount) => {
            addDiscount(newDiscount);
            setScreen("discount");
          }}
        />
      )}

      {screen === "discount-edit" && (
        <DiscountForm
          editing={editingDiscount}
          onBack={() => setScreen("discount")}
          onSave={(updated) => {
            updateDiscount(updated);
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

          onAddCategory={(c) => setMenuCategories((prev) => [...prev, c])}
          onUpdateCategory={(c) =>
            setMenuCategories((prev) =>
              prev.map((x) => (x.id === c.id ? c : x))
            )
          }
          onDeleteCategory={(id) => {
            setMenuCategories((prev) => prev.filter((x) => x.id !== id));
            setMenuItems((prev) => prev.filter((p) => p.categoryId !== id));
          }}

          onAddProduct={(p) => setMenuItems((prev) => [...prev, p])}
          onUpdateProduct={(p) =>
            setMenuItems((prev) =>
              prev.map((x) => (x.id === p.id ? p : x))
            )
          }
          onDeleteProduct={(id) =>
            setMenuItems((prev) => prev.filter((x) => x.id !== id))
          }
        />
      )}
    </MainLayout>
  );
}

export default App;
