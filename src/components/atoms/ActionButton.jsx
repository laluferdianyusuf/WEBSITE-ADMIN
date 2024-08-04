import PropTypes from "prop-types";

export default function ActionButton({
  backgroundColor = "bg-white",
  children,
  onClick,
  isDisabled = false,
}) {
  return (
    <button
      className={`border w-fit px-2 py-2 rounded-lg ${backgroundColor} flex items-center justify-center ${
        isDisabled ? "cursor-not-allowed border-slate-400 text-slate-400" : "cursor-pointer border-slate-900 text-slate-900"
      }`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}

ActionButton.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};
