/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import SearchBar from "../atoms/SearchBar";
import ActionButton from "../atoms/ActionButton";
import { GrAddCircle } from "react-icons/gr";
import TableWithActions from "../organism/TableWithActions";
import { useState } from "react";
import ModalCrud from "../molecules/ModalCrud";

const tableHeaders3 = ["No", "Nama Hotel", "Actions"];

const initialTableData = [
  ["1", "Hotel Indonesia"],
  ["2", "Hotel Bali"],
  ["3", "Hotel Lombok"],
  ["4", "Hotel Surabaya"],
  ["5", "Hotel Bandung"],
];

export default function Hotel() {
  const [tableData, setTableData] = useState(initialTableData);
  const [inputHotel, setInputHotel] = useState("");
  const [currentHotelIndex, setCurrentHotelIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
    setInputHotel(""); // Clear input field
  };

  const handleChangeHotel = (e) => {
    setInputHotel(e.target.value);
  };

  const handleCloseAdd = () => {
    setIsAdding(false);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  const handleEdit = (index) => {
    setCurrentHotelIndex(index);
    setInputHotel(tableData[index][1]);
    setIsEditing(true);
  };

  const handleDelete = (index) => {
    setIsDeleting(true);
  };

  const handleSaveEdit = () => {
    const updatedData = [...tableData];
    updatedData[currentHotelIndex][1] = inputHotel;
    setTableData(updatedData);
    handleCloseEdit();
  };

  const handleSaveAdd = () => {
    const newHotel = [String(tableData.length + 1), inputHotel];
    setTableData([...tableData, newHotel]);
    handleCloseAdd();
  };

  return (
    <div className="overflow-auto px-9 py-6 h-[93vh] bg-custom-white-1 mt-5 mr-5 ml-5 rounded-lg flex flex-col gap-6">
      <div>
        <h3 className="font-semibold text-xl mb-1">Manajemen Hotel</h3>
        <p className="text-xs text-slate-500">
          Terakhir di Update 1 Jam 24 Menit yang lalu
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="w-1/3">
          <SearchBar
            onSearch={(e) => console.log(e.target.value)}
            placeholder="Cari dari total 6 data..."
          />
        </div>
        <ActionButton onClick={handleAdd}>
          <GrAddCircle className="mr-[6px]" size={16} />
          <p className="text-slate-900 font-semibold text-xs">Tambah Hotel</p>
        </ActionButton>
      </div>
      <TableWithActions
        headers={tableHeaders3}
        data={tableData}
        onUpdate={handleEdit}
        onDelete={handleDelete}
      />
      <ModalCrud
        title="Tambah Hotel"
        isOpen={isAdding}
        inputLabel="Nama Hotel"
        inputPlaceholder="Masukkan nama hotel"
        inputName="hotelName"
        inputValue={inputHotel}
        onChange={handleChangeHotel}
        textOk="Tambah"
        textCancel="Kembali"
        inputType="text"
        functionCancel={handleCloseAdd}
        functionOk={handleSaveAdd}
      />
      <ModalCrud
        title="Edit Hotel"
        isOpen={isEditing}
        inputLabel="Nama Hotel"
        inputPlaceholder="Masukkan nama hotel"
        inputName="hotelName"
        inputValue={inputHotel}
        onChange={handleChangeHotel}
        textOk="Simpan"
        textCancel="Batal"
        inputType="text"
        functionCancel={handleCloseEdit}
        functionOk={handleSaveEdit}
      />
    </div>
  );
}
