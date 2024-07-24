/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Sidebar from "./navigations/Sidebar";
import Hotel from "./contents/Hotel";
import Bills from "./contents/Bills";
import Product from "./contents/Product";

const Admin = () => {
  const [activeMenu, setActiveMenu] = useState("Bills");

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "Bills":
        return <Bills />;
      case "Product":
        return <Product />;
      case "Hotel":
        return <Hotel />;
      default:
        return <Bills />;
    }
  };
  return (
    <>
      <div className="w-full min-h-screen bg-custom-black-1 flex flex-row">
        <Sidebar activeMenu={activeMenu} handleMenuClick={handleMenuClick} />
        <div className="flex-grow">{renderContent()}</div>
      </div>
    </>
  );
};

export default Admin;
