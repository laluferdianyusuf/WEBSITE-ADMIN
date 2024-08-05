import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logout } from "../redux/slices/adminSlice";
import Sidebar from "./navigations/Sidebar";
import Hotel from "./contents/Hotel";
import Bills from "./contents/Bills";
import Product from "./contents/Product";
import BillDetail from "./contents/BillDetail";
import HotelDetail from "./contents/HotelDetail";
import Login from "./contents/Login";
import ModalConfirmation from "./molecules/ModalConfirmation";
import animation from "/icons/login-animation.svg";

export default function Admin() {
  const [activeMenu, setActiveMenu] = useState("Nota");
  const [previousMenu, setPreviousMenu] = useState(null);
  const [selectedBill, setSelectedBill] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(currentUser())
      .unwrap()
      .then((response) => {
        if (response.status) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        console.log("No user logged in:", err);
        setIsLoggedIn(false);
      });
  }, [dispatch]);

  const handleMenuClick = (menuName) => {
    setPreviousMenu(activeMenu);
    setActiveMenu(menuName);
  };

  const handleBillSelect = (bill) => {
    setPreviousMenu(activeMenu);
    setSelectedBill(bill);
    setActiveMenu("NotaDetail");
  };

  const handleBack = () => {
    setActiveMenu(previousMenu);
    setPreviousMenu(null);
  };

  const handleHotelSelect = (index) => {
    setPreviousMenu(activeMenu);
    setSelectedHotel(index);
    setActiveMenu("HotelDetail");
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveMenu("Nota");
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    dispatch(logout());
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
      case "Nota":
        return <Bills handleBillSelect={handleBillSelect} />;
      case "Product":
        return <Product />;
      case "Hotel":
        return <Hotel handleHotelSelect={handleHotelSelect} />;
      case "NotaDetail":
        return <BillDetail bill={selectedBill} onBack={handleBack} />;
      case "HotelDetail":
        return (
          <HotelDetail
            hotel={selectedHotel}
            onBack={handleBack}
            onBillSelect={handleBillSelect}
          />
        );
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
        user={admin.user}
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
}
