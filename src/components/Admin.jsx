/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Sidebar from "./navigations/Sidebar";
import Hotel from "./contents/Hotel";
import Bills from "./contents/Bills";
import Product from "./contents/Product";
import BillDetail from "./contents/BillDetail";

const Admin = () => {
  const [activeMenu, setActiveMenu] = useState("Bills");
  const [selectedBill, setSelectedBill] = useState(null);

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
  };

  const handleBillSelect = (bill) => {
    setSelectedBill(bill);
    setActiveMenu("BillDetail");
  };

  const handleBackToBills = () => {
    setSelectedBill(null);
    setActiveMenu("Bills");
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "Bills":
        return <Bills handleBillSelect={handleBillSelect} />;
      case "Product":
        return <Product />;
      case "Hotel":
        return <Hotel />;
      case "BillDetail":
        return <BillDetail bill={selectedBill} onBack={handleBackToBills} />;
      default:
        return <Bills handleBillSelect={handleBillSelect} />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-custom-black-1 flex flex-row">
      <Sidebar activeMenu={activeMenu} handleMenuClick={handleMenuClick} />
      <div className="flex-grow">{renderContent()}</div>
    </div>
  );
};

export default Admin;
