import SearchBar from "../atoms/SearchBar";
import ActionButton from "../atoms/ActionButton";
import { GrAddCircle } from "react-icons/gr";
import Table from "../organism/Table";
import { useState } from "react";
import InputProduct from "../molecules/InputProduct";
import PropTypes from "prop-types";

const tableHeaders = [
  "Tanggal",
  "Nama Hotel",
  "Total Tagihan",
];

const tableData = [
  {
    Tanggal: "12/07/2022",
    "Nama Hotel": "Hotel Indonesia",
    "Total Tagihan": 5000000,
  },
  {
    Tanggal: "09/12/2024",
    "Nama Hotel": "Hotel Bali",
    "Total Tagihan": 0,
  },
  {
    Tanggal: "10/01/2025",
    "Nama Hotel": "Hotel Lombok",
    "Total Tagihan": 7500000,
  },
  {
    Tanggal: "28/03/2021",
    "Nama Hotel": "Hotel Surabaya",
    "Total Tagihan": 2500000,
  },
  {
    Tanggal: "29/04/2022",
    "Nama Hotel": "Hotel Bandung",
    "Total Tagihan": 0,
  },
];

export default function Bills({ handleBillSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleRowClick = (billId) => {
    handleBillSelect(billId);
  };

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
            onSearch={(e) => console.log(e.target.value)}
            placeholder="Cari dari total 255 data..."
          />
        </div>
        <ActionButton onClick={openModal}>
          <GrAddCircle className="mr-[6px]" size={16} />
          <p className="text-slate-900 font-semibold text-xs">Tambah produk</p>
        </ActionButton>
      </div>
      <Table
        headers={tableHeaders}
        data={tableData}
        onRowClick={handleRowClick}
      />
      <InputProduct isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
}

Bills.propTypes = {
  handleBillSelect: PropTypes.func.isRequired,
};
