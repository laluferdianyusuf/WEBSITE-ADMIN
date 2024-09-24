import { useState, useEffect, useRef } from "react";
import Table from "../components/organism/Table";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { GoDownload } from "react-icons/go";

const tableHeaders = [
  "Nama Customer",
  "Alamat",
  "Total Tagihan",
  "Total Terbayarkan",
  "Sisa Tagihan",
  "Status",
];
export default function ExportCustomer() {
  const componentRef = useRef();
  const location = useLocation();
  const [customers, setCustomers] = useState([]);
  const [totalSemuaTagihan, setTotalSemuaTagihan] = useState("");
  const [totalSemuaTerbayarkan, setTotalSemuaTerbayarkan] = useState("");
  const [totalSisaTagihan, setTotalSisaTagihan] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const stateString = urlParams.get("state");
    if (stateString) {
      const state = JSON.parse(decodeURIComponent(stateString));
      console.log(state);
      setCustomers(state.customers);
      setTotalSemuaTagihan(state.totalSemuaTagihan);
      setTotalSemuaTerbayarkan(state.totalSemuaTerbayarkan);
      setTotalSisaTagihan(state.totalSisaTagihan);
    }
  }, [location.search]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Customers_${new Date().toLocaleDateString()}.pdf`,
  });

  if (!customers) {
    return <div>Data customers tidak tersedia</div>;
  }

  return (
    <>
      <div ref={componentRef} className="p-4 bg-white rounded-md">
        <div className="mb-2 flex justify-between">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-semibold">UD TIMUR JAYA RAYA</h3>
            <p className="text-sm">Jl. Gareng No. 28 Cakranegara</p>
            <p className="text-sm">HP. 081907647590</p>
            <p className="text-sm">Fax. 0370-633668</p>
          </div>
          <div className="flex flex-col gap-[2px] self-end">
            <div className="flex">
              <p className="text-xs flex-1">Total Seluruh Tagihan</p>
              <p className="text-xs">
                : {totalSemuaTagihan.toLocaleString("id-ID")}
              </p>
            </div>
            <div className="flex">
              <p className="text-xs flex-1">Total Tagihan Lunas Semua Customer</p>
              <p className="text-xs">
                : {totalSemuaTerbayarkan.toLocaleString("id-ID")}
              </p>
            </div>
            <div className="flex">
              <p className="text-xs flex-1">Sisa Tagihan Belum Lunas Semua Hotel</p>
              <p className="text-xs">
                : {totalSisaTagihan.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>
        <Table isExport={true} headers={tableHeaders} data={customers} />
      </div>
      <button
        onClick={handlePrint}
        className="mt-4 mx-4 bg-white text-slate-900 px-2 py-1 rounded-md flex items-center justify-center border border-slate-900 text-sm"
      >
        <GoDownload className="mr-2" size={16} />
        Unduh Customers
      </button>
    </>
  );
}
