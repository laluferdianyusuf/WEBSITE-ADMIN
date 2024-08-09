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

  console.log(unpaidBills);

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
  console.log(hotel);

  return (
    <div>
      <div ref={componentRef} className="p-4 bg-white rounded-md">
        <div className="mb-7">
          <div className="flex justify-between text-slate-9000 mt-2">
            <div className="flex flex-col gap-[6px]">
              <h3 className="text-[26px] font-semibold">UD TIMUR JAYA RAYA</h3>
              <p>Jl. Gareng No. 28 Cakranegara</p>
              <p>HP. 081907647590</p>
              <p>Fax. 0370-633668</p>
            </div>
            <div className="flex flex-col gap-[6px]">
              <h4 className="text-xl font-semibold">INVOICE</h4>
              <div className="grid grid-cols-2">
                <p>Invoice No</p>
                <p>: ..../..../{currentYear}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Tanggal</p>
                <p>: {date}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Kepada</p>
                <p>: {hotel.nama_hotel}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-md border border-custom-white-2 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header}
                    className="bg-custom-blue-1 px-8 py-4 text-left"
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
                        <td rowSpan={bill.orders.length} className="px-8 py-4">
                          {bill.tanggal_nota}
                        </td>
                      )}
                      <td className="px-8 py-4">{order.nama_produk}</td>
                      <td className="px-8 py-4">{order.qty}</td>
                      <td className="px-8 py-4">
                        Rp. {order.harga_produk.toLocaleString()}
                      </td>
                      <td className="px-8 py-4">
                        Rp. {order.total_harga.toLocaleString()}
                      </td>
                      <td className="px-8 py-4">-</td>
                      <td className="px-8 py-4">-</td>
                    </tr>
                  ))}
                  <tr className="border-y border-gray-300">
                    <td colSpan={4} className="px-8 py-4"></td>
                    <td className="px-8 py-4 bg-custom-white-2">
                      Rp. {bill.total_pesanan.toLocaleString()}
                    </td>
                    <td className="px-8 py-4 bg-custom-white-2">
                      Rp. {bill.total_dibayar.toLocaleString()}
                    </td>
                    <td className="px-8 py-4 bg-custom-white-2">
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
                  className="px-8 py-4 font-semibold text-left bg-custom-white-2"
                >
                  Total
                </td>
                <td className="px-8 py-4 bg-custom-white-2 font-semibold">
                  Rp. {totalAmount.toLocaleString()}
                </td>
                <td className="px-8 py-4 bg-custom-white-2 font-semibold">
                  Rp. {totalPaid.toLocaleString()}
                </td>
                <td className="px-8 py-4 bg-custom-white-2 font-semibold">
                  Rp. {totalBalance.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-start my-6 mx-4">
        <button
          onClick={handlePrint}
          className="bg-white text-slate-900 px-4 py-2 rounded-md flex items-center justify-center border border-slate-400"
        >
          <GoDownload className="mr-2" />
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default InvoiceExport;
