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

  // const [payment, setPayment] = useState(0);

  // const allocatePayment = (totalPayment) => {
  //   const hotel = hotels[0];
  //   let remainingPayment = totalPayment;
  //   hotel.bills.forEach((bill) => {
  //     if (remainingPayment > 0) {
  //       const remainingBill = bill.total_pesanan - bill.total_dibayar;
  //       if (remainingPayment >= remainingBill) {
  //         bill.total_dibayar += remainingBill;
  //         remainingPayment -= remainingBill;
  //       } else {
  //         bill.total_dibayar += remainingPayment;
  //         remainingPayment = 0;
  //       }
  //     }
  //   });
  // };

  // const handlePayment = () => {
  //   allocatePayment(payment);
  //   setPayment(0); // Reset input pembayaran setelah alokasi
  // };

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

  const { totalAmount, totalPaid, totalBalance } = calculateTotals();

  return (
    <div>
      <div ref={componentRef} className="p-4 bg-white rounded-md">
        <div className="mb-7">
          <div className="flex justify-between text-slate-900 mb-1 font-semibold">
            <h3 className="text-[26px]">UD TIMUR JAYA RAYA</h3>
            <h4 className="text-xl">INVOICE</h4>
          </div>
          <div className="flex justify-between text-slate-900 mt-2">
            <div className="flex flex-col gap-[6px]">
              <p>Alamat: Jl. Contoh No.123, Kota ABC</p>
              <p>No HP: 081234567890</p>
              <p>Fax: 021-987654</p>
            </div>
            <div className="flex flex-col gap-[6px]">
              <p>Invoice No: </p>
              <p>Tanggal: {date}</p>
              <p>Kepada: {hotel.nama_hotel}</p>
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
                        {order.harga_produk.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </td>
                      <td className="px-8 py-4">
                        {order.total_harga.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </td>
                      <td className="px-8 py-4">-</td>
                      <td className="px-8 py-4">-</td>
                    </tr>
                  ))}
                  <tr className="border-y border-gray-300">
                    <td colSpan={4} className="px-8 py-4"></td>
                    <td className="px-8 py-4 bg-custom-white-2">
                      {bill.total_pesanan.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                    <td className="px-8 py-4 bg-custom-white-2">
                      {bill.total_dibayar.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                    <td className="px-8 py-4 bg-custom-white-2">
                      {(bill.total_pesanan - bill.total_dibayar).toLocaleString(
                        "id-ID",
                        {
                          style: "currency",
                          currency: "IDR",
                        }
                      )}
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
                  {totalAmount.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </td>
                <td className="px-8 py-4 bg-custom-white-2 font-semibold">
                  {totalPaid.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </td>
                <td className="px-8 py-4 bg-custom-white-2 font-semibold">
                  {totalBalance.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
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
      {/* <input
          type="number"
          value={payment}
          onChange={(e) => setPayment(Number(e.target.value))}
          className="border border-gray-300 px-2 py-1 rounded-md mr-2"
          placeholder="Masukkan jumlah pembayaran"
        /> */}
      {/* <button
          onClick={handlePayment}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
        >
          Alokasikan Pembayaran
        </button> */}
    </div>
  );
};

export default InvoiceExport;
