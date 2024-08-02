import PropTypes from "prop-types";
import TableRowWithActions from "../atoms/TableRowWithActions";

export default function TableWithActions({
  headers,
  data,
  onUpdate,
  onDelete,
  onRowClick = null,
}) {
  return (
    <div className="overflow-auto no-scrollbar border border-slate-200 rounded-lg shadow-sm w-full text-xs">
      <table className="w-full">
        <thead className="bg-custom-blue-1">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="border-b-0 border-slate-400 px-4 py-4 text-left bg-custom-blue-1"
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
              onRowClick={onRowClick ? () => onRowClick(row) : null}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

TableWithActions.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onRowClick: PropTypes.func,
};
