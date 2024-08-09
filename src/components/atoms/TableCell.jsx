import PropTypes from "prop-types";

export default function TableCell({ children, isHeader = false, index, data }) {
  const formatNumber = (number) => {
    if (number === 0) return "Rp. 0";
    return number ? `Rp. ${number.toLocaleString()}` : "-";
  };

  return isHeader ? (
    <th
      className={`p-4 text-left text-slate-900 text-xs relative ${
        data === "Tanggal" ? "flex items-center justify-between" : ""
      }`}
    >
      {children || "-"}
    </th>
  ) : (
    <td
      className={`text-xs p-4 ${
        children === "Belum Lunas" ? "text-red-500" : ""
      } ${children === "Lunas" ? "text-green-500" : ""}`}
    >
      {typeof children === "number" && index !== 0
        ? formatNumber(children)
        : children || "-"}
    </td>
  );
}

TableCell.propTypes = {
  children: PropTypes.node,
  isHeader: PropTypes.bool,
  index: PropTypes.number,
};
