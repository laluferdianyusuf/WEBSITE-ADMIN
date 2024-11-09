import SearchBar from "../atoms/SearchBar";
import ActionButton from "../atoms/ActionButton";
import { GoDownload } from "react-icons/go";
import NoOmzetData from "/icons/tidak-ditemukan-data.svg";
import Table from "../organism/Table";
import Pagination from "../molecules/Pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBillByDate } from "../../redux/slices/billSlice";
import { format } from "date-fns";

export default function Omzet() {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [billsData, setBillsData] = useState([]);
  const [filteredBillsData, setFilteredBillsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 6;

  const handleFetchBill = () => {
    setLoading(true);
    dispatch(getBillByDate({ startDate: startDate, endDate: endDate }))
      .unwrap()
      .then((res) => {
        const bills = res.data.bill;

        const groupedBills = bills.reduce((acc, bill) => {
          if (!acc[bill.hotelId]) acc[bill.hotelId] = [];
          acc[bill.hotelId].push(bill);
          return acc;
        }, {});

        const billsWithOrder = [];
        for (const hotelId in groupedBills) {
          groupedBills[hotelId].forEach((bill, index) => {
            billsWithOrder.push({
              ...bill,
              notaKe: index,
            });
          });
        }

        setBillsData(billsWithOrder);
        setFilteredBillsData(billsWithOrder);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bills:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    handleFetchBill();
  }, [startDate, endDate]);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, billsData]);

  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filteredData = billsData.filter(
      (bill) =>
        bill.number?.toLowerCase().includes(lowercasedQuery) ||
        bill.hotel?.hotelName.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredBillsData(filteredData);
  };

  const tableHeaders = [
    "Nomor",
    "Customer",
    "No. Nota",
    "Nota Ke-",
    "Keterangan",
    "Jumlah",
    "Terbayarkan",
  ];
  const sortedBillsData = filteredBillsData.sort((a, b) => {
    const numA = a.number ? parseInt(a.number.split("-")[1]) : Infinity;
    const numB = b.number ? parseInt(b.number.split("-")[1]) : Infinity;
    return numA - numB;
  });

  const tableData = sortedBillsData.map((bill, index) => ({
    Nomor: index + 1,
    Customer: bill?.hotel?.hotelName,
    "No. Nota": bill.number || "-",
    "Nota Ke-": String(bill.notaKe),
    Tanggal: format(new Date(bill.date), "dd-MM-yyyy"),
    Keterangan: "-",
    Jumlah: bill?.ordersTotal,
    Terbayarkan: bill?.totalPaid,
  }));

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
      tableData: tableData,
      totalJumlah,
      totalTerbayarkan,
      startDate: startDate,
      endDate: endDate,
    };
    const stateString = encodeURIComponent(JSON.stringify(state));
    window.open(
      `/#/omzetexport?state=${stateString}`,
      "_blank",
      `noopener,noreferrer`
    );
    console.log(stateString);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };
  const getLastUpdateTime = (data) => {
    if (!data || data.length === 0) return null;

    const sortedData = [...data].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );

    return sortedData[0].updatedAt;
  };

  const lastUpdated = getLastUpdateTime(billsData);
  const now = new Date();
  const timeDifference = lastUpdated
    ? Math.floor((now - new Date(lastUpdated)) / 1000)
    : null;

  let timeSinceUpdate = "Tidak ada data";
  if (timeDifference !== null) {
    const days = Math.floor(timeDifference / 86400);
    const hours = Math.floor((timeDifference % 86400) / 3600);
    const minutes = Math.floor((timeDifference % 3600) / 60);
    const seconds = timeDifference % 60;

    if (days > 0) {
      timeSinceUpdate = `${days} hari, ${hours} jam yang lalu`;
    } else if (hours > 0) {
      timeSinceUpdate = `${hours} jam, ${minutes} menit yang lalu`;
    } else if (minutes > 0) {
      timeSinceUpdate = `${minutes} menit yang lalu`;
    } else {
      timeSinceUpdate = `${seconds} detik yang lalu`;
    }
  }

  return (
    <div className="overflow-auto px-9 py-6 h-[93vh] bg-custom-white-1 mt-5 mr-5 ml-5 rounded-lg flex flex-col gap-5 relative">
      <div>
        <h3 className="font-semibold text-xl mb-1">Manajemen Omzet</h3>
      </div>
      <div className="flex justify-between items-center">
        <div className="w-1/3">
          <SearchBar
            onSearch={(query) => {
              setSearchQuery(query);
            }}
            placeholder={`Cari dari total ${billsData.length} data`}
          />
        </div>
        <div className="flex gap-5 items-center">
          <input
            type="date"
            className="px-[10px] py-[7px] border rounded-lg border-slate-900 focus:outline-none focus:ring-2 focus:ring-custom-green-1 text-slate-900 font-medium h-9 text-xs"
            max={new Date().toISOString().split("T")[0]}
            value={startDate}
            onChange={handleStartDateChange}
            required
          />
          <p className="text-slate-900">s/d</p>
          <input
            type="date"
            className="px-[10px] py-[7px] border rounded-lg border-slate-900 focus:outline-none focus:ring-2 focus:ring-custom-green-1 text-slate-900 font-medium h-9 text-xs"
            max={new Date().toISOString().split("T")[0]}
            value={endDate}
            onChange={handleEndDateChange}
            required
          />
          <ActionButton onClick={handleExportClick}>
            <GoDownload className="mr-[6px]" size={16} />
            <p className="text-slate-900 font-semibold text-xs">
              Download Rincian Penjualan
            </p>
          </ActionButton>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : filteredBillsData.length > 0 ? (
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
      {/* <div>
        <p className="text-xs text-end">
          Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{" "}
          {Math.min(currentPage * itemsPerPage, filteredBillsData.length)} dari
          total {filteredBillsData.length} data
        </p>
        <Pagination
          totalItems={filteredBillsData.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div> */}
    </div>
  );
}
