import React from "react";
import Sidebar from "./Sidebar";
import "./MainLayout.css";

const MainLayout = ({ screen, children, goOrder, goBooking, goManage }) => {
  return (
    <div className="layout-container">
      <Sidebar
        screen={screen}
        goOrder={goOrder}
        goBooking={goBooking}
        goManage={goManage}
      />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
