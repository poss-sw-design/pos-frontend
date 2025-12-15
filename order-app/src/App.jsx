import React, { useState } from 'react';
import MainLayout from './layout/MainLayout';

// ORDER
import OrderDashboard from './modules/order/pages/OrderDashboard';
import OrderCreateContainer from './modules/order/pages/OrderCreateContainer';

// BOOKING
import BookingDashboard from './modules/booking/pages/BookingDashboard';
import BookingCreate from './modules/booking/pages/BookingCreate';
import ReservationList from './modules/booking/pages/ReservationList';

// MANAGE
import ManageDashboard from './modules/manage/pages/ManageDashboard';
import ManageMenu from './modules/manage/product/ManageMenu';

function App() {
  const [screen, setScreen] = useState('order');

  return (
    <MainLayout
      screen={screen}
      goOrder={() => setScreen('order')}
      goBooking={() => setScreen('booking')}
      goManage={() => setScreen('manage')}
    >
      {/* ORDER */}
      {screen === 'order' && <OrderDashboard goCreate={() => setScreen('create-order')} />}

      {screen === 'create-order' && <OrderCreateContainer onBack={() => setScreen('order')} />}

      {/* BOOKING */}
      {screen === 'booking' && (
        <BookingDashboard
          onCreateBooking={() => setScreen('booking-create')}
          onViewList={() => setScreen('reservation-list')}
        />
      )}
      {screen === 'booking-create' && <BookingCreate onBack={() => setScreen('booking')} />}
      {screen === 'reservation-list' && <ReservationList onBack={() => setScreen('booking')} />}

      {/* MANAGE */}
      {screen === 'manage' && (
        <ManageDashboard onBack={() => setScreen('order')} goMenu={() => setScreen('menu')} />
      )}
      {screen === 'menu' && <ManageMenu onBack={() => setScreen('manage')} />}
    </MainLayout>
  );
}

export default App;
