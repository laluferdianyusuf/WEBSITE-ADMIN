import PropTypes from "prop-types";
import TableRow from "../atoms/TableRow";

export default function TableHeader({ headers }) {
  return (
    <thead className="bg-gray-200">
      <TableRow rowData={headers} isHeader={true} />
    </thead>
  );
}

TableHeader.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
};
