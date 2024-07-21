import PropTypes from "prop-types";
export default function Button({ backgroundColor, text, onClick }) {
  return (
    <button
      className={`border-slate-400 border w-28 h-9 px-8 py-2 rounded-lg ${backgroundColor}`}
      onClick={onClick}
    >
      <p className="text-slate-900 text-xs">{text}</p>
    </button>
  );
}

Button.propTypes = {
  backgroundColor: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: "white",
};
