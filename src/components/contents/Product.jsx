/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import SearchBar from "../atoms/SearchBar";
import ActionButton from "../atoms/ActionButton";
import { GrAddCircle } from "react-icons/gr";
import TableWithActions from "../organism/TableWithActions";
import ModalCrud from "../molecules/ModalCrud";

const tableHeaders3 = ["Nama Produk", "Actions"];

const initialTableData = [
  {
    "Nama Produk": "Pulpen",
  },
  {
    "Nama Produk": "Penggaris",
  },
  {
    "Nama Produk": "Penghapus",
  },
  {
    "Nama Produk": "Penggaris",
  },
];

export default function Product() {
  const [tableData, setTableData] = useState(initialTableData);
  const [inputProduct, setInputProduct] = useState("");
  const [currentProductIndex, setCurrentProductIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
    setInputProduct("");
  };

  const handleChangeInput = (e) => {
    setInputProduct(e.target.value);
  };

  const handleCloseAdd = () => {
    setIsAdding(false);
  };

  const handleCloseDelete = () => {
    setIsDeleting(false);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  const handleEdit = (index) => {
    setCurrentProductIndex(index);
    setInputProduct(tableData[index]["Nama Produk"]);
    setIsEditing(true);
  };

  const handleDelete = (index) => {
    setCurrentProductIndex(index);
    setInputProduct(tableData[index]["Nama Produk"]);
    setIsDeleting(true);
  };

  const handleSaveDelete = () => {
    const updatedData = [...tableData];
    updatedData.splice(currentProductIndex, 1);
    setTableData(updatedData);
    handleCloseDelete();
  };

  const handleSaveEdit = () => {
    const updatedData = [...tableData];
    updatedData[currentProductIndex]["Nama Produk"] = inputProduct;
    setTableData(updatedData);
    handleCloseEdit();
  };

  const handleSaveAdd = () => {
    const newProduct = {
      "Nama Produk": inputProduct,
    };
    setTableData([...tableData, newProduct]);
    handleCloseAdd();
  };

  return (
    <div className="overflow-auto px-9 py-6 h-[93vh] bg-custom-white-1 mt-5 mr-5 ml-5 rounded-lg flex flex-col gap-6">
      <div>
        <h3 className="font-semibold text-xl mb-1">Manajemen Produk</h3>
        <p className="text-xs text-slate-500">
          Terakhir di Update 1 Jam 24 Menit yang lalu
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="w-1/3">
          <SearchBar
            onSearch={(e) => console.log(e.target.value)}
            placeholder="Cari dari total 8 data..."
          />
        </div>
        <ActionButton onClick={handleAdd}>
          <GrAddCircle className="mr-[6px]" size={16} />
          <p className="text-slate-900 font-semibold text-xs">Tambah Produk</p>
        </ActionButton>
      </div>
      <TableWithActions
        headers={tableHeaders3}
        data={tableData}
        onUpdate={handleEdit}
        onDelete={handleDelete}
      />
      <ModalCrud
        title="Tambah Produk"
        isOpen={isAdding}
        inputLabel="Nama Produk"
        inputPlaceholder="Masukkan nama produk"
        inputName="produkName"
        inputValue={inputProduct}
        onChange={handleChangeInput}
        textOk="Tambah"
        textCancel="Kembali"
        inputType="text"
        functionCancel={handleCloseAdd}
        functionOk={handleSaveAdd}
      />
      <ModalCrud
        title="Edit Produk"
        isOpen={isEditing}
        inputLabel="Nama Produk"
        inputPlaceholder="Masukkan nama produk"
        inputName="produkName"
        inputValue={inputProduct}
        onChange={handleChangeInput}
        textOk="Simpan"
        textCancel="Batal"
        inputType="text"
        functionCancel={handleCloseEdit}
        functionOk={handleSaveEdit}
      />
      <ModalCrud
        title="Hapus Produk"
        isOpen={isDeleting}
        inputLabel="Hapus Produk"
        isDisabled={true}
        inputName="produkName"
        inputValue={inputProduct}
        textOk="Hapus"
        textCancel="Batal"
        inputType="text"
        functionCancel={() => setIsDeleting(false)}
        functionOk={handleSaveDelete}
      />
    </div>
  );
}
