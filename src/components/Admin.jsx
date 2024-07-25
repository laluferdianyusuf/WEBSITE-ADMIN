/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Sidebar from "./navigations/Sidebar";
import Hotel from "./contents/Hotel";
import Bills from "./contents/Bills";
import Product from "./contents/Product";
import BillDetail from "./contents/BillDetail";
import HotelDetail from "./contents/HotelDetail";

const Admin = () => {
  const [activeMenu, setActiveMenu] = useState("Bills");
  const [selectedBill, setSelectedBill] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
  };

  const handleBillSelect = (bill) => {
    setSelectedBill(bill);
    setActiveMenu("BillsDetail");
  };

  const handleBackToBills = () => {
    setSelectedBill(null);
    setActiveMenu("Bills");
  };

  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
    setActiveMenu("HotelDetail");
  };

  const handleBackToHotel = () => {
    setSelectedHotel(null);
    setActiveMenu("Hotel");
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "Bills":
        return <Bills handleBillSelect={handleBillSelect} />;
      case "Product":
        return <Product />;
      case "Hotel":
        return <Hotel handleHotelSelect={handleHotelSelect} />;
      case "BillsDetail":
        return <BillDetail bill={selectedBill} onBack={handleBackToBills} />;
      case "HotelDetail":
        return <HotelDetail hotel={selectedHotel} onBack={handleBackToHotel} />;
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
