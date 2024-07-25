import PropTypes from "prop-types";
import Table from "../organism/Table";

const tableHeaders = ["Tanggal", "Total Tagihan"];

const tableData = [
  {
    Tanggal: "12/07/2022",
    "Total Tagihan": 5000000,
  },
  {
    Tanggal: "09/12/2024",
    "Total Tagihan": 100000,
  },
  {
    Tanggal: "10/01/2025",
    "Total Tagihan": 7500000,
  },
  {
    Tanggal: "28/03/2021",
    "Total Tagihan": 2500000,
  },
];

const totalHarga = tableData.reduce(
  (sum, item) => sum + item["Total Tagihan"],
  0
);

export default function HotelDetail({ onBack, hotel }) {
  return (
    <div className="overflow-auto px-9 py-6 h-[93vh] bg-custom-white-1 mt-5 mr-5 ml-5 rounded-lg flex flex-col gap-8">
      <div>
        <h3 className="font-semibold text-xl mb-1">{hotel["Nama Hotel"]}</h3>
        <div className="breadcrumbs text-sm mb-4">
          <ul className="flex gap-2">
            <li>
              <button
                className="text-blue-500 hover:underline"
                onClick={onBack}
              >
                Manajemen Hotel
              </button>
            </li>
            <li>
              <span className="text-gray-700">{hotel["Nama Hotel"]}</span>
            </li>
          </ul>
        </div>
      </div>
      <Table headers={tableHeaders} data={tableData} total={totalHarga} />
    </div>
  );
}

HotelDetail.propTypes = {
  onBack: PropTypes.func.isRequired,
  hotel: PropTypes.object,
};
