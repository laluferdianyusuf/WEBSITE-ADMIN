import PropTypes from "prop-types";

export default function TableFooter({ total, colSpan }) {
  return (
    <tfoot>
      <tr className="bg-custom-white-2 font-semibold text-slate-900 text-left text-xs">
        <td 
          colSpan={1}
          className="border-t-0 px-4 py-4"
        >
          Total
        </td>
        {colSpan > 2 && (
          <td
            colSpan={colSpan - 2}
            className="border-t-0 px-4 py-4"
          ></td>
        )}
        <td
          colSpan={1}
          className="border-t-0 px-4 py-4"
        >
          Rp. {total.toLocaleString()}
        </td>
      </tr>
    </tfoot>
  );
}

TableFooter.propTypes = {
  total: PropTypes.number.isRequired,
  colSpan: PropTypes.number.isRequired,
};
