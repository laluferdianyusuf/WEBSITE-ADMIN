import PropTypes from "prop-types";

export default function ButtonAuth({ children, handle, isLogin = false }) {
  return (
    <button
      type="submit"
      className={`
        ${isLogin ? "hover:bg-custom-green-1" : "hover:bg-red-500"}
        p-2 rounded-[12px] flex flex-row-reverse justify-between items-center w-full bg-transparent text-white font-bold border border-custom-white-1 text-[14px] px-3`}
      onClick={handle}
    >
      {children}
    </button>
  );
}

ButtonAuth.propTypes = {
  handle: PropTypes.func,
  children: PropTypes.node.isRequired,
  isLogin: PropTypes.bool,
};
