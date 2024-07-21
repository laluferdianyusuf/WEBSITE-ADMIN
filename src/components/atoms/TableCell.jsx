import PropTypes from "prop-types";

export default function TableCell({ children, isHeader = false }) {
  const formatNumber = (number) => {
    if (number === 0) return "Rp. 0";
    return number ? `Rp. ${number.toLocaleString()}` : "-";
  };

  const getStatusClass = (status) => {
    if (status === "Lunas") return "text-green-500";
    if (status === "Belum Lunas") return "text-red-500";
    return "";
  };

  return isHeader ? (
    <th className="border-b-0 border-slate-400 px-4 py-2 text-left">
      {children || "-"}
    </th>
  ) : (
    <td
      className={`border-b border-t-0 border-slate-400 px-4 py-2 ${
        typeof children === "string" ? getStatusClass(children) : ""
      }`}
    >
      {typeof children === "number" ? formatNumber(children) : children || "-"}
    </td>
  );
}

TableCell.propTypes = {
  children: PropTypes.node,
  isHeader: PropTypes.bool,
};
