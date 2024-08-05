import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../atoms/SearchBar";
import ActionButton from "../atoms/ActionButton";
import { GrAddCircle } from "react-icons/gr";
import TableWithActions from "../organism/TableWithActions";
import ModalCrud from "../molecules/ModalCrud";
import NoProductFound from "/icons/belum-ada-produk.svg";
import Pagination from "../molecules/Pagination";

const tableHeaders3 = ["ID", "Nama Produk", "Actions"];

import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
} from "../../redux/slices/productSlice";
import WarningNotification from "../atoms/WarningNotification";

export default function Product() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const [inputProduct, setInputProduct] = useState("");
  const [currentProductIndex, setCurrentProductIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");
  const itemsPerPage = 6;

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
    setInputProduct(index.productName);
    setIsEditing(true);
  };

  const handleDelete = (index) => {
    setCurrentProductIndex(index);
    setInputProduct(index.productName);
    setIsDeleting(true);
  };

  const handleSaveDelete = () => {
    const productId = currentProductIndex.id;
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
    const productId = currentProductIndex.id;
    dispatch(updateProduct({ name: inputProduct, id: productId }))
      .unwrap()
      .then(() => {
        dispatch(getProducts());
        handleCloseEdit();
      })
      .catch((error) => {
        setError("Error saat edit");
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
        setError("Produk sudah ada");
      });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const productArray = Array.isArray(products.product) ? products.product : [];

  const filteredProducts = productArray.filter((product) =>
    product?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLastUpdateTime = (data) => {
    if (!data || data.length === 0) return null;

    const sortedData = [...data].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );

    return sortedData[0].updatedAt;
  };

  const lastUpdated = getLastUpdateTime(productArray);
  const now = new Date();
  const timeDifference = lastUpdated
    ? Math.floor((now - new Date(lastUpdated)) / 1000)
    : null;

  let timeSinceUpdate = "Tidak ada data";
  if (timeDifference !== null) {
    const days = Math.floor(timeDifference / 86400);
    const hours = Math.floor((timeDifference % 86400) / 3600);
    const minutes = Math.floor((timeDifference % 3600) / 60);
    const seconds = timeDifference % 60;

    if (days > 0) {
      timeSinceUpdate = `${days} hari, ${hours} jam yang lalu`;
    } else if (hours > 0) {
      timeSinceUpdate = `${hours} jam, ${minutes} menit yang lalu`;
    } else if (minutes > 0) {
      timeSinceUpdate = `${minutes} menit yang lalu`;
    } else {
      timeSinceUpdate = `${seconds} detik yang lalu`;
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(
    currentPage * itemsPerPage,
    filteredProducts.length
  );

  return (
    <div className="overflow-auto px-9 py-6 h-[93vh] bg-custom-white-1 mt-5 mr-5 ml-5 rounded-lg flex flex-col gap-5 relative">
      <div>
        <h3 className="font-semibold text-xl mb-1">Manajemen Produk</h3>
        <p className="text-xs text-slate-500">
          Terakhir di Update {timeSinceUpdate}
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

      {currentProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <img src={NoProductFound} alt="Tidak ada produk" width={250} />
          <p className="text-gray-500 mt-2">Belum ada data produk</p>
        </div>
      ) : (
        <TableWithActions
          headers={tableHeaders3}
          data={currentProducts.map((product) => ({
            id: product.id,
            productName: product.name,
          }))}
          onUpdate={handleEdit}
          onDelete={handleDelete}
        />
      )}
      <p className="text-xs text-end absolute bottom-[3rem] right-[2.3rem] ">
        Menampilkan {startIndex} - {endIndex} dari total{" "}
        {filteredProducts.length} data
      </p>

      <Pagination
        totalItems={filteredProducts.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
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
      {error && <WarningNotification text={error} duration={3000} />}
    </div>
  );
}
