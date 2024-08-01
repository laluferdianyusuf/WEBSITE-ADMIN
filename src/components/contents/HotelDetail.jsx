import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { GoDownload } from "react-icons/go";
import { PiHandCoinsLight } from "react-icons/pi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import Table from "../organism/Table";
import ActionButton from "../atoms/ActionButton";
import SuccessNotification from "../atoms/SuccessNotification";
import InputNotaField from "../molecules/InputNotaField";
import Button from "../atoms/Button";

import { useEffect, useState } from "react";
import { getDetailHotels } from "../../redux/slices/hotelSlice";
import { useSelector, useDispatch } from "react-redux";


const tableHeaders = ["Tanggal", "Total Tagihan"];

const tableData = [
  {
    Tanggal: "12/07/2022",
    "Total Tagihan": 5000000,
  },
  {
    Tanggal: "09/12/2024",
    "Total Tagihan": 100000,
  },
  {
    Tanggal: "10/01/2025",
    "Total Tagihan": 7500000,
  },
  {
    Tanggal: "28/03/2021",
    "Total Tagihan": 2500000,
  },
];

const tableData2 = {
  id: 1,
  nama_hotel: "Hotel A",
  total_bill: 8000000,
  total_bayar: 4000000,
  bills: [
    {
      id: 1,
      tanggal_nota: "2024-07-01",
      total_pesanan: 2000000,
      total_dibayar: 2000000,
      orders: [
        {
          qty: 2,
          nama_produk: "Hand Towel",
          harga_produk: 500000,
          total_harga: 1000000,
        },
        {
          qty: 1,
          nama_produk: "Hand Sanitizer",
          harga_produk: 1000000,
          total_harga: 1000000,
        },
      ],
    },
    {
      id: 2,
      tanggal_nota: "2024-07-05",
      total_pesanan: 2000000,
      total_dibayar: 1000000,
      orders: [
        {
          qty: 10,
          nama_produk: "Fruit Tea",
          harga_produk: 100000,
          total_harga: 1000000,
        },
        {
          qty: 2,
          nama_produk: "Hand Towel",
          harga_produk: 500000,
          total_harga: 1000000,
        },
      ],
    },
    {
      id: 3,
      tanggal_nota: "2024-07-10",
      total_pesanan: 1000000,
      total_dibayar: 0,
      orders: [
        {
          qty: 20,
          nama_produk: "Fruit Juice",
          harga_produk: 50000,
          total_harga: 1000000,
        },
      ],
    },
    {
      id: 4,
      tanggal_nota: "2024-07-15",
      total_pesanan: 3000000,
      total_dibayar: 1000000,
      orders: [
        {
          qty: 5,
          nama_produk: "Bath Towel",
          harga_produk: 400000,
          total_harga: 2000000,
        },
        {
          qty: 2,
          nama_produk: "Shampoo",
          harga_produk: 500000,
          total_harga: 1000000,
        },
      ],
    },
  ],
};

const totalHarga = tableData.reduce(
  (sum, item) => sum + item["Total Tagihan"],
  0
);


