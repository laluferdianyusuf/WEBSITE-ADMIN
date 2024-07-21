import PropTypes from "prop-types";
import TableCell from "./TableCell";

export default function TableRow({ rowData, isHeader = false, index }) {
  const rowClass = index % 2 === 0 ? "bg-white" : "bg-custom-blue-1";
  return (
    <tr className={`${rowClass}`}>
      {rowData.map((data, index) => (
        <TableCell key={index} isHeader={isHeader}>
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
};
