import PropTypes from "prop-types";

export default function ButtonLogout({ children, handle }) {
  return (
    <button
      type="submit"
      className={
        "p-2 rounded-[12px] flex flex-row-reverse justify-between items-center w-full bg-transparent text-white font-bold border border-custom-white-1 text-[14px] px-3"
      }
      onClick={handle}
    >
      {children}
    </button>
  );
}

ButtonLogout.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
