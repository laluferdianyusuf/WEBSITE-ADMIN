import PropTypes from "prop-types";

export default function TableCell({ children, isHeader = false, index }) {
  const formatNumber = (number) => {
    if (number === 0) return "Rp. 0";
    return number ? `Rp. ${number.toLocaleString()}` : "-";
  };

  return isHeader ? (
    <th className="p-4 text-left text-slate-900 text-xs">{children || "-"}</th>
  ) : (
    <td className={`text-xs p-4`}>
      {typeof children === "number" && index !== 0
        ? formatNumber(children)
        : children || "-"}
    </td>
  );
}

TableCell.propTypes = {
  children: PropTypes.node,
  isHeader: PropTypes.bool,
};
