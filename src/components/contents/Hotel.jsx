/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { IoHomeOutline, IoDocumentOutline } from "react-icons/io5";
import { HiOutlineDocumentAdd } from "react-icons/hi";

export default function Hotel() {
  return (
    <div className="overflow-auto px-10 py-7 h-[93vh] bg-white mt-5 mr-5 ml-5 rounded-lg">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <a>
              <IoHomeOutline />
              Home
            </a>
          </li>
          <li>
            <a>
              <IoDocumentOutline />
              Documents
            </a>
          </li>
          <li>
            <span className="inline-flex items-center gap-2">
              <HiOutlineDocumentAdd />
              Add Document
            </span>
          </li>
        </ul>
      </div>
      <h1 className="font-bold text-[36px]">Hotel</h1>

      {/* table */}
      <div>
        <div className="overflow-x-auto p-7 shadow-lg rounded-md bg-white">
          <div className="pb-3 flex justify-between">
            <Link
              to="/student"
              className="bg-blue-500 p-2 rounded-lg font-bold text-white"
            >
              Tambah
            </Link>
            <label className="input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="Search" />
              <MdSearch />
            </label>
          </div>
          <table className="table =">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>No. HP Orang Tua</th>
                <th>Kelas</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th className="">1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
                <td className="flex gap-3 justify-center">
                  <button className="bg-green-600 p-2 rounded-lg font-bold text-white">
                    Edit
                  </button>
                  <button className="bg-red-500 p-2 rounded-lg font-bold text-white">
                    Delete
                  </button>
                  <button className="bg-blue-300 p-2 rounded-lg font-bold text-white">
                    More
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
