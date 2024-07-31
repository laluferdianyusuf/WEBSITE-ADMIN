import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../atoms/SearchBar";
import ActionButton from "../atoms/ActionButton";
import { GrAddCircle } from "react-icons/gr";
import TableWithActions from "../organism/TableWithActions";
import ModalCrud from "../molecules/ModalCrud";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotels,
} from "../../redux/slices/hotelSlice";

const tableHeaders3 = ["Nama Hotel", "Actions"];

export default function Hotel({ handleHotelSelect }) {
  const dispatch = useDispatch();
  const { hotels, loading, error } = useSelector((state) => state.hotel);
  const [inputHotel, setInputHotel] = useState("");
  const [currentHotelIndex, setCurrentHotelIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getHotels());
  }, [dispatch]);

  const handleAdd = () => {
    setIsAdding(true);
    setInputHotel(""); // Clear input field
  };

  const handleChangeHotel = (e) => {
    setInputHotel(e.target.value);
  };

  const handleCloseAdd = () => setIsAdding(false);
  const handleCloseEdit = () => setIsEditing(false);
  const handleCloseDelete = () => setIsDeleting(false);

  const handleEdit = (index) => {
    setCurrentHotelIndex(index);
    setInputHotel(hotels.hotel[index].hotelName);
    setIsEditing(true);
  };

  const handleDelete = (index) => {
    setCurrentHotelIndex(index);
    setInputHotel(hotels.hotel[index].hotelName);
    setIsDeleting(true);
  };

  const handleSaveDelete = async () => {
    try {
      const hotelId = hotels.hotel[currentHotelIndex].id;
      await dispatch(deleteHotel(hotelId)).unwrap();
      dispatch(getHotels());
      handleCloseDelete();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const hotelId = hotels.hotel[currentHotelIndex].id;
      await dispatch(
        updateHotel({ hotelName: inputHotel, id: hotelId })
      ).unwrap();
      dispatch(getHotels());
      handleCloseEdit();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleSaveAdd = async () => {
    try {
      await dispatch(createHotel({ hotelName: inputHotel })).unwrap();
      dispatch(getHotels());
      handleCloseAdd();
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  const handleRowClick = (hotelId) => {
    handleHotelSelect(hotelId);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const hotelsArray = Array.isArray(hotels.hotel) ? hotels.hotel : [];

  const filteredHotels = hotelsArray.filter((hotel) =>
    hotel.hotelName
      ? hotel.hotelName.toLowerCase().includes(searchQuery.toLowerCase())
      : false
  );

  const dataFilteredHotel = filteredHotels.map((hotel, index) => ({
    "Nama Hotel": hotel.hotelName,
    id: hotel.id,
  }));

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
            onSearch={handleSearch}
            placeholder={`Cari dari total ${hotelsArray.length} data...`}
          />
        </div>
        <ActionButton onClick={handleAdd}>
          <GrAddCircle className="mr-[6px]" size={16} />
          <p className="text-slate-900 font-semibold text-xs">Tambah Hotel</p>
        </ActionButton>
      </div>
      <TableWithActions
        headers={tableHeaders3}
        data={dataFilteredHotel}
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
        functionCancel={handleCloseDelete}
        functionOk={handleSaveDelete}
      />
    </div>
  );
}
