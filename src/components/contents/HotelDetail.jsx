import PropTypes from "prop-types";
import Table from "../organism/Table";
import { GoDownload } from "react-icons/go";
import { PiHandCoinsLight } from "react-icons/pi";
import ActionButton from "../atoms/ActionButton";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
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

// const totalHarga = tableData.reduce(
//   (sum, item) => sum + item["Total Tagihan"],
//   0
// );

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

  useEffect(() => {
    const isPaid = Math.random() > 0.5;
    setSisa(isPaid ? 0 : 50000000 - totalHarga);
  }, []);

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
          <ActionButton onClick={() => alert("Paying...")}>
            <PiHandCoinsLight className="mr-[6px]" size={16} />
            <p className="text-slate-900 font-semibold text-xs">
              Bayar Tagihan
            </p>
          </ActionButton>
          <ActionButton onClick={() => alert("Exporting...")}>
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
      <Table headers={tableHeaders} data={tableDataHotel} total={totalHarga} />
    </div>
  );
}

HotelDetail.propTypes = {
  onBack: PropTypes.func.isRequired,
  hotel: PropTypes.object,
};
