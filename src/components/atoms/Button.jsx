import PropTypes from "prop-types";
export default function Button({
  backgroundColor = "bg-white",
  text,
  onClick,
  type = "button",
  isDisabled = false,
}) {
  return (
    <button
      className={`border-slate-400 border w-fit px-8 py-2 rounded-lg ${backgroundColor} ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
    >
      <p className="text-slate-900 text-xs">{text}</p>
    </button>
  );
}

Button.propTypes = {
  backgroundColor: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
};
