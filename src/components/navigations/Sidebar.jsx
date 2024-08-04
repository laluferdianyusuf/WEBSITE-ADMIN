/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from "react";
import { TbLogout, TbLogin } from "react-icons/tb";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FaHotel } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import PropTypes from "prop-types";
import ButtonAuth from "../atoms/ButtonAuth";
import LoginIcon from "/icons/Login.svg";
import LogoutIcon from "/icons/Logout.svg";

export default function Sidebar({
  activeMenu,
  handleMenuClick,
  isLoggedIn,
  onLogout,
  user,
}) {
  const menu = [
    {
      name: "Nota",
      icon: <FaRegMoneyBillAlt />,
      handler: () => handleMenuClick("Nota"),
    },
    {
      name: "Hotel",
      icon: <FaHotel />,
      handler: () => handleMenuClick("Hotel"),
    },
    {
      name: "Produk",
      icon: <AiFillProduct />,
      handler: () => handleMenuClick("Produk"),
    },
  ];

  const handleLogin = () => {
    handleMenuClick("Login");
  };

  return (
    <div
      className={`w-64 pl-7 pr-3 flex flex-col ${
        isLoggedIn ? "justify-between" : ""
      } my-7`}
    >
      <div className={`${isLoggedIn ? "" : "mb-10"}`}>
        <div className="flex flex-col">
          <span>
            <h1 className="font-semibold text-xl text-custom-white-1 mt-4">
              UD TIMUR JAYA RAYA
            </h1>
          </span>
        </div>
        <div className="mt-16">
          <ul className="space-y-4">
            <div className="font-semibold text-xs text-slate-500">
              MENU MANAJEMEN
            </div>
            {menu.map((val, index) => {
              return (
                <div key={index}>
                  <div className="flex flex-row justify-center ease-in-out duration-300">
                    <span
                      className={`self-center ease-in-out duration-300 ${
                        activeMenu === val.name ||
                        activeMenu === `${val.name}Detail`
                          ? "w-[5px] h-[20px] bg-custom-green-2"
                          : "w-[0px] h-[0px]"
                      }  rounded-full`}
                    ></span>
                    <button
                      key={index}
                      className={`ease-in-out duration-300 font-semibold text-white flex flex-row items-center w-full p-2 ${
                        activeMenu === val.name ||
                        activeMenu === `${val.name}Detail`
                          ? "ps-3"
                          : ""
                      }`}
                      onClick={val.handler}
                      disabled={!isLoggedIn}
                    >
                      <div
                        className={`${
                          activeMenu === val.name ||
                          activeMenu === `${val.name}Detail`
                            ? "text-custom-green-2"
                            : ""
                        }`}
                      >
                        {val.name}
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
      {isLoggedIn ? (
        <ButtonAuth handle={onLogout}>
          <img src={LogoutIcon} alt="login" />
          <p className="lowercase">admin</p>
        </ButtonAuth>
      ) : (
        <ButtonAuth handle={handleLogin} isLogin={true}>
          <img src={LoginIcon} alt="logout" />
          <p className="capitalize"> Login</p>
        </ButtonAuth>
      )}
    </div>
  );
}

Sidebar.propTypes = {
  activeMenu: PropTypes.string,
  handleMenuClick: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func,
};
