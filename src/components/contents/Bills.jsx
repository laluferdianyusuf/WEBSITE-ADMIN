import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../atoms/SearchBar";
import ActionButton from "../atoms/ActionButton";
import { GrAddCircle } from "react-icons/gr";
import Table from "../organism/Table";
import InputProduct from "../molecules/InputProduct";
import PropTypes from "prop-types";
import Pagination from "../molecules/Pagination";
import NoBillData from "/icons/belum-ada-nota.svg";
import { listBills } from "../../redux/slices/billSlice";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

const tableHeaders = [
  "Tanggal",
  "Nama Hotel",
  "Total Tagihan",
  "Status Tagihan",
];

export default function Bills({ handleBillSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { bills, loading, error } = useSelector((state) => state.bill);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [filter, setFilter] = useState("all");
  const [dropdown, setDropdown] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    dispatch(listBills());
  }, [dispatch]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleRowClick = (billId) => {
    handleBillSelect(billId);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const billsArray = Array.isArray(bills.bills) ? bills.bills : [];

  const filteredBills = billsArray
    .filter((bill) => {
      const matchesSearchQuery =
        (bill.hotelName &&
          bill.hotelName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (bill.date && bill.date.includes(searchQuery));

      const matchesFilter =
        filter === "all" ||
        (filter === "lunas" && bill.total === bill.paid) ||
        (filter === "belum_lunas" && bill.total !== bill.paid);

      return matchesSearchQuery && matchesFilter;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const dataFiltered = filteredBills.map((bill) => ({
    Tanggal: bill.date,
    "Nama Hotel": bill.hotelName,
    "Total Tagihan": bill.total,
    "Status Tagihan": bill.total === bill.paid ? "Lunas" : "Belum Lunas",
    id: bill.billId,
    orders: bill.orders.map((order) => ({
      name: order.productName,
      price: order.productPrice,
      quantity: order.quantity,
    })),
  }));

  const getLastUpdateTime = (data) => {
    if (!data || data.length === 0) return null;

    const sortedData = [...data].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );

    return sortedData[0].updatedAt;
  };

  const lastUpdated = getLastUpdateTime(billsArray);
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

  const currentBills = dataFiltered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (e) => {
    setFilter(e);
    setDropdown(false);
  };

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, dataFiltered.length);

  const handleSortBills = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="overflow-auto px-9 py-6 h-[93vh] bg-custom-white-1 mt-5 mr-5 ml-5 rounded-lg flex flex-col gap-6 relative">
      <div>
        <h3 className="font-semibold text-xl mb-1">Manajemen Nota</h3>
        <p className="text-xs text-slate-500">
          Terakhir di Update {timeSinceUpdate}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="w-[40%] lg:w-1/3">
          <SearchBar
            onSearch={handleSearch}
            placeholder={`Cari dari total ${dataFiltered.length} data...`}
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
          <ActionButton onClick={openModal}>
            <GrAddCircle className="mr-[6px]" size={16} />
            <p className="text-slate-900 font-semibold text-xs">Tambah Nota</p>
          </ActionButton>
        </div>
      </div>
      {currentBills.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <img src={NoBillData} alt="Tidak ada hotel" width={250} />
          <p className="text-gray-500 mt-2">Belum ada data nota</p>
        </div>
      ) : (
        <Table
          headers={tableHeaders}
          data={currentBills}
          onRowClick={handleRowClick}
          onSort={handleSortBills}
          sortOrder={sortOrder}
          sortColumns={"Tanggal"}
        />
      )}
      <p className="text-xs text-end lg:absolute lg:bottom-[3rem] lg:right-[2.3rem]">
        Menampilkan {startIndex} - {endIndex} dari total {filteredBills.length}{" "}
        data
      </p>

      <Pagination
        totalItems={filteredBills.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <InputProduct isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
}

Bills.propTypes = {
  handleBillSelect: PropTypes.func.isRequired,
};
