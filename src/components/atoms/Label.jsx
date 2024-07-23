import PropTypes from "prop-types";
export default function Label({ label, children, isModal }) {
  return (
    <div className="flex flex-col">
      <label
        className={`mb-1 text-slate-900 ${isModal ? "text-xs" : "text-base"}`}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

Label.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isModal: PropTypes.bool,
};
