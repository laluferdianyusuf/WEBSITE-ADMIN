import Button from "../components/atoms/Button";
import ActionButton from "../components/atoms/ActionButton";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { GrAddCircle } from "react-icons/gr";
import { GiReceiveMoney } from "react-icons/gi";
import LoginForm from "../components/organism/LoginForm";
import Table from "../components/organism/Table";
import TableWithActions from "../components/organism/TableWithActions";
import SearchBar from "../components/atoms/SearchBar";

const tableHeaders = ["No", "Nama Hotel", "Total Tagihan", "Status Tagihan"];

const tableData = [
  {
    No: "1",
    "Nama Hotel": "Hotel Indonesia",
    "Total Tagihan": 5000000,
    "Status Tagihan": "Belum Lunas",
  },
  {
    No: "2",
    "Nama Hotel": "Hotel Bali",
    "Total Tagihan": 0,
    "Status Tagihan": "Lunas",
  },
  {
    No: "3",
    "Nama Hotel": "Hotel Lombok",
    "Total Tagihan": 7500000,
    "Status Tagihan": "Belum Lunas",
  },
  {
    No: "4",
    "Nama Hotel": "Hotel Surabaya",
    "Total Tagihan": 2500000,
    "Status Tagihan": "Belum Lunas",
  },
  {
    No: "5",
    "Nama Hotel": "Hotel Bandung",
    "Total Tagihan": 0,
    "Status Tagihan": "Lunas",
  },
];

const tableHeaders2 = [
  "No",
  "Item",
  "Quantity",
  "Harga / Unit",
  "Jumlah Harga",
];

const tableData2 = [
  {
    No: "1",
    Item: "Hand Towel",
    Quantity: 2,
    "Harga / Unit": 1000000,
    "Jumlah Harga": 2000000,
  },
  {
    No: "2",
    Item: "Hand Sanitizer",
    Quantity: 2,
    "Harga / Unit": 500000,
    "Jumlah Harga": 1000000,
  },
  {
    No: "3",
    Item: "Fruit Tea",
    Quantity: 3,
    "Harga / Unit": 10000,
    "Jumlah Harga": 30000,
  },
];

const tableHeaders3 = ["No", "Nama Hotel/Produk", "Actions"];

const tableDataActions = [
  ["1", "Hotel Indonesia"],
  ["2", "Hotel Bali"],
  ["3", "Hotel Lombok"],
  ["4", "Hotel Surabaya"],
  ["5", "Hotel Bandung"],
];

const handleUpdate = (row) => {
  alert(`Update clicked for: ${row[1]}`);
};

const handleDelete = (row) => {
  alert(`Delete clicked for: ${row[1]}`);
};

const handleSearch = (query) => {
  console.log("Search query:", query);
};

export default function Slicing() {
  return (
    <div className="p-16 flex flex-col gap-10">
      <SearchBar onSearch={handleSearch} />
      <div className="w-1/2 grid grid-cols-2">
        <Button text="Kembali" />
        <Button text="Logout" backgroundColor="bg-custom-green-1" />
      </div>
      <div className="w-1/2 grid grid-cols-2 gap-y-10">
        <ActionButton onClick={() => alert("Update button clicked")}>
          <FiEdit2 className="mr-[6px]" size={16} />
          <p className="text-slate-900 font-semibold text-xs">Update</p>
        </ActionButton>
        <ActionButton onClick={() => alert("Delete button clicked")}>
          <RiDeleteBin6Line className="mr-[6px]" size={16} />
          <p className="text-slate-900 font-semibold text-xs">Delete</p>
        </ActionButton>
        <ActionButton onClick={() => alert("Add button clicked")}>
          <GrAddCircle className="mr-[6px]" size={16} />
          <p className="text-slate-900 font-semibold text-xs">Tambah produk</p>
        </ActionButton>
        <ActionButton onClick={() => alert("Pay button clicked")}>
          <GiReceiveMoney className="mr-[6px]" size={16} />
          <p className="text-slate-900 font-semibold text-xs">Bayar tagihan</p>
        </ActionButton>
      </div>
      <div className="w-1/2">
        <LoginForm />
      </div>
      <TableWithActions
        headers={tableHeaders3}
        data={tableDataActions}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      <Table headers={tableHeaders} data={tableData} />
      <Table headers={tableHeaders2} data={tableData2} />
    </div>
  );
}
