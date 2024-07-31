import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Table from "../organism/Table";
import ActionButton from "../atoms/ActionButton";
import { GoTrash, GoDownload } from "react-icons/go";
import { FiEdit2 } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { getDetailBill } from "../../redux/slices/billSlice";

const tableHeaders2 = [
  "No",
  "Item",
  "Quantity",
  "Harga / Unit",
  "Jumlah Harga",
];

const BillDetail = ({ onBack, bill }) => {
  const dispatch = useDispatch();
  const { bills, loading, error } = useSelector((state) => state.bill);
  const [dataBill, setDataBill] = useState(null);

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
  }, [dispatch, bill]);

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
    Quantity: `${order.quantity} ${order.quantity > 1 ? "Units" : "Unit"}`,
    "Harga / Unit": order.productPrice,
    "Jumlah Harga": parseFloat(order.total),
  }));

  return (
    <div className="overflow-auto px-9 py-6 h-[93vh] bg-custom-white-1 mt-5 mr-5 ml-5 rounded-lg flex flex-col">
      <div className="mb-2">
        <h3 className="font-semibold text-xl mb-1">
          {dataBill && dataBill.hotel.hotelName}
        </h3>
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
              <span className="text-gray-700">
                {dataBill && dataBill.hotel.hotelName}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="self-end mb-6 flex gap-[26px]">
        <ActionButton onClick={() => alert("Exporting...")}>
          <GoDownload className="mr-[6px]" size={16} />
          <p className="text-slate-900 font-semibold text-xs">Export Nota</p>
        </ActionButton>
        <ActionButton onClick={() => alert("Editing...")}>
          <FiEdit2 className="mr-[6px]" size={16} />
          <p className="text-slate-900 font-semibold text-xs">Edit Nota</p>
        </ActionButton>
        <ActionButton onClick={() => alert("Deleting...")}>
          <GoTrash className="mr-[6px]" size={16} />
          <p className="text-slate-900 font-semibold text-xs">Hapus Nota</p>
        </ActionButton>
      </div>
      <Table headers={tableHeaders2} data={tableData2} total={totalHarga} />
    </div>
  );
};

BillDetail.propTypes = {
  bill: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default BillDetail;
