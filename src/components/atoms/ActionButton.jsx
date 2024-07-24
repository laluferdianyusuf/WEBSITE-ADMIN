import PropTypes from "prop-types";

export default function ActionButton({ backgroundColor = "bg-white", children, onClick }) {
  return (
    <button
      className={`border-slate-900 border w-fit px-2 py-2 rounded-lg ${backgroundColor} flex items-center justify-center`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

ActionButton.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};
