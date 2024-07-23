import PropTypes from "prop-types";
import TableRowWithActions from "../atoms/TableRowWithActions";
export default function TableWithActions({
  headers,
  data,
  onUpdate,
  onDelete,
}) {
  return (
    <table className="border shadow-md border-slate-200 rounded-lg w-full">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className="border-b-0 border-slate-400 px-4 py-2 text-left bg-custom-blue-1"
            >
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
  );
}

TableWithActions.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
