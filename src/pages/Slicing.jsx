import Button from "../components/atoms/Button";
import ActionButton from "../components/atoms/ActionButton";
import { FaEdit, FaTrash } from "react-icons/fa";
import LoginForm from "../components/organism/LoginForm";
import Table from "../components/organism/Table";

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

export default function Slicing() {
  return (
    <div className="p-16 flex flex-col gap-10">
      <div className="w-1/2 grid grid-cols-2">
        <Button text="Kembali" />
        <Button text="Logout" backgroundColor="bg-custom-green-1" />
      </div>
      <div className="w-1/2 grid grid-cols-2">
        <ActionButton onClick={() => alert("Update button clicked")}>
          <FaEdit className="mr-[6px]" size={16} />
          <p className="text-slate-900 font-semibold text-xs">Update</p>
        </ActionButton>
        <ActionButton onClick={() => alert("Delete button clicked")}>
          <FaTrash className="mr-[6px]" size={16} />
          <p className="text-slate-900 font-semibold text-xs">Delete</p>
        </ActionButton>
      </div>
      <div className="w-1/2">
        <LoginForm />
      </div>
      <Table headers={tableHeaders} data={tableData} />
    </div>
  );
}
