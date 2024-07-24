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
import ModalCrud from "../components/molecules/ModalCrud";
import { useState } from "react";
import ModalConfirmation from "../components/molecules/ModalConfirmation";
import SuccessNotification from "../components/atoms/SuccessNotification";
import InputProduct from "../components/molecules/InputProduct";

const tableHeaders = [
  "No",
  "Tanggal",
  "Nama Hotel",
  "Total Tagihan",
  "Status Tagihan",
];

const tableData = [
  {
    No: "1",
    Tanggal: "12/07/2022",
    "Nama Hotel": "Hotel Indonesia",
    "Total Tagihan": 5000000,
    "Status Tagihan": "Belum Lunas",
  },
  {
    No: "2",
    Tanggal: "09/12/2024",
    "Nama Hotel": "Hotel Bali",
    "Total Tagihan": 0,
    "Status Tagihan": "Lunas",
  },
  {
    No: "3",
    Tanggal: "10/01/2025",
    "Nama Hotel": "Hotel Lombok",
    "Total Tagihan": 7500000,
    "Status Tagihan": "Belum Lunas",
  },
  {
    No: "4",
    Tanggal: "28/03/2021",
    "Nama Hotel": "Hotel Surabaya",
    "Total Tagihan": 2500000,
    "Status Tagihan": "Belum Lunas",
  },
  {
    No: "5",
    Tanggal: "29/04/2022",
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
    Quantity: "1 Dus",
    "Harga / Unit": 1000000,
    "Jumlah Harga": 2000000,
  },
  {
    No: "2",
    Item: "Hand Sanitizer",
    Quantity: "1 Pack",
    "Harga / Unit": 500000,
    "Jumlah Harga": 1000000,
  },
  {
    No: "3",
    Item: "Fruit Tea",
    Quantity: "3 Box",
    "Harga / Unit": 10000,
    "Jumlah Harga": 30000,
  },
];

const totalTagihan2 = tableData2.reduce(
  (total, row) => total + row["Jumlah Harga"],
  0
);

const tableHeaders3 = ["No", "Nama Hotel/Produk", "Actions"];

const tableDataActions = [
  ["1", "Hotel Indonesia"],
  ["2", "Hotel Bali"],
  ["3", "Hotel Lombok"],
  ["4", "Hotel Surabaya"],
  ["5", "Hotel Bandung"],
];

const tableHeaders4 = ["Tanggal", "Total Tagihan", "Sisa Tagihan", "Status"];

const tableData4 = [
  {
    Tanggal: "12/07/2022",
    "Total Tagihan": 5000000,
    "Sisa Tagihan": 0,
    Status: "Lunas",
  },
  {
    Tanggal: "09/12/2024",
    "Total Tagihan": 100000,
    "Sisa Tagihan": 100000,
    Status: "Belum Lunas",
  },
  {
    Tanggal: "10/01/2025",
    "Total Tagihan": 7500000,
    "Sisa Tagihan": 0,
    Status: "Lunas",
  },
  {
    Tanggal: "28/03/2021",
    "Total Tagihan": 2500000,
    "Sisa Tagihan": 2500000,
    Status: "Belum Lunas",
  },
  {
    Tanggal: "29/04/2022",
    "Total Tagihan": 700000,
    "Sisa Tagihan": 700000,
    Status: "Lunas",
  },
];

const totalTagihan4 = tableData4.reduce(
  (total, row) => total + row["Total Tagihan"],
  0
);

const sisaTagihan4 = tableData4.reduce(
  (total, row) => total + row["Sisa Tagihan"],
  0
);

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
  const [inputProduk, setInputProduk] = useState("Hand Sanitizer");
  const [inputHotel, setInputHotel] = useState("Hotel Aston");
  const handleChangeProduk = (e) => {
    setInputProduk(e.target.value);
  };

  const handleChangeHotel = (e) => {
    setInputHotel(e.target.value);
  };

  return (
    <div className="p-16 flex flex-col gap-10">
      <div className="self-center">
        <SuccessNotification text="Pembayaran Sukses"/>
      </div>
      <div>
        <InputProduct />
      </div>
      <div className="grid grid-cols-2 gap-10">
        <ModalCrud
          title="Tambah Produk"
          inputLabel="Nama Produk"
          inputPlaceholder="Masukkan nama produk"
          inputName="productName"
          inputValue={inputProduk}
          onChange={handleChangeProduk}
          textOk="Tambah"
          textCancel="Kembali"
          inputType="text"
          functionCancel={() => alert("Cancel button clicked")}
          functionOk={() => alert("Ok button clicked")}
        />
        <ModalCrud
          title="Tambah Hotel"
          inputLabel="Nama Hotel"
          inputPlaceholder="Masukkan nama hotel"
          inputName="hotelName"
          inputValue={inputHotel}
          onChange={handleChangeHotel}
          textOk="Tambah"
          textCancel="Kembali"
          inputType="text"
          functionCancel={() => alert("Cancel button clicked")}
          functionOk={() => alert("Ok button clicked")}
        />
      </div>
      <div className="grid grid-cols-2 gap-10">
        <ModalConfirmation
          title="Apakah anda yakin ingin logout?"
          textCancel="Cancel"
          textOk="Logout"
          functionCancel={() => alert("Cancel button clicked")}
          functionOk={() => alert("Ok button clicked")}
        />
        <ModalConfirmation
          title="Periksa Username / Password Anda"
          textOk="Coba Lagi"
          functionOk={() => alert("Ok button clicked")}
        />
      </div>
      <div className="w-1/2">
        <SearchBar onSearch={handleSearch} />
      </div>
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
      <div>
        <h3 className="text-slate-900 font-semibold text-xl mb-4">
          Table CRUD Hotel / Produk
        </h3>
        <TableWithActions
          headers={tableHeaders3}
          data={tableDataActions}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
      <div>
        <h3 className="text-slate-900 font-semibold text-xl mb-4">
          Table List Nota Homepage
        </h3>
        <Table headers={tableHeaders} data={tableData} />
      </div>
      <div>
        <h3 className="text-slate-900 font-semibold text-xl mb-4">
          Table Detail Nota
        </h3>
        <Table
          headers={tableHeaders2}
          data={tableData2}
          total={totalTagihan2}
          sisa={totalTagihan2}
        />
      </div>
      <div>
        <h3 className="text-slate-900 font-semibold text-xl mb-4">
          Table List Nota Pada Detail Hotel
        </h3>
        <Table
          headers={tableHeaders4}
          data={tableData4}
          total={totalTagihan4}
          sisa={sisaTagihan4}
        />
      </div>
    </div>
  );
}
