/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from "react";
import { BiHomeAlt, BiGridAlt, BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { PiStudentFill, PiChalkboardTeacherDuotone } from "react-icons/pi";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import PropTypes from "prop-types";

export default function Sidebar({ activeMenu, handleMenuClick }) {
  const navigate = useNavigate();
  const menu = [
    {
      name: "Nota",
      icon: <PiStudentFill />,
      handler: () => handleMenuClick("Nota"),
    },
    {
      name: "Hotel",
      icon: <PiChalkboardTeacherDuotone />,
      handler: () => handleMenuClick("Hotel"),
    },
    {
      name: "Produk",
      icon: <HiOutlineClipboardDocumentList />,
      handler: () => handleMenuClick("Produk"),
    },
  ];

  const handleLogout = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="w-64 px-5 flex flex-col justify-between my-7">
      <div>
        <div className="flex flex-col">
          <span>
            <h1 className="font-semibold text-xl text-custom-white-1">
              UD TIMUR JAYA RAYA
            </h1>
          </span>
        </div>
        <div className="mt-16">
          <ul className="space-y-5">
            <div className="font-semibold text-xs text-slate-500">
              MENU MANAJEMEN
            </div>
            {menu.map((val, index) => {
              return (
                <button
                  key={index}
                  className={`flex flex-row items-center rounded-[12px] w-full p-3 ${
                    activeMenu === val.name
                      ? "bg-custom-green-2 text-white font-semibold shadow-lg"
                      : "text-white"
                  }`}
                  onClick={val.handler}
                >
                  <div className="mr-5">{val.icon}</div>
                  <div>{val.name}</div>
                </button>
              );
            })}
          </ul>
        </div>
      </div>
      <button
        className={
          "p-2 rounded-[12px] flex items-center w-full bg-transparent text-white font-bold border border-custom-white-1"
        }
        onClick={handleLogout}
      >
        <div className="mr-5">
          <BiLogOut />
        </div>
        Logout
      </button>
    </div>
  );
}

Sidebar.propTypes = {
  activeMenu: PropTypes.string,
  handleMenuClick: PropTypes.func,
};
