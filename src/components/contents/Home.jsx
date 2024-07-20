/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { FaMoneyBills } from "react-icons/fa6";
import { MdProductionQuantityLimits } from "react-icons/md";

export default function Home() {
  return (
    <div>
      <div className="p-10 pb-20 w-full bg-gradient-to-r from-blue-500 to-blue-800 ">
        <h1 className="text-white font-bold text-xl">Website Admin</h1>
        <p className="text-white pt-3 text-[12px] ">Selamat datang, </p>
      </div>
      <div className="flex gap-5 justify-center px-5 mt-[-50px]">
        <div className="card bg-base-100 shadow-xl w-full h-70">
          {/* <figure className="">
            <img
              className="w-52 pt-5"
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure> */}
          <div className="card-body text-center flex justify-center leading-9">
            <h1 className="card-title justify-center font-bold text-[36px] ">
              UD Timur
            </h1>
            <p className="grow-0">deskripsi</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl w-full h-48">
          <div className="card-body flex gap-5 flex-row justify-center">
            <button className="p-7 px-9 bg-slate-100 rounded-2xl text-gray-500 font-bold w-full flex gap-3 items-center">
              <span>
                <MdProductionQuantityLimits size={50} />
              </span>
              <div className="flex flex-col items-start">
                <span>Product</span>
                <span>4</span>
              </div>
            </button>
            <button className="p-7 px-9 bg-slate-100 rounded-2xl text-gray-500 font-bold w-full flex gap-3 items-center">
              <span>
                <FaMoneyBills size={50} />
              </span>
              <div className="flex flex-col items-start">
                <span>Bill</span>
                <span>4</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
