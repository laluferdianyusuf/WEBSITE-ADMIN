import PropTypes from "prop-types";
import TableBody from "../molecules/TableBody";
import TableHeader from "../molecules/TableHeader";
import TableFooter from "../molecules/TableFooter";

export default function Table({ headers, data, total, sisa, onRowClick }) {

  return (
    <table className="border shadow-md border-slate-200 w-full">
      <TableHeader headers={headers} />
      <TableBody
        data={data}
        columns={headers}
        onRowClick={onRowClick}
      />
      {sisa && total && (
        <TableFooter
          total={sisa}
          colSpan={headers.length}
          text="Sisa Tagihan"
        />
      )}
      {total && (
        <TableFooter
          total={total}
          colSpan={headers.length}
          text="Total Tagihan"
        />
      )}
    </table>
  );
}

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  total: PropTypes.number,
  sisa: PropTypes.number,
  onRowClick: PropTypes.func,
};
