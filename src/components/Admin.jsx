/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Sidebar from "./navigations/Sidebar";
import Navbar from "./navigations/Navbar";
import Home from "./contents/Home";
import Hotel from "./contents/Hotel";
import Bills from "./contents/Bills";
import Product from "./contents/Product";

const Admin = () => {
  const [activeMenu, setActiveMenu] = useState("Product");

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "Product":
        return <Product />;
      case "Hotel":
        return <Hotel />;
      case "Bills":
        return <Bills />;
      default:
        return <Product />;
    }
  };
  return (
    <>
      {/* <div className="bg-blue-100 ">
        <Navbar />
      </div> */}
      <div className="w-full min-h-screen bg-custom-black-1 flex flex-row">
        <Sidebar activeMenu={activeMenu} handleMenuClick={handleMenuClick} />
        <div className="flex-grow">{renderContent()}</div>
      </div>
    </>
  );
};

export default Admin;
