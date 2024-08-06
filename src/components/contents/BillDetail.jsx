import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Table from "../organism/Table";
import ActionButton from "../atoms/ActionButton";
import { GoTrash, GoDownload } from "react-icons/go";
import InputProduct from "../molecules/InputProduct";
import ModalCrud from "../molecules/ModalCrud";
import { useSelector, useDispatch } from "react-redux";
import { getDetailBill, deleteBill } from "../../redux/slices/billSlice";
import BackButton from "../atoms/BackButton";
import WarningNotification from "../atoms/WarningNotification";
import SuccessNotification from "../atoms/SuccessNotification";

const tableHeaders2 = [
  "No",
  "Item",
  "Quantity",
  "Harga / Unit",
  "Jumlah Harga",
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("id-ID", options);
};

export default function BillDetail({ onBack, bill }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.bill);
  const [dataBill, setDataBill] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(getDetailBill(bill.id));
        setDataBill(result.payload.data.bill);
      } catch (err) {
        console.error("Failed to fetch bill details:", err);
      }
    };

    fetchData();
  }, [dispatch, bill.id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading bill details.</p>;

  const orders = dataBill?.orders || [];

  const totalHarga = orders.reduce(
    (sum, order) => sum + parseFloat(order.total),
    0
  );

  const tableData2 = orders.map((order, index) => ({
    No: index + 1,
    Item: order.productName,
    Quantity: order.quantity,
    "Harga / Unit": order.productPrice,
    "Jumlah Harga": parseFloat(order.total),
  }));

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
    setDeleteError(null);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteBill(selectedBill.id))
        .unwrap()
        .then(() => {
          setSuccess("Berhasil hapus nota");
          handleCloseDeleteModal();
          onBack();
        })
        .catch((error) => {
          setDeleteError("Gagal hapus nota");
        });
    } catch (err) {
      setDeleteError("Failed to delete the bill. Please try again.");
      console.error("Error deleting bill:", err);
    }
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

  const handleExportClick = () => {
    const state = {
      bill,
      tableData2,
    };
    const stateString = encodeURIComponent(JSON.stringify(state));
    window.open(
      `/#/billexport?state=${stateString}`,
      "_blank",
      `noopener,noreferrer`
    );
  };

  return (
    <div className="overflow-auto px-9 py-6 h-[93vh] bg-custom-white-1 mt-5 mr-5 ml-5 rounded-lg flex flex-col">
      <div className="mb-2">
        <h3 className="font-semibold text-xl mb-1 flex items-center gap-3">
          <BackButton onClick={onBack} />
          {dataBill && dataBill.hotel.hotelName}
        </h3>
        <div className="ms-12 breadcrumbs text-sm">
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
              <span className="text-gray-700">
                {dataBill && dataBill.hotel.hotelName}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="ms-12 flex justify-between mb-6 items-center">
        <h3 className="font-bold text-slate-700 text-xs">
          {dataBill && formatDate(dataBill.createdAt)}
        </h3>
        <div className="flex gap-4">
          <ActionButton onClick={handleExportClick}>
            <GoDownload className="mr-[6px]" size={16} />
            <p className="text-slate-900 font-semibold text-xs">Export Nota</p>
          </ActionButton>
          <ActionButton onClick={handleDeleteClick}>
            <GoTrash className="mr-[6px]" size={16} />
            <p className="text-slate-900 font-semibold text-xs">Hapus Nota</p>
          </ActionButton>
        </div>
      </div>
      <div className="ms-12 overflow-auto no-scrollbar">
        <Table headers={tableHeaders2} data={tableData2} total={totalHarga} />
      </div>
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
      {deleteError && <WarningNotification text={deleteError} />}
      {success && <SuccessNotification text={success} />}
    </div>
  );
}

BillDetail.propTypes = {
  bill: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
};
