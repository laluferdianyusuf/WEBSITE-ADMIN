import PropTypes from "prop-types";

export default function TableFooter({
  total,
  colSpan,
  totalDibayarkan,
  isHotelDetail = false,
  isExport = false,
}) {
  console.log(totalDibayarkan);
  return (
    <tfoot>
      <tr
        className={`bg-custom-white-2 text-slate-900 text-left text-xs ${
          isExport ? "font-extrabold" : "font-semibold"
        }`}
      >
        <td
          colSpan={`${isHotelDetail ? colSpan : 1}`}
          className={`border-t-0 ${isExport ? "px-2 py-1" : "px-4 py-4"}`}
        >
          Total
        </td>
        {!isHotelDetail && colSpan > 2 && (
          <>
            <td
              colSpan={colSpan - 2}
              className={`border-t-0 ${isExport ? "px-2" : "px-4 py-4"}`}
            ></td>
            <td
              colSpan={1}
              className={`border-t-0 ${isExport ? "px-2 py-1" : "px-4 py-4"}`}
            >
              Rp. {total.toLocaleString()}
            </td>
          </>
        )}
        {isHotelDetail && (
          <>
            <td
              colSpan={1}
              className={`border-t-0 ${isExport ? "px-2" : "px-4 py-4"}`}
            >
              Rp. {total.toLocaleString()}
            </td>
            <td
              colSpan={1}
              className={`border-t-0 ${isExport ? "px-2" : "px-4 py-4"}`}
            >
              {totalDibayarkan !== undefined
                ? `Rp. ${totalDibayarkan.toLocaleString()}`
                : ""}
            </td>
          </>
        )}
      </tr>
    </tfoot>
  );
}

TableFooter.propTypes = {
  total: PropTypes.number.isRequired,
  isHotelDetail: PropTypes.bool,
  totalDibayarkan: PropTypes.number,
};
