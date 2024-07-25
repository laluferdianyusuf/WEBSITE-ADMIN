import ActionButton from "./ActionButton";
import PropTypes from "prop-types";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function TableRowWithAction({
  data,
  onUpdate,
  onDelete,
  index,
  onRowClick,
}) {
  const rowClass = index % 2 === 0 ? " bg-white" : "bg-custom-blue-1";
  return (
    <tr
      className={`${rowClass}`}
    >
      {Object.values(data).map((item, idx) => (
        <td key={idx} className="px-4 py-3 cursor-pointer hover:bg-gray-200" onClick={onRowClick}>
          {item}
        </td>
      ))}
      <td className=" px-4 py-3">
        <div className="flex gap-2 items-center">
          <ActionButton onClick={onUpdate}>
            <FaEdit className="mr-[6px]" size={16} />
            <p className="text-slate-900 font-semibold text-xs">Update</p>
          </ActionButton>
          <ActionButton onClick={onDelete}>
            <FaTrash className="mr-[6px]" size={16} />
            <p className="text-slate-900 font-semibold text-xs">Delete</p>
          </ActionButton>
        </div>
      </td>
    </tr>
  );
}

TableRowWithAction.propTypes = {
  data: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isHeader: PropTypes.bool,
  index: PropTypes.number,
  onRowClick: PropTypes.func,
};
