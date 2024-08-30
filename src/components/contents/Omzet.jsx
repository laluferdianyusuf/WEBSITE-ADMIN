import SearchBar from "../atoms/SearchBar";
import ActionButton from "../atoms/ActionButton";
import { GoDownload } from "react-icons/go";
import NoOmzetData from "/icons/tidak-ditemukan-data.svg";
import Table from "../organism/Table";
import Pagination from "../molecules/Pagination";
import { useState } from "react";

export default function Omzet() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const tableHeaders = [
    "Nomor",
    "Customer",
    "No. Nota",
    "Nota Ke-",
    "Keterangan",
    "Jumlah",
    "Terbayarkan",
  ];

  const tableData = [
    {
      Nomor: 1,
      Customer: "PT ABC",
      "No. Nota": "INV001",
      "Nota Ke-": "1",
      Keterangan: "Pembelian Barang A",
      Jumlah: 1000000,
      Terbayarkan: 800000,
    },
    {
      Nomor: 2,
      Customer: "CV XYZ",
      "No. Nota": "INV002",
      "Nota Ke-": "1",
      Keterangan: "Pembelian Barang B",
      Jumlah: 2000000,
      Terbayarkan: 2000000,
    },
    {
      Nomor: 3,
      Customer: "PT MNO",
      "No. Nota": "INV003",
      "Nota Ke-": "1",
      Keterangan: "Pembelian Barang C",
      Jumlah: 1500000,
      Terbayarkan: 1500000,
    },
  ];

  const calculateTotals = (data) => {
    if (data.length > 0) {
      let totalJumlah = 0;
      let totalTerbayarkan = 0;

      data.forEach((item) => {
        totalJumlah += item.Jumlah;
        totalTerbayarkan += item.Terbayarkan;
      });

      return { totalJumlah, totalTerbayarkan };
    } else {
      return { totalJumlah: 0, totalTerbayarkan: 0 };
    }
  };

  const { totalJumlah, totalTerbayarkan } = calculateTotals(tableData);
  
  const handleExportClick = () => {
    const state = {
      tableData,
      totalJumlah,
      totalTerbayarkan,
      selectedDate
    };
    const stateString = encodeURIComponent(JSON.stringify(state));
    window.open(
      `/#/omzetexport?state=${stateString}`,
      "_blank",
      `noopener,noreferrer`
    );
    console.log(stateString)
  };


  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="overflow-auto px-9 py-6 h-[93vh] bg-custom-white-1 mt-5 mr-5 ml-5 rounded-lg flex flex-col gap-5 relative">
      <div>
        <h3 className="font-semibold text-xl mb-1">Manajemen Omzet</h3>
        <p className="text-xs text-slate-500">
          Terakhir di Update belum dikerjakan
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div className="w-1/3">
          <SearchBar
            onSearch={()=>{}}
            placeholder={`Cari dari total 61723 data`}
          />
        </div>
        <div className="flex gap-5">
          <input
            type="date"
            className="px-[10px] py-[7px] border rounded-lg border-slate-900 focus:outline-none focus:ring-2 focus:ring-custom-green-1 text-slate-900 font-medium h-9 text-xs"
            max={new Date().toISOString().split("T")[0]}
            value={selectedDate}
            onChange={handleDateChange}
            required
          />
          {/* {validationErrors.tanggalNota && (
              <span className="text-red-500 text-xs">
                {validationErrors.tanggalNota}
              </span>
            )} */}
          <ActionButton onClick={handleExportClick}>
            <GoDownload className="mr-[6px]" size={16} />
            <p className="text-slate-900 font-semibold text-xs">
              Download Rincian Penjualan
            </p>
          </ActionButton>
        </div>
      </div>
      {tableData.length > 0 ? (
        <Table
          data={tableData}
          headers={tableHeaders}
          total={totalJumlah}
          totalDibayarkan={totalTerbayarkan}
          isHotelDetail={true}
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <img src={NoOmzetData} alt="Tidak ada hotel" width={250} />
          <p className="text-gray-500 mt-4">Tidak ada ditemukan data</p>
        </div>
      )}
      <div>
        <p className="text-xs text-end">
          Menampilkan {tableData.length} - {tableData.length} dari total{" "}
          {tableData.length} data
        </p>
        <Pagination
          totalItems={tableData.length}
          itemsPerPage={tableData.length}
          currentPage={1}
          onPageChange={() => {}}
        />
      </div>
    </div>
  );
}
