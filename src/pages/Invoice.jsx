import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { GoDownload } from "react-icons/go";

const tableHeaders = [
  "Tanggal",
  "Item",
  "Quantity",
  "Harga / Unit",
  "Amount",
  "Paid",
  "Balance",
];

const InvoiceExport = () => {
  const componentRef = useRef();
  const location = useLocation();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const stateString = urlParams.get("state");
    if (stateString) {
      const state = JSON.parse(decodeURIComponent(stateString));
      setHotel(state.data);
    }
  }, [location.search]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Invoice_${new Date().toLocaleDateString()}.pdf`,
  });

  if (!hotel) {
    return <div>Data hotel tidak tersedia</div>;
  }

  const unpaidBills = hotel.bills.filter(
    (bill) => bill.total_dibayar <= bill.total_pesanan
  );

  const calculateTotals = () => {
    let totalAmount = 0;
    let totalPaid = 0;
    let totalBalance = 0;

    unpaidBills.forEach((bill) => {
      totalAmount += bill.total_pesanan;
      totalPaid += bill.total_dibayar;
      totalBalance += bill.total_pesanan - bill.total_dibayar;
    });

    return { totalAmount, totalPaid, totalBalance };
  };

  const date = new Date().toLocaleDateString();
  const currentYear = new Date().getFullYear().toString().slice(-2);

  const { totalAmount, totalPaid, totalBalance } = calculateTotals();

  return (
    <div>
      <div ref={componentRef} className="p-4 bg-white rounded-md">
        <div className="mb-2">
          <div className="flex justify-between text-slate-9000 mt-2">
            <div className="flex flex-col gap-[2px]">
              <h3 className="font">UD TIMUR JAYA RAYA</h3>
              <p className="text-sm">Jl. Gareng No. 28 Cakranegara</p>
              <p className="text-sm">HP. 081907647590</p>
              <p className="text-sm">Fax. 0370-633668</p>
            </div>
            <div className="flex flex-col gap-[2px]">
              <h4 className="text-sm">INVOICE</h4>
              <div className="grid grid-cols-2">
                <p className="text-sm">Invoice No</p>
                <p className="text-sm">: ..../..../{currentYear}</p>
              </div>
              <div className="grid grid-cols-2">
                <p className="text-sm">Tanggal</p>
                <p className="text-sm">: {date}</p>
              </div>
              <div className="grid grid-cols-2">
                <p className="text-sm">Kepada</p>
                <p className="text-sm">: {hotel.nama_hotel}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-md border-2 border-slate-900 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b-2 border-slate-900">
                {tableHeaders.map((header) => (
                  <th
                    key={header}
                    className={`bg-custom-blue-1 px-2 py-1 text-left font ${header === "Quantity" || header === "Harga / Unit" || header === "Amount" || header === "Paid" || header === "Balance" ? "text-center" : ""}`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {unpaidBills.map((bill) => (
                <React.Fragment key={bill.id}>
                  {bill.orders.map((order, index) => (
                    <tr key={index}>
                      {index === 0 && (
                        <td rowSpan={bill.orders.length} className="px-2 py-1 ">
                          {bill.tanggal_nota}
                        </td>
                      )}
                      <td className="px-2 py-1">{order.nama_produk}</td>
                      <td className="px-2 py-1 text-center">{order.qty}</td>
                      <td className="px-2 py-1 text-center">
                        Rp. {order.harga_produk.toLocaleString()}
                      </td>
                      <td className="px-2 py-1 text-center">
                        Rp. {order.total_harga.toLocaleString()}
                      </td>
                      <td className="px-2 py-1 text-center">-</td>
                      <td className="px-2 py-1 text-center">-</td>
                    </tr>
                  ))}
                  <tr className="border-y-2 border-slate-900 font-semibold">
                    <td colSpan={4} className="px-2 py-1"></td>
                    <td className="px-2 py-1 bg-custom-white-2 text-center">
                      Rp. {bill.total_pesanan.toLocaleString()}
                    </td>
                    <td className="px-2 py-1 bg-custom-white-2 text-center">
                      Rp. {bill.total_dibayar.toLocaleString()}
                    </td>
                    <td className="px-2 py-1 bg-custom-white-2 text-center">
                      Rp.{" "}
                      {(
                        bill.total_pesanan - bill.total_dibayar
                      ).toLocaleString()}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
              <tr>
                <td
                  colSpan={4}
                  className="px-2 py-1 font-semibold text-left bg-custom-white-2"
                >
                  Total
                </td>
                <td className="px-2 py-1 bg-custom-white-2 font-semibold text-center">
                  Rp. {totalAmount.toLocaleString()}
                </td>
                <td className="px-2 py-1 bg-custom-white-2 font-semibold text-center">
                  Rp. {totalPaid.toLocaleString()}
                </td>
                <td className="px-2 py-1 bg-custom-white-2 font-semibold text-center">
                  Rp. {totalBalance.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-2 text-slate-900 text-xs flex justify-between">
          <div>
            <p className="">Pembayaran dapat dilakukan melalui rekening :</p>
            <div className="grid grid-cols-2 mt-2 gap-y-1 ">
              <p>Bank</p>
              <p>: BCA</p>
              <p>No. Rekening</p>
              <p>: 2028388999</p>
              <p>Atas Nama</p>
              <p>: LIEFIA</p>
            </div>
            <p className="mt-2 ">
              Demikian, atas perhatiannya disampaikan terimakasih
            </p>
          </div>
          <div className="h-24 text-xs text-slate-900 flex flex-col justify-between items-center ">
            <div className="flex flex-col items-center">
              <p>Hormat Kami</p>
              <p>UD TIMUR JAYA</p>
            </div>
            <p>( LIFIA )</p>
          </div>
        </div>
        <div className="mt-4 text-slate-900 flex flex-col justify-between w-1/5 h-24 mx-2 text-xs ">
          <p>Penerima</p>
          <div className="border-b-2 border-slate-900 w-full" />
        </div>
      </div>
      <div className="flex justify-start my-3 mx-4 ">
        <button
          onClick={handlePrint}
          className="bg-white text-slate-900 px-2 py-1 rounded-md flex items-center justify-center border-2 border-slate-900"
        >
          <GoDownload className="mr-2 " />
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default InvoiceExport;
