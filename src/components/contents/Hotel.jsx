import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../atoms/SearchBar";
import ActionButton from "../atoms/ActionButton";
import { GrAddCircle } from "react-icons/gr";
import TableWithActions from "../organism/TableWithActions";
import ModalCrud from "../molecules/ModalCrud";
import Pagination from "../molecules/Pagination";
import { listBills } from "../../redux/slices/billSlice";
import NoHotelData from "/icons/belum-ada-hotel.svg";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotels,
} from "../../redux/slices/hotelSlice";
import WarningNotification from "../atoms/WarningNotification";
import SuccessNotification from "../atoms/SuccessNotification";
import { AiOutlineCaretDown } from "react-icons/ai";
import { GoDownload } from "react-icons/go";

const tableHeaders3 = [
  "ID",
  "Nama Customer",
  "Alamat",
  "Total Tagihan",
  "Total Terbayarkan",
  "Sisa Tagihan",
  "Status",
  "Actions",
];

export default function Hotel({ handleHotelSelect }) {
  const dispatch = useDispatch();
  const { hotels, loading } = useSelector((state) => state.hotel);
  const [inputHotel, setInputHotel] = useState("");
  const [currentHotelIndex, setCurrentHotelIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [filter, setFilter] = useState("all");
  const [alamat, setAlamat] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("hotels : ", hotels);
  }, [hotels]);

  useEffect(() => {
    dispatch(getHotels()).unwrap();
  }, [dispatch]);

  const handleAdd = () => {
    setIsAdding(true);
    setInputHotel("");
  };

  const handleChangeHotel = (e) => {
    setInputHotel(e.target.value);
  };

  const handleAlamatChange = (e) => {
    setAlamat(e.target.value);
  };

  const handleCloseAdd = () => setIsAdding(false);
  const handleCloseEdit = () => setIsEditing(false);
  const handleCloseDelete = () => setIsDeleting(false);

  const handleEdit = (index) => {
    setCurrentHotelIndex(index);
    setInputHotel(index["Nama Customer"]);
    setIsEditing(true);
  };

  const handleDelete = (index) => {
    setCurrentHotelIndex(index);
    setInputHotel(index["Nama Customer"]);
    setIsDeleting(true);
  };

  const handleSaveDelete = async () => {
    setIsLoading(true);
    setSuccess("");
    setError("");
    try {
      const hotelId = currentHotelIndex.id;
      await dispatch(deleteHotel(hotelId))
        .unwrap()
        .then(() => {
          setSuccess("Berhasil menghapus hotel");
          dispatch(getHotels());
          handleCloseDelete();
        })
        .catch((error) => {
          setError("Gagal menghapus hotel");
        });
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    setIsLoading(true);
    setSuccess("");
    setError("");
    try {
      const hotelId = currentHotelIndex.id;
      await dispatch(
        updateHotel({ hotelName: inputHotel, address: alamat, id: hotelId })
      )
        .unwrap()
        .then(() => {
          setSuccess("Berhasil update hotel");
          dispatch(getHotels());
          handleCloseEdit();
        })
        .catch((error) => {
          setError("Gagal update hotel");
        });
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAdd = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      await dispatch(createHotel({ hotelName: inputHotel, address: alamat }))
        .unwrap()
        .then(() => {
          setSuccess("Berhasil menambah hotel");
          dispatch(listBills());
          dispatch(getHotels());
          handleCloseAdd();
        })
        .catch((error) => {
          setError("Hotel sudah ada");
        });
    } catch (err) {
      console.error("Add failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRowClick = (hotelId) => {
    handleHotelSelect(hotelId);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const hotelsArray = Array.isArray(hotels.hotel) ? hotels.hotel : [];

  const filteredHotels = hotelsArray.filter((hotel) => {
    const matchSearchQuery = hotel.hotelName
      ? hotel.hotelName.toLowerCase().includes(searchQuery.toLowerCase())
      : false;

    const matchesFilter =
      filter === "all" ||
      (filter === "lunas" && hotel.totalBills === hotel.totalPaid) ||
      (filter === "belum_lunas" && hotel.totalBills !== hotel.totalPaid);

    return matchSearchQuery && matchesFilter;
  });

  const dataFilteredHotel = filteredHotels.map((hotel, index) => ({
    id: hotel.id,
    "Nama Customer": hotel.hotelName,
    Alamat: hotel.address || "-",
    "Total Tagihan": hotel.totalBills,
    "Total Terbayarkan": hotel.totalPaid,
    "Sisa Tagihan": hotel.totalBills - hotel.totalPaid,
    Status: hotel.totalBills === hotel.totalPaid ? "Lunas" : "Belum Lunas",
  }));

  const totalBills = hotelsArray.reduce((total, hotel) => {
    return total + hotel.totalBills;
  }, 0);

  const totalPaid = hotelsArray.reduce((total, hotel) => {
    return total + hotel.totalPaid;
  }, 0);

  const totalNotPaidYet = hotelsArray.reduce((total, hotel) => {
    return total + (hotel.totalBills - hotel.totalPaid);
  }, 0);

  const getLastUpdateTime = (data) => {
    if (!data || data.length === 0) return null;

    const sortedData = [...data].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );

    return sortedData[0].updatedAt;
  };

  const lastUpdated = getLastUpdateTime(hotelsArray);
  const now = new Date();
  const timeDifference = lastUpdated
    ? Math.floor((now - new Date(lastUpdated)) / 1000)
    : null;

  let timeSinceUpdate = "Tidak ada data";
  if (timeDifference !== null) {
    const days = Math.floor(timeDifference / 86400);
    const hours = Math.floor((timeDifference % 86400) / 3600);
    const minutes = Math.floor((timeDifference % 3600) / 60);
    const seconds = timeDifference % 60;

    if (days > 0) {
      timeSinceUpdate = `${days} hari, ${hours} jam yang lalu`;
    } else if (hours > 0) {
      timeSinceUpdate = `${hours} jam, ${minutes} menit yang lalu`;
    } else if (minutes > 0) {
      timeSinceUpdate = `${minutes} menit yang lalu`;
    } else {
      timeSinceUpdate = `${seconds} detik yang lalu`;
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentHotel = dataFilteredHotel.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(
    currentPage * itemsPerPage,
    dataFilteredHotel.length
  );

  const handleFilterChange = (e) => {
    setFilter(e);
    setDropdown(false);
  };

  const dataExportHotel =
    Array.isArray(dataFilteredHotel) &&
    dataFilteredHotel.map((hotel) => ({
      "Nama Customer": hotel["Nama Customer"],
      Alamat: hotel.Alamat,
      "Total Tagihan": hotel["Total Tagihan"],
      "Total Terbayarkan": hotel["Total Terbayarkan"],
      "Sisa Tagihan": hotel["Sisa Tagihan"],
      Status: hotel.Status,
    }));

  let totalSemuaTagihan = 0;
  let totalSemuaTerbayarkan = 0;
  let totalSisaTagihan = 0;

  dataExportHotel.forEach((customer) => {
    totalSemuaTagihan += customer["Total Tagihan"];
    totalSemuaTerbayarkan += customer["Total Terbayarkan"];
    totalSisaTagihan += customer["Sisa Tagihan"];
  });

  const handleExportClick = () => {
    const state = {
      customers: dataExportHotel,
      totalSemuaTagihan,
      totalSemuaTerbayarkan,
      totalSisaTagihan,
    };
    const stateString = encodeURIComponent(JSON.stringify(state));
    window.open(
      `/#/customerexport?state=${stateString}`,
      "_blank",
      `noopener,noreferrer`
    );
    console.log(stateString);
  };

  return (
    <div className="overflow-auto px-9 py-6 h-[93vh] bg-custom-white-1 mt-5 mr-5 ml-5 rounded-lg flex flex-col gap-5 relative">
      <div>
        <h3 className="font-semibold text-xl mb-1">Manajemen Customer</h3>
        <p className="text-xs text-slate-500">
          Terakhir di Update {timeSinceUpdate}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="w-1/3">
          <SearchBar
            onSearch={handleSearch}
            placeholder={`Cari dari total ${hotelsArray.length} data...`}
          />
        </div>
        <div className="flex items-center gap-[18px]">
          <div className="relative flex flex-col items-center w-[130px] rounded-lg">
            <button
              onClick={() => setDropdown((prev) => !prev)}
              onChange={handleFilterChange}
              className={`bg-white px-4 py-2 w-full items-center flex justify-center text-xs border-slate-700 border rounded-lg ${
                filter === "all"
                  ? "text-slate-900 border  border-slate-900"
                  : ""
              } ${
                filter === "lunas"
                  ? "text-green-500 border border-green-500"
                  : ""
              } ${
                filter === "belum_lunas" ? "text-red-500 border-red-500" : ""
              } tracking-wider duration-300 font-bold justify-between items-center`}
            >
              {filter === "all"
                ? "Semua"
                : filter === "lunas"
                ? "Lunas"
                : "Belum Lunas"}
              <AiOutlineCaretDown
                size={12}
                className={`absolute right-2 top-[10px] transform transition-transform duration-300 ${
                  dropdown ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {dropdown && (
              <div className="absolute flex flex-col top-10 items-center w-full p-2 border rounded-lg backdrop-blur-sm bg-black/15 z-50">
                <span
                  onClick={() => handleFilterChange("all")}
                  className={`cursor-pointer bg-white px-4 py-2 rounded-lg shadow-md w-full text-center text-xs font-bold mb-1`}
                >
                  Semua
                </span>
                <span
                  onClick={() => handleFilterChange("lunas")}
                  className={`cursor-pointer bg-white px-4 py-2 rounded-lg shadow-md w-full text-center text-xs font-bold text-green-500 mb-1`}
                >
                  Lunas
                </span>
                <span
                  onClick={() => handleFilterChange("belum_lunas")}
                  className={`cursor-pointer bg-white px-4 py-2 rounded-lg shadow-md w-full text-center text-xs font-bold text-red-500`}
                >
                  Belum lunas
                </span>
              </div>
            )}
          </div>
          <ActionButton onClick={handleAdd}>
            <GrAddCircle className="mr-[6px]" size={16} />
            <p className="text-slate-900 font-semibold text-xs">
              Tambah Customer
            </p>
          </ActionButton>
          <ActionButton onClick={handleExportClick}>
            <GoDownload className="mr-[6px]" size={16} />
            <p className="text-slate-900 font-semibold text-xs">
              Export Customer
            </p>
          </ActionButton>
        </div>
      </div>

      <div className="grid w-[100%] lg:w-[60%] gap-y-2 grid-cols-2 text-slate-900 text-xs">
        <p>Total Seluruh Tagihan</p>
        <p>: {totalBills.toLocaleString("id-ID")}</p>
        <p>Total Tagihan Lunas Semua Customer</p>
        <p>: {totalPaid.toLocaleString("id-ID")}</p>
        <p>Sisa Tagihan Belum Lunas Semua Customer</p>
        <p>: {totalNotPaidYet.toLocaleString("id-ID")}</p>
      </div>

      {currentHotel.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <img src={NoHotelData} alt="Tidak ada hotel" width={250} />
          <p className="text-gray-500 mt-4">Belum ada data Customer</p>
        </div>
      ) : (
        <>
          <TableWithActions
            headers={tableHeaders3}
            data={currentHotel}
            onUpdate={handleEdit}
            onDelete={handleDelete}
            onRowClick={handleRowClick}
          />
        </>
      )}
      <div>
        <p className="text-xs text-end mb-1">
          Menampilkan {startIndex} - {endIndex} dari total{" "}
          {dataFilteredHotel.length} data
        </p>
        <Pagination
          totalItems={dataFilteredHotel.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
      <ModalCrud
        isLoading={isLoading}
        title="Tambah Customer"
        isOpen={isAdding}
        inputLabel="Nama Customer"
        inputPlaceholder="Masukkan nama customer"
        inputName="hotelName"
        inputValue={inputHotel}
        onChange={handleChangeHotel}
        textOk="Tambah"
        textCancel="Kembali"
        inputType="text"
        functionCancel={handleCloseAdd}
        functionOk={handleSaveAdd}
        inputLabel2="Alamat"
        inputName2="hotelAddress"
        inputPlaceholder2="Masukkan alamat"
        inputType2="text"
        inputValue2={alamat}
        isCustomer={true}
        onChange2={handleAlamatChange}
      />
      <ModalCrud
        isLoading={isLoading}
        title="Edit Customer"
        isOpen={isEditing}
        inputLabel="Edit Customer"
        inputPlaceholder="Masukkan nama customer"
        inputName="hotelName"
        inputValue={inputHotel}
        onChange={handleChangeHotel}
        textOk="Simpan"
        textCancel="Batal"
        inputType="text"
        functionCancel={handleCloseEdit}
        functionOk={handleSaveEdit}
        inputLabel2="Alamat"
        inputName2="hotelAddress"
        inputPlaceholder2="Masukkan alamat"
        inputType2="text"
        inputValue2={alamat}
        isCustomer={true}
        onChange2={handleAlamatChange}
      />
      <ModalCrud
        isLoading={isLoading}
        title="Hapus Customer"
        isOpen={isDeleting}
        inputLabel="Hapus Customer"
        isDisabled={true}
        inputName="hotelName"
        inputValue={inputHotel}
        textOk="Hapus"
        textCancel="Batal"
        inputType="text"
        inputLabel2="Alamat"
        inputName2="hotelAddress"
        inputPlaceholder2="Masukkan alamat"
        inputType2="text"
        inputValue2={alamat}
        isCustomer={true}
        onChange2={handleAlamatChange}
        isDisabled2={true}
        functionCancel={handleCloseDelete}
        functionOk={handleSaveDelete}
      />

      {success && <SuccessNotification text={success} duration={3000} />}
      {error && <WarningNotification text={error} duration={3000} />}
    </div>
  );
}
