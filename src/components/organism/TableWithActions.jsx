import PropTypes from "prop-types";
import TableRowWithActions from "../atoms/TableRowWithActions";

export default function TableWithActions({
  headers,
  data,
  onUpdate,
  onDelete,
}) {
  return (
    <div className="overflow-hidden border border-slate-200 rounded-lg shadow-lg w-full">
      <table className="w-full">
        <thead className="bg-custom-blue-1">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-4 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <TableRowWithActions
              key={index}
              data={row}
              onUpdate={() => onUpdate(row)}
              onDelete={() => onDelete(row)}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

TableWithActions.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
