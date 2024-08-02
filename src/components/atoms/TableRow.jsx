import PropTypes from "prop-types";
import TableCell from "./TableCell";

export default function TableRow({
  rowData,
  isHeader = false,
  index,
  onRowClick,
}) {
  const rowClass = index % 2 === 0 ? "bg-white" : "bg-gray-100";
  return (
    <tr
      className={`${rowClass} ${
        onRowClick ? "cursor-pointer hover:bg-gray-200" : ""
      }`}
      onClick={onRowClick}
    >
      {rowData.map((data, cellIndex) => (
        <TableCell key={cellIndex} isHeader={isHeader} index={cellIndex}>
          {data}
        </TableCell>
      ))}
    </tr>
  );
}

TableRow.propTypes = {
  rowData: PropTypes.arrayOf(PropTypes.node).isRequired,
  isHeader: PropTypes.bool,
  index: PropTypes.number,
  onRowClick: PropTypes.func.isRequired,
};
