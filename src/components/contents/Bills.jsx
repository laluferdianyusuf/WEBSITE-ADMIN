import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../atoms/SearchBar";
import ActionButton from "../atoms/ActionButton";
import { GrAddCircle } from "react-icons/gr";
import Table from "../organism/Table";
import InputProduct from "../molecules/InputProduct";
import PropTypes from "prop-types";
import { listBills } from "../../redux/slices/billSlice";

const tableHeaders = ["Tanggal", "Nama Hotel", "Total Tagihan"];

export default function Bills({ handleBillSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { bills, loading, error } = useSelector((state) => state.bill);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredBills = billsArray.filter(
    (bill) =>
      (bill.hotelName &&
        bill.hotelName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (bill.date && bill.date.includes(searchQuery))
  );

  const dataFiltered = filteredBills.map((bill) => ({
    Tanggal: bill.date,
    "Nama Hotel": bill.hotelName,
    "Total Tagihan": bill.total,
    id: bill.billId,
    orders: bill.orders.map((order) => ({
      name: order.productName,
      price: order.productPrice,
      quantity: order.quantity,
    })),
  }));

  return (
    <div className="overflow-auto px-9 py-6 h-[93vh] bg-custom-white-1 mt-5 mr-5 ml-5 rounded-lg flex flex-col gap-6">
      <div>
        <h3 className="font-semibold text-xl mb-1">Manajemen Nota</h3>
        <p className="text-xs text-slate-500">
          Terakhir di Update 1 Jam 24 Menit yang lalu
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="w-1/3">
          <SearchBar
            onSearch={handleSearch}
            placeholder={`Cari dari total ${billsArray.length} data...`}
          />
        </div>
        <ActionButton onClick={openModal}>
          <GrAddCircle className="mr-[6px]" size={16} />
          <p className="text-slate-900 font-semibold text-xs">Tambah produk</p>
        </ActionButton>
      </div>

      <Table
        headers={tableHeaders}
        data={dataFiltered}
        onRowClick={handleRowClick}
      />

      <InputProduct isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
}

Bills.propTypes = {
  handleBillSelect: PropTypes.func.isRequired,
};
