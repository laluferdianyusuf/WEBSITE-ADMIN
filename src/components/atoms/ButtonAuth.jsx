import PropTypes from "prop-types";

export default function ButtonAuth({ children, handle, isLogin = false }) {
  return (
    <button
      type="submit"
      className={`
        ${isLogin ? "hover:border-custom-green-1 hover:text-custom-green-1" : "hover:border-red-500 hover:text-red-500"}
        rounded-[12px] ${
          isLogin ? "justify-center gap-2" : "flex-row-reverse justify-between"
        } flex  items-center w-full bg-transparent text-slate-100 border border-custom-white-1 text-[14px] px-3 py-1.5`}
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
