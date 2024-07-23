import PropTypes from "prop-types";

export default function TableFooter({ total, colSpan, text }) {
  return (
    <tfoot>
      <tr>
        <td
          colSpan={colSpan}
          className="border-b border-t-0 border-slate-400 px-4 py-2 text-center font-semibold text-slate-900"
        >
          {text} : Rp. {total.toLocaleString()}
        </td>
      </tr>
    </tfoot>
  );
}

TableFooter.propTypes = {
  total: PropTypes.number,
  colSpan: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};
