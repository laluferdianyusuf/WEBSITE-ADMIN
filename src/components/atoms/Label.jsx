import PropTypes from "prop-types";
export default function Label({ label, children }) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-slate-900 text-base">{label}</label>
      {children}
    </div>
  );
}

Label.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
