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
  const [invoiceNumber, setInvoiceNumber] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const stateString = urlParams.get("state");
    if (stateString) {
      const state = JSON.parse(decodeURIComponent(stateString));
      setBill(state.bill);
      setTableData2(state.tableData2);
      setInvoiceNumber(state.invoiceNumber);
    }
  }, [location.search]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: bill
      ? `${bill["Nama Hotel"]}_Nota_${new Date().toLocaleDateString()}.pdf`
      : "Nota.pdf",
    pageStyle: `
      @page {
        size: 5.5in 9.5in;
        margin: 0.2in;
      }
      @media print {
        * {
          font-size: 12px;
          font-family: "Calibri", sans-serif;
          letter-spacing: 0.5px;
          color: black; /* Mengubah warna font menjadi hitam */
        }
        body {
          font-size: 12px;
          margin: 0.2in !important;
        }
        h3, p, .header-text {
          line-height: 1.5; /* Menambahkan jarak antar baris */
        }
        table {
          width: 100% !important;
          border-collapse: collapse;
        }
        th, td {
          padding: 4px !important;
          text-align: left;
          font-size: 12px !important;
          border: 1px solid black !important;
        }
      }
    `,
  });

  if (!bill || !tableData2) {
    return <div>Data nota tidak tersedia</div>;
  }

  const totalHarga = tableData2.reduce(
    (sum, item) => sum + item["Jumlah Harga"],
    0
  );

  const itemsPerPage = 10;

  const paginateData = (data, itemsPerPage) => {
    const pages = [];
    for (let i = 0; i < data.length; i += itemsPerPage) {
      pages.push(data.slice(i, i + itemsPerPage));
    }
    return pages;
  };

  const pages = paginateData(tableData2, itemsPerPage);

  return (
    <div className="h-full bg-white mb-10">
      <div ref={componentRef} className="flex flex-col mt-4 mx-6">
        <div className="mb-2">
          <h3 className="font-extrabold text-slate-900 header-text">
            UD TIMUR JAYA RAYA
          </h3>
          <div className="flex justify-between text-slate-900 mt-2">
            <div className="flex flex-col text-xs font-bold header-text">
              <p>Jl. Gareng No. 28 Cakranegara</p>
              <p>No HP. 081907647590</p>
              <p>Fax. 0370-633668</p>
            </div>
            <div className="flex flex-col text-xs">
              <div className="grid grid-cols-2 font-bold">
                <p>Nomor</p>
                <p>: {invoiceNumber}</p>
                <p>Tanggal Dibuat</p>
                <p>: {bill["Tanggal"]}</p>
                <p>Nama Hotel</p>
                <p>: {bill["Nama Hotel"]}</p>
              </div>
            </div>
          </div>
        </div>
        {pages.map((pageData, pageIndex) => (
          <div key={pageIndex} className="page">
            <Table
              isExport={true}
              headers={tableHeaders2}
              data={pageData}
              total={pageIndex === pages.length - 1 ? totalHarga : undefined}
            />
            {pageIndex < pages.length - 1 && <div className="page-break"></div>}
          </div>
        ))}
        <div className="mt-4 flex flex-col justify-between w-1/6 h-24 font-bold text-xs">
          <p>Penerima</p>
          <div className="border-b border-slate-900 w-full" />
        </div>
      </div>
      <button
        onClick={handlePrint}
        className="mt-4 mx-6 bg-white text-slate-900 px-2 py-1 rounded-md flex items-center justify-center border border-slate-900 font-bold text-xs"
      >
        <GoDownload className="mr-2" size={16} />
        Unduh Nota
      </button>
    </div>
  );
};

export default ExportBill;
