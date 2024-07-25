/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import SearchBar from "../atoms/SearchBar";
import ActionButton from "../atoms/ActionButton";
import { GrAddCircle } from "react-icons/gr";
import TableWithActions from "../organism/TableWithActions";
import { useState } from "react";
import ModalCrud from "../molecules/ModalCrud";
import PropTypes from "prop-types";

const tableHeaders3 = ["Nama Hotel", "Actions"];

const initialTableData = [
  {
    "Nama Hotel": "Hotel Indonesia",
  },
  {
    "Nama Hotel": "Hotel Bali",
  },
  {
    "Nama Hotel": "Hotel Lombok",
  },
  {
    "Nama Hotel": "Hotel Surabaya",
  },
  {
    "Nama Hotel": "Hotel Bandung",
  },
];

export default function Hotel({ handleHotelSelect }) {
  const [tableData, setTableData] = useState(initialTableData);
  const [inputHotel, setInputHotel] = useState("");
  const [currentHotelIndex, setCurrentHotelIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
    setInputHotel(""); // Bersihkan input field
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

  const handleCloseDelete = () => {
    setIsDeleting(false);
  };

  const handleEdit = (index) => {
    setCurrentHotelIndex(index);
    setInputHotel(tableData[index]["Nama Hotel"]);
    setIsEditing(true);
  };

  const handleDelete = (index) => {
    setCurrentHotelIndex(index);
    setInputHotel(tableData[index]["Nama Hotel"]);
    setIsDeleting(true);
  };

  const handleSaveDelete = () => {
    const updatedData = tableData.filter((_, idx) => idx !== currentHotelIndex);
    setTableData(updatedData);
    handleCloseDelete();
  };

  const handleSaveEdit = () => {
    const updatedData = [...tableData];
    updatedData[currentHotelIndex]["Nama Hotel"] = inputHotel;
    setTableData(updatedData);
    handleCloseEdit();
  };

  const handleSaveAdd = () => {
    const newHotel = {
      No: String(tableData.length + 1),
      "Nama Hotel": inputHotel,
    };
    setTableData([...tableData, newHotel]);
    handleCloseAdd();
  };

  const handleRowClick = (hotelId) => {
    handleHotelSelect(hotelId);
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
        onRowClick={handleRowClick}
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
        inputLabel="Edit Hotel"
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
      <ModalCrud
        title="Hapus Hotel"
        isOpen={isDeleting}
        inputLabel="Hapus Hotel"
        isDisabled={true}
        inputName="hotelName"
        inputValue={inputHotel}
        textOk="Hapus"
        textCancel="Batal"
        inputType="text"
        functionCancel={() => setIsDeleting(false)}
        functionOk={handleSaveDelete}
      />
    </div>
  );
}

Hotel.propTypes = {
  handleHotelSelect: PropTypes.func,
};
