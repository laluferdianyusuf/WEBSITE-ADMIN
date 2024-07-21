import PropTypes from "prop-types";
import TableBody from "../molecules/TableBody";
import TableHeader from "../molecules/TableHeader";

export default function Table({ headers, data }) {
  return (
    <table className="border shadow-md border-slate-200 rounded-lg">
      <TableHeader headers={headers} />
      <TableBody data={data} columns={headers} />
    </table>
  );
}

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
