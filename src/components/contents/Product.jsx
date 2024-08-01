import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../atoms/SearchBar";
import ActionButton from "../atoms/ActionButton";
import { GrAddCircle } from "react-icons/gr";
import TableWithActions from "../organism/TableWithActions";
import ModalCrud from "../molecules/ModalCrud";

import NoProductFound from "/icons/belum-ada-produk.svg";

const tableHeaders3 = ["Nama Produk", "Actions"];

const initialTableData = [
  // {
  //   "Nama Produk": "Pulpen",
  // },
  // {
  //   "Nama Produk": "Penggaris",
  // },
  // {
  //   "Nama Produk": "Penghapus",
  // },
  // {
  //   "Nama Produk": "Penggaris",
  // },
];


import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
} from "../../redux/slices/productSlice";

const tableHeaders3 = ["Nama Produk", "Actions"];


export default function Product() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  const [inputProduct, setInputProduct] = useState("");
  const [currentProductIndex, setCurrentProductIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

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
    setInputProduct(products.product[index]["name"]);
    setIsEditing(true);
  };

  const handleDelete = (index) => {
    setCurrentProductIndex(index);
    setInputProduct(products.product[index]["name"]);
    setIsDeleting(true);
  };

  const handleSaveDelete = () => {
    const productId = products.product[currentProductIndex].id;
    dispatch(deleteProduct(productId))
      .unwrap()
      .then(() => {
        dispatch(getProducts());
        handleCloseDelete();
      })
      .catch((error) => {
        console.error("Delete failed:", error);
      });
  };

  const handleSaveEdit = () => {
    const productId = products.product[currentProductIndex].id;
    dispatch(updateProduct({ name: inputProduct, id: productId }))
      .unwrap()
      .then(() => {
        dispatch(getProducts());
        handleCloseEdit();
      })
      .catch((error) => {
        console.error("Update failed:", error);
      });
  };

  const handleSaveAdd = () => {
    dispatch(createProduct({ name: inputProduct }))
      .unwrap()
      .then(() => {
        dispatch(getProducts());
        handleCloseAdd();
      })
      .catch((error) => {
        console.error("Add failed:", error);
      });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const productArray = Array.isArray(products.product) ? products.product : [];

  const filteredProducts = productArray.filter((product) =>
    product?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            onSearch={handleSearch}
            placeholder={`Cari dari total ${productArray.length} data...`}
          />
        </div>
        <ActionButton onClick={handleAdd}>
          <GrAddCircle className="mr-[6px]" size={16} />
          <p className="text-slate-900 font-semibold text-xs">Tambah Produk</p>
        </ActionButton>
      </div>

      {tableData.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <img
            src={NoProductFound}
            alt="Tidak ada produk"
            width={250}
          />
          <p className="text-gray-500 mt-2">Belum ada data produk</p>
        </div>
      ) : (
       
      <TableWithActions
        headers={tableHeaders3}
        data={filteredProducts.map((product) => ({
          ProductName: product.name,
        }))}
        onUpdate={handleEdit}
        onDelete={handleDelete}
      />

      <ModalCrud
        title="Tambah Produk"
        isOpen={isAdding}
        inputLabel="Nama Produk"
        inputPlaceholder="Masukkan nama produk"
        inputName="productName"
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
        inputName="productName"
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
        inputName="productName"
        inputValue={inputProduct}
        textOk="Hapus"
        textCancel="Batal"
        inputType="text"
        functionCancel={handleCloseDelete}
        functionOk={handleSaveDelete}
      />
    </div>
  );
}
