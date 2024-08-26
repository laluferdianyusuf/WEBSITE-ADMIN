import PropTypes from "prop-types";
import TableRow from "../atoms/TableRow";

export default function TableHeader({
  headers,
  onSort,
  sortOrder,
  sortColumns,
  isExport
}) {
  return (
    <thead className="bg-gray-200">
      <TableRow
        rowData={headers}
        isHeader={true}
        onSort={onSort}
        sortOrder={sortOrder}
        sortColumns={sortColumns}
        isExport={isExport}
      />
    </thead>
  );
}

TableHeader.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
};
