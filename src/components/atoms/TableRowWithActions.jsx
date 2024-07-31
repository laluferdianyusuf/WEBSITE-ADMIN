import ActionButton from "./ActionButton";
import PropTypes from "prop-types";
import { GoTrash } from "react-icons/go";
import { FiEdit2 } from "react-icons/fi";

export default function TableRowWithAction({
  data,
  onUpdate,
  onDelete,
  index,
  onRowClick = null,
}) {
  const rowClass = index % 2 === 0 ? " bg-white" : "bg-custom-blue-1";
  return (
    <tr className={`${rowClass}`}>
      {Object.values(data).map((item, idx) => (
        <td
          key={idx}
          className={`w-full px-4 py-3 ${
            onRowClick ? "cursor-pointer hover:bg-gray-200" : ""
          }`}
          onClick={onRowClick ? onRowClick : null}
        >
          {item}
        </td>
      ))}
      <td className="px-4 py-3">
        <div className="flex gap-2 items-center">
          <ActionButton onClick={onUpdate}>
            <FiEdit2 className="mr-[6px]" size={16} />
            <p className="text-slate-900 font-semibold text-xs">Edit</p>
          </ActionButton>
          <ActionButton onClick={onDelete}>
            <GoTrash className="mr-[6px]" size={16} />
            <p className="text-slate-900 font-semibold text-xs">Hapus</p>
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
  index: PropTypes.number.isRequired,
  onRowClick: PropTypes.func,
};
