import PropTypes from "prop-types";
import TableBody from "../molecules/TableBody";
import TableHeader from "../molecules/TableHeader";
import TableFooter from "../molecules/TableFooter";

export default function Table({
  headers,
  data,
  total,
  totalDibayarkan,
  onRowClick,
  isHotelDetail,
  onSort,
  sortOrder,
  sortColumns,
  isExport = false,
}) {
  return (
    <div
      className={`overflow-auto no-scrollbar ${
        isExport ? "" : "rounded-lg"
      } shadow-sm border w-full`}
    >
      <table className="w-full">
        <TableHeader
          headers={headers}
          onSort={onSort}
          sortOrder={sortOrder}
          sortColumns={sortColumns}
          isExport={isExport}
        />
        <TableBody
          data={data}
          columns={headers}
          onRowClick={onRowClick ? onRowClick : null}
          isExport={isExport}
        />
        {(total !== undefined || totalDibayarkan !== undefined) && (
          <TableFooter
            total={total}
            colSpan={headers.length}
            totalDibayarkan={totalDibayarkan}
            isHotelDetail={isHotelDetail}
            isExport={isExport}
          />
        )}
      </table>
    </div>
  );
}

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  total: PropTypes.number,
  totalDibayarkan: PropTypes.number,
  onRowClick: PropTypes.func,
  isHotelDetail: PropTypes.bool,
};
