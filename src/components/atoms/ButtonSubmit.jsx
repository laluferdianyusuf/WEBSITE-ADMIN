import PropTypes from "prop-types";

export default function ButtonSubmit({
  text,
  onClick,
  backgroundColor = "white",
}) {
  return (
    <button
      type="submit"
      className={`border-slate-400 font-medium text-white text-xs border px-8 py-2 rounded-lg mt-8 ${backgroundColor}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

ButtonSubmit.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};
