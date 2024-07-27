import { useState } from "react";
import PropTypes from "prop-types";
import Table from "../organism/Table";
import ActionButton from "../atoms/ActionButton";
import { GoTrash, GoDownload } from "react-icons/go";
import { FiEdit2 } from "react-icons/fi";
import InputProduct from "../molecules/InputProduct";
import ModalCrud from "../molecules/ModalCrud";

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

const totalHarga = tableData2.reduce(
  (sum, item) => sum + item["Jumlah Harga"],
  0
);

const BillDetail = ({ onBack, bill }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
    setSelectedBill(bill);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedBill(null);
  };

  const confirmDelete = () => {
    console.log("Deleting bill:", selectedBill);
    handleCloseDeleteModal();
  };

  const initialData = {
    namaHotel: bill["Nama Hotel"],
    pesanan: tableData2.map((item) => ({
      item: item.Item,
      quantity: item.Quantity,
      harga_unit: item["Harga / Unit"],
      total_harga: item["Jumlah Harga"],
    })),
  };

  return (
    <div className="overflow-auto px-9 py-6 h-[93vh] bg-custom-white-1 mt-5 mr-5 ml-5 rounded-lg flex flex-col">
      <div className="mb-2">
        <h3 className="font-semibold text-xl mb-1">{bill["Nama Hotel"]}</h3>
        <div className="breadcrumbs text-sm">
          <ul className="flex gap-2">
            <li>
              <button
                className="text-blue-500 hover:underline"
                onClick={onBack}
              >
                Manajemen Nota
              </button>
            </li>
            <li>
              <span className="text-gray-700">{bill["Nama Hotel"]}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="self-end mb-6 flex gap-[26px]">
        <ActionButton onClick={() => alert("Exporting...")}>
          <GoDownload className="mr-[6px]" size={16} />
          <p className="text-slate-900 font-semibold text-xs">Export Nota</p>
        </ActionButton>
        <ActionButton onClick={handleEditClick}>
          <FiEdit2 className="mr-[6px]" size={16} />
          <p className="text-slate-900 font-semibold text-xs">Edit Nota</p>
        </ActionButton>
        <ActionButton onClick={handleDeleteClick}>
          <GoTrash className="mr-[6px]" size={16} />
          <p className="text-slate-900 font-semibold text-xs">Hapus Nota</p>
        </ActionButton>
      </div>
      <Table headers={tableHeaders2} data={tableData2} total={totalHarga} />
      <InputProduct
        isOpen={isEditModalOpen}
        closeModal={handleCloseEditModal}
        initialData={initialData}
        isEdit={true}
      />
      <ModalCrud
        isOpen={isDeleteModalOpen}
        title="Hapus Nota"
        functionCancel={handleCloseDeleteModal}
        functionOk={confirmDelete}
        textCancel="Batal"
        textOk="Hapus"
        inputValue={bill["Nama Hotel"]}
        onChange={() => {}}
        inputName="nama_hotel"
        inputPlaceholder="Nama Hotel"
        inputType="text"
        inputLabel="Nama Hotel"
        isDisabled={true}
      />
    </div>
  );
};

BillDetail.propTypes = {
  bill: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default BillDetail;
