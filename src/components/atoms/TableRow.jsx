import PropTypes from "prop-types";
import TableCell from "./TableCell";
import { HiArrowLongUp, HiArrowLongDown } from "react-icons/hi2";

export default function TableRow({
  rowData,
  isHeader = false,
  index,
  onRowClick,
  onSort,
  sortOrder,
  sortColumns,
}) {
  const rowClass = index % 2 === 0 ? "bg-white" : "bg-gray-100";

  const handleSortClick = () => {
    if (onSort) {
      onSort();
    }
  };

  const renderSortArrow = (column) => {
    if (column === sortColumns) {
      return (
        <>
          <HiArrowLongUp
            size={15}
            className={`${
              sortOrder === "asc" ? "text-custom-green-1" : "text-gray-400/50"
            } absolute right-[0.3rem] `}
          />
          <HiArrowLongDown
            size={15}
            className={`${
              sortOrder === "desc" ? "text-custom-green-1" : "text-gray-400/50"
            } absolute right-0`}
          />
        </>
      );
    }
    return null;
  };

  return (
    <tr
      className={`${rowClass} ${
        onRowClick ? "cursor-pointer hover:bg-gray-200" : ""
      } ${isHeader ? "cursor-text" : "cursor-pointer"}`}
      onClick={onRowClick}
    >
      {rowData.map((data, cellIndex) => (
        <TableCell
          key={cellIndex}
          isHeader={isHeader}
          index={cellIndex}
          data={data}
        >
          {data}
          {isHeader && data === "Tanggal" && (
            <button
              onClick={handleSortClick}
              className="flex items-center ml-2 relative"
            >
              {renderSortArrow(data)}
            </button>
          )}
        </TableCell>
      ))}
    </tr>
  );
}

TableRow.propTypes = {
  rowData: PropTypes.arrayOf(PropTypes.node).isRequired,
  isHeader: PropTypes.bool,
  index: PropTypes.number,
  onRowClick: PropTypes.func,
  onSort: PropTypes.func,
};
