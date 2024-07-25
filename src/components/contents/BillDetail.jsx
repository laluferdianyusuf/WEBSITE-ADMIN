import PropTypes from "prop-types";
import Table from "../organism/Table";
import { FaFileExport } from "react-icons/fa";
import ActionButton from "../atoms/ActionButton";

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
  return (
    <div className="overflow-auto px-9 py-6 h-[93vh] bg-custom-white-1 mt-5 mr-5 ml-5 rounded-lg flex flex-col gap-8">
      <div>
        <h3 className="font-semibold text-xl mb-1">{bill["Nama Hotel"]}</h3>
        <div className="breadcrumbs text-sm mb-4">
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
      <Table headers={tableHeaders2} data={tableData2} total={totalHarga} />
      <div className="self-end">
        <ActionButton onClick={() => alert("Exporting...")}>
          <FaFileExport className="mr-[6px]" size={16} />
          <p className="text-slate-900 font-semibold text-xs">Export Nota</p>
        </ActionButton>
      </div>
    </div>
  );
};

BillDetail.propTypes = {
  bill: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default BillDetail;
