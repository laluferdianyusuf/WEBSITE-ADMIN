/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import SearchBar from "../atoms/SearchBar";
import ActionButton from "../atoms/ActionButton";
import { GrAddCircle } from "react-icons/gr";
import TableWithActions from "../organism/TableWithActions";

const tableHeaders3 = ["No", "Nama Hotel", "Actions"];

const tableDataActions = [
  ["1", "Hotel Indonesia"],
  ["2", "Hotel Bali"],
  ["3", "Hotel Lombok"],
  ["4", "Hotel Surabaya"],
  ["5", "Hotel Bandung"],
];

const handleUpdate = (row) => {
  alert(`Update clicked for: ${row[1]}`);
};

const handleDelete = (row) => {
  alert(`Delete clicked for: ${row[1]}`);
};

export default function Hotel() {
  return (
    <div className="overflow-auto px-9 py-6 h-[93vh] bg-custom-white-1 mt-5 mr-5 ml-5 rounded-lg flex flex-col gap-6">
      <div>
        <h3 className="font-semibold text-xl mb-1">Manajemen Hotel</h3>
        <p className="text-xs text-slate-500">
          Terakhir di Update 1 Jam 24 Menit yang lalu
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="w-1/3">
          <SearchBar
            onSearch={(e) => console.log(e.target.value)}
            placeholder="Cari dari total 6 data..."
          />
        </div>
        <ActionButton onClick={() => alert("Add button clicked")}>
          <GrAddCircle className="mr-[6px]" size={16} />
          <p className="text-slate-900 font-semibold text-xs">Tambah Hotel</p>
        </ActionButton>
      </div>
      <TableWithActions
        headers={tableHeaders3}
        data={tableDataActions}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}
