import PropTypes from "prop-types";
import TableRow from "../atoms/TableRow";

export default function TableBody({ data, columns, onRowClick }) {
  return (
    <tbody>
      {data.map((row, index) => (
        <TableRow
          key={index}
          rowData={columns.map((column) => row[column])}
          index={index}
          onRowClick={() => (onRowClick ? onRowClick(row) : null)}
        />
      ))}
    </tbody>
  );
}

TableBody.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRowClick: PropTypes.func.isRequired,
};