export default function HotelDetail({ onBack, hotel }) {
  const dispatch = useDispatch();
  const { bills, loading, error } = useSelector((state) => state.bill);
  const [dataHotel, setDataHotel] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(getDetailHotels(hotel.id));
        setDataHotel(result.payload.data.hotel);
      } catch (err) {
        console.error("Failed to fetch bill details:", err);
      }
    };

    fetchData();
  }, [dispatch, hotel]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading bill details.</p>;
  const hotelsBill = dataHotel?.bills || [];
  const [sisa, setSisa] = useState(0);
  const [isPaying, setIsPaying] = useState(false);
  const [totalBayar, setTotalBayar] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const isPaid = Math.random() > 0.5;
    setSisa(isPaid ? 0 : 50000000 - totalHarga);
  }, []);


  const handlePaying = () => {
    setIsPaying(true);
  };

  const handleClosePay = () => {
    setIsPaying(false);
    setTotalBayar("");
  };

  const handleConfirmPay = () => {
    const value = parseInt(totalBayar.replace(/\./g, ""));
    setSisa((prevValue) => prevValue - value);
    setIsPaying(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const onChangeInput = (event) => {
    setTotalBayar(event.target.value);
  };

  const handleExportClick = () => {
    const state = {
      tableData2,
    };
    const stateString = encodeURIComponent(JSON.stringify(state));
    window.open(
      `/#/invoiceexport?state=${stateString}`,
      "_blank",
      `noopener,noreferrer`
    );
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const tableDataHotel = hotelsBill.map((hotel) => ({
    Tanggal: formatDate(hotel.createdAt),
    "Total Tagihan": hotel.ordersTotal,
  }));

  const totalHarga = hotelsBill.reduce(
    (sum, item) => sum + parseFloat(item.ordersTotal),
    0
  );


  return (
    <div className="overflow-auto px-9 py-6 h-[93vh] bg-custom-white-1 mt-5 mr-5 ml-5 rounded-lg flex flex-col">
      <div className="mb-6">
        <h3 className="font-semibold text-xl mb-1">{hotel["Nama Hotel"]}</h3>
        <div className="breadcrumbs text-sm">
          <ul className="flex gap-2">
            <li>
              <button
                className="text-blue-500 hover:underline"
                onClick={onBack}
              >
                Manajemen Hotel
              </button>
            </li>
            <li>
              <span className="text-gray-700">{hotel["Nama Hotel"]}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between mb-5">
        <div
          className={`w-fit px-2 py-2 rounded-lg text-white ${
            sisa === 0 ? "bg-custom-green-1" : "bg-red-500"
          }`}
        >
          {sisa === 0 ? (
            <div className="flex items-center justify-center">
              <IoIosCheckmarkCircleOutline className="mr-[6px]" size={16} />
              <p className="text-xs">Sudah Lunas</p>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <IoCloseCircleOutline className="mr-[6px]" size={16} />
              <p className="text-xs">Belum Lunas</p>
            </div>
          )}
        </div>
        <div className="flex gap-[18px]">
          <ActionButton onClick={handlePaying}>
            <PiHandCoinsLight className="mr-[6px]" size={16} />
            <p className="text-slate-900 font-semibold text-xs">
              Bayar Tagihan
            </p>
          </ActionButton>
          <ActionButton onClick={handleExportClick}>
            <GoDownload className="mr-[6px]" size={16} />
            <p className="text-slate-900 font-semibold text-xs">
              Export Invoice
            </p>
          </ActionButton>
        </div>
      </div>
      <div className="grid grid-cols-3 w-1/2 text-xs text-slate-900 mb-5">
        <p>Total Tagihan</p>
        <p>:</p>
        <p>
          {totalHarga.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </p>
        <p>Sisa</p>
        <p>:</p>
        <p>
          {sisa.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
        </p>
      </div>

      {isPaying && (
        <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-custom-white-1 rounded-lg flex flex-col gap-5 py-6 px-14 relative w-[40%] max-h-[90vh] overflow-y-auto">
            <div className="font-semibold text-center">
              <h4 className="text-slate-300 text-[10px] mb-1">
                UD TIMUR JAYA RAYA
              </h4>
              <h3 className="text-slate-900 text-lg">
                Bayar Tagihan {hotel["Nama Hotel"]}
              </h3>
            </div>
            <InputNotaField
              label="Jumlah Setoran"
              name="jumlahSetoran"
              type="number"
              placeholder="Rp. 1.000.000"
              value={totalBayar}
              onChange={onChangeInput}
              isModal={true}
            />
            <div className="flex justify-center mt-4 gap-4">
              <Button
                backgroundColor="bg-white"
                text="Batalkan"
                onClick={handleClosePay}
              />
              <Button
                backgroundColor="bg-custom-green-1"
                text="Bayar Tagihan"
                onClick={handleConfirmPay}
              />
            </div>
          </div>
        </div>
      )}
      {showSuccess && <SuccessNotification text="Pembayaran Berhasil" />}

      <Table headers={tableHeaders} data={tableDataHotel} total={totalHarga} />

    </div>
  );
}

HotelDetail.propTypes = {
  onBack: PropTypes.func.isRequired,
  hotel: PropTypes.object,
};
