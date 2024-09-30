import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { GoDownload } from "react-icons/go";
import Table from "../components/organism/Table";

const tableHeaders = [
  "Nomor",
  "Customer",
  "No. Nota",
  "Nota Ke-",
  "Keterangan",
  "Jumlah",
  "Terbayarkan",
];

export default function ExportOmzet() {
  const componentRef = useRef();
  const location = useLocation();
  const [omzet, setOmzet] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalTerbayarkan, setTotalTerbayarkan] = useState(0);
  const [totalJumlah, setTotalJumlah] = useState(0);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const stateString = urlParams.get("state");
    if (stateString) {
      const state = JSON.parse(decodeURIComponent(stateString));
      console.log(state);
      setOmzet(state.tableData);
      setStartDate(state.startDate);
      setEndDate(state.endDate);
      setTotalJumlah(state.totalJumlah);
      setTotalTerbayarkan(state.totalTerbayarkan);
    }
  }, [location.search]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Invoice_${new Date().toLocaleDateString()}.pdf`,
  });

  if (!omzet) {
    return <div>Data customers tidak tersedia</div>;
  }

  return (
    <>
      <div ref={componentRef} className="p-4 bg-white rounded-md">
        <div className="mb-2">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-semibold">UD TIMUR JAYA RAYA</h3>
            <p className="text-sm">Jl. Gareng No. 28 Cakranegara</p>
            <p className="text-sm">HP. 081907647590</p>
            <div className="w-full flex justify-between">
              <p className="text-sm">Fax. 0370-633668</p>
              <h4 className="font-semibold">Periode: {startDate} s/d {endDate}</h4>
            </div>
          </div>
        </div>
        <Table
          isExport={true}
          headers={tableHeaders}
          data={omzet}
          total={totalJumlah}
          totalDibayarkan={totalTerbayarkan}
          isHotelDetail={true}
        />
      </div>
      <button
        onClick={handlePrint}
        className="mt-4 mx-4 bg-white text-slate-900 px-2 py-1 rounded-md flex items-center justify-center border-2 border-slate-900 font-bold"
      >
        <GoDownload className="mr-2" size={16} />
        Unduh Omzet
      </button>
    </>
  );
}
