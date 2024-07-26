/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { TbLogout, TbLogin } from "react-icons/tb";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FaHotel } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import PropTypes from "prop-types";
import Sidebar from "./navigations/Sidebar";
import Hotel from "./contents/Hotel";
import Bills from "./contents/Bills";
import Product from "./contents/Product";
import BillDetail from "./contents/BillDetail";
import HotelDetail from "./contents/HotelDetail";
import Login from "./contents/Login";
import ModalConfirmation from "./molecules/ModalConfirmation";
import animation from "/icons/login-animation.svg";

const Admin = () => {
  const [activeMenu, setActiveMenu] = useState("Home");
  const [selectedBill, setSelectedBill] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

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

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveMenu("Bills");
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    setIsLoggedIn(false);
    setIsLogoutModalOpen(false);
    setActiveMenu("Home");
  };

  const cancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  const renderContent = () => {
    if (!isLoggedIn && activeMenu === "Login") {
      return <Login onLogin={handleLogin} />;
    }

    if (!isLoggedIn) {
      return (
        <div className="overflow-auto px-9 py-6 h-[93vh] bg-custom-white-1 mt-5 mr-5 ml-5 rounded-lg flex flex-col items-center justify-center">
          <img src={animation} alt="" width={295} height={295} />
          <h4 className="text-slate-600 text-lg mt-8">
            Silahkan Login untuk Melihat Nota Database
          </h4>
        </div>
      );
    }

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
      <Sidebar
        activeMenu={activeMenu}
        handleMenuClick={handleMenuClick}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onLogin={handleLogin}
      />
      <div className="flex-grow">{renderContent()}</div>
      <ModalConfirmation
        title="Konfirmasi Logout"
        textCancel="Kembali"
        textOk="Logout"
        functionCancel={cancelLogout}
        functionOk={confirmLogout}
        isOpen={isLogoutModalOpen}
      />
    </div>
  );
};

export default Admin;
