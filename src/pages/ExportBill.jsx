import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GoDownload } from "react-icons/go";
import { useReactToPrint } from "react-to-print";
import Table from "../components/organism/Table";

const tableHeaders2 = [
  "No",
  "Item",
  "Quantity",
  "Harga / Unit",
  "Jumlah Harga",
];

const ExportBill = () => {
  const location = useLocation();
  const [bill, setBill] = useState(null);
  const [tableData2, setTableData2] = useState(null);
  const componentRef = useRef();
  console.log(tableData2);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const stateString = urlParams.get("state");
    if (stateString) {
      const state = JSON.parse(decodeURIComponent(stateString));
      setBill(state.bill);
      setTableData2(state.tableData2);
    }
  }, [location.search]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: bill
      ? `${bill["Nama Hotel"]}_Nota_${new Date().toLocaleDateString()}.pdf`
      : "Nota.pdf",
  });

  if (!bill || !tableData2) {
    return <div>Data nota tidak tersedia</div>;
  }

  const totalHarga = tableData2.reduce(
    (sum, item) => sum + item["Jumlah Harga"],
    0
  );

  return (
    <div className="h-full bg-white mb-10">
      <div ref={componentRef} className="flex flex-col mt-8 mx-12">
        <div className="mb-7">
          <h3 className="font-semibold text-[26px] mb-1 text-slate-900">
            UD TIMUR JAYA RAYA
          </h3>
          <div className="flex justify-between text-slate-900 mt-2">
            <div className="flex flex-col gap-[6px]">
              <p>Alamat: Jl. Contoh No.123, Kota ABC</p>
              <p>No HP: 081234567890</p>
              <p>Fax: 021-987654</p>
            </div>
            <div className="flex flex-col gap-[6px]">
              <p>Nomor Nota: </p>
              <p>Tanggal Dibuat: {bill["Tanggal"]}</p>
              <p>Nama Hotel: {bill["Nama Hotel"]}</p>
            </div>
          </div>
        </div>
        <Table headers={tableHeaders2} data={tableData2} total={totalHarga} />
      </div>
      <button
        onClick={handlePrint}
        className="mt-4 mx-12 bg-white text-slate-900 px-4 py-2 rounded-md flex items-center justify-center border border-slate-400"
      >
        <GoDownload className="mr-2" size={16} />
        Unduh Nota
      </button>
    </div>
  );
};

export default ExportBill;
