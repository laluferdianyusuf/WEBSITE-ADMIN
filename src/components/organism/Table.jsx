import PropTypes from "prop-types";
import TableBody from "../molecules/TableBody";
import TableHeader from "../molecules/TableHeader";
import TableFooter from "../molecules/TableFooter";

// eslint-disable-next-line no-unused-vars
export default function Table({ headers, data, total, sisa }) {
  return (
    <table className="border shadow-md border-slate-200 rounded-lg w-full">
      <TableHeader headers={headers} />
      <TableBody data={data} columns={headers} />
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
};
