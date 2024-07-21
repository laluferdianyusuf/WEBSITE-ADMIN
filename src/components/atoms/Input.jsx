import { useState } from "react";
import PropTypes from "prop-types";
import password from "/icons/password.svg";

export default function Input({ type, placeholder, value, onChange, name }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        type={showPassword && type === "password" ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className="px-[10px] py-[7px] border rounded-lg border-slate-400 focus:outline-none focus:ring-2 focus:ring-custom-green-1 text-slate-400 text-xs font-medium w-full"
      />
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-0 top-[0.4rem] px-2"
        >
          <img src={password} alt="show" />
        </button>
      )}
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
