/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from "react";
import { BiHomeAlt, BiGridAlt, BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { PiStudentFill, PiChalkboardTeacherDuotone } from "react-icons/pi";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

export default function Sidebar({ activeMenu, handleMenuClick }) {
  const navigate = useNavigate();
  const menu = [
    {
      name: "Product",
      icon: <PiStudentFill />,
      handler: () => handleMenuClick("Product"),
    },
    {
      name: "Bills",
      icon: <PiChalkboardTeacherDuotone />,
      handler: () => handleMenuClick("Bills"),
    },
    {
      name: "Hotel",
      icon: <HiOutlineClipboardDocumentList />,
      handler: () => handleMenuClick("Hotel"),
    },
  ];

  const handleLogout = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className=" w-64 px-5">
      <div className=" mt-5">
        <div className="my-7 flex flex-col">
          <span>
            <h1 className="font-bold text-[2rem] text-white">UD Timur</h1>
          </span>
        </div>
        <div>
          <button
            className={`mb-4 p-3 rounded-[12px] flex items-center w-full ${
              activeMenu === "Dashboard"
                ? "bg-blue-700 text-white font-bold shadow-lg"
                : "text-gray-400"
            }`}
            onClick={() => handleMenuClick("Dashboard")}
          >
            <div className="mr-5">
              <BiHomeAlt />
            </div>
            Dashboard
          </button>
          <ul className="space-y-5">
            <div className="font-bold text-gray-400 px-3">Main Utama</div>
            {menu.map((val, index) => {
              return (
                <button
                  key={index}
                  className={`flex flex-row items-center rounded-[12px] w-full p-3 ${
                    activeMenu === val.name
                      ? "bg-blue-700 text-white font-bold shadow-lg"
                      : "text-gray-400"
                  }`}
                  onClick={val.handler}
                >
                  <div className="mr-5">{val.icon}</div>
                  <div>{val.name}</div>
                </button>
              );
            })}
          </ul>
          <button
            className={
              "mt-4 p-3 rounded-[12px] flex items-center w-full bg-blue-700 text-white font-bold shadow-lg"
            }
            onClick={handleLogout}
          >
            <div className="mr-5">
              <BiLogOut />
            </div>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
