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
        size: 9.0in 11in;
        margin: 0.2in;
      }
      @media print {
        * {
          font-size: 14px;
          font-family: "Calibri", sans-serif;
          color: black;
        }
        body {
          font-size: 14px;
          margin-top: 0.2in !important;
          margin-bottom: 0.2in !important;
          margin-left: 0.4in !important;
          margin-right: 0.4in !important;
        }
        h3, p, .header-text {
          line-height: 1.5;
        }
        h3 {
          font-size: 20px !important;
        }
        table {
          width: 99% !important;
          margin-left: 0 !important;
          border-collapse: collapse;
        }
        th, td {
          padding: 2px !important;
          font-size: 14px !important;
          border: 2px solid black !important;
        }
        th:nth-child(1),
        td:nth-child(1),
        th:nth-child(3),
        td:nth-child(3) {
          text-align: center !important;
        }
        th:nth-child(2),
        td:nth-child(2) {
          text-align: left !important;
        }
        th:nth-child(4),
        th:nth-child(5) {
          text-align: center !important;
        }
        td:nth-child(4),
        td:nth-child(5) {
          text-align: right !important;
        }
        tfoot td:nth-child(4),
        tfoot td:nth-child(5) {
          text-align: right !important;
        }
        tfoot td:nth-child(3) {
          text-align: right !important;
          font-weight: bold !important;
          background-color: lightgray !important;
        }
        .page-break {
          page-break-before: always !important;
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

  const itemsPerPage = 12;

  const paginateData = (data, itemsPerPage) => {
    const pages = [];
    for (let i = 0; i < data.length; i += itemsPerPage) {
      pages.push(data.slice(i, i + itemsPerPage));
    }
    return pages;
  };

  const pages = paginateData(tableData2, itemsPerPage);

  return (
    <div className="h-full bg-white mb-10 w-[800px] max-w-[800px] flex flex-col items-center">
      <div ref={componentRef} className="flex flex-col mt-4 mx-1 w-full">
        <div className="mb-2">
          <h3 className="font-extrabold text-slate-900 header-text">
            UD TIMUR JAYA RAYA
          </h3>
          <div className="flex justify-between text-slate-900 mt-2">
            <div className="flex flex-col text-xs font-semibold header-text">
              <p>Jl. Gareng No. 28 Cakranegara</p>
              <p>No HP. 081907647590</p>
              <p>Fax. 0370-633668</p>
            </div>
            <div className="flex flex-col text-xs">
              <div className="grid grid-cols-2 font-semibold">
                <p>Nomor</p>
                <p>: {invoiceNumber}</p>
                <p>Tanggal Dibuat</p>
                <p>: {bill["Tanggal"]}</p>
                <p>Nama Customer</p>
                <p>: {bill["Nama Hotel"]}</p>
                <p>Alamat</p>
                <p>: </p>
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
        <div className="mt-4 flex flex-col justify-between w-1/6 h-24 font-semibold text-xs">
          <p>Penerima</p>
          <div className="border-b border-slate-900 w-full" />
        </div>
      </div>
      <button
        onClick={handlePrint}
        className="mt-4 mx-6 bg-white text-slate-900 px-2 py-1 rounded-md flex items-center justify-center border border-slate-900 font-semibold text-xs"
      >
        <GoDownload className="mr-2" size={16} />
        Unduh Nota
      </button>
    </div>
  );
};

export default ExportBill;
