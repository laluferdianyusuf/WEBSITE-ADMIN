import PropTypes from "prop-types";

export default function TableCell({
  children,
  isHeader = false,
  index,
  data,
  isExport = false,
}) {
  const formatNumber = (number) => {
    if (number === 0) return "Rp. 0";
    return number ? `Rp. ${number.toLocaleString()}` : "-";
  };

  return isHeader ? (
    <th
      className={`text-left text-slate-900 text-[10px] lg:text-xs relative ${
        data === "Tanggal" ? "flex items-center justify-between" : ""
      }
        ${isExport ? "font-semibold px-2 py-1" : "px-2 py-4 lg:px-4 lg:py-4"}
        `}
    >
      {children || "-"}
    </th>
  ) : (
    <td
      className={`text-[10px] lg:text-xs ${
        children[0] === "Belum Lunas" ? "text-red-500" : ""
      } ${children[0] === "Lunas" ? "text-green-500" : ""}
        ${isExport ? "font-medium px-2" : "px-2 py-4 lg:px-4 lg:py-4"}`}
    >
      {typeof children[0] === "number" && index !== 0
        ? formatNumber(children[0])
        : children[0] || "-"}
    </td>
  );
}

TableCell.propTypes = {
  children: PropTypes.node,
  isHeader: PropTypes.bool,
  index: PropTypes.number,
};
