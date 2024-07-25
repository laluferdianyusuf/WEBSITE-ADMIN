import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import password from "/icons/password.svg";

export default function Input({
  type,
  placeholder,
  value,
  onChange,
  name,
  isDisabled = false,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formatNumber = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  useEffect(() => {
    if (type === "number" && onChange) {
      setDisplayValue(formatNumber(value.toString()));
    } else {
      setDisplayValue(value);
    }
  }, [value, type, onChange]);

  const handleChange = (e) => {
    let val = e.target.value;

    if (type === "number") {
      const rawValue = val.replace(/\./g, "");
      if (!isNaN(rawValue)) {
        setDisplayValue(formatNumber(rawValue));
        onChange({
          target: {
            name: name,
            value: rawValue,
          },
        });
      }
    } else {
      setDisplayValue(val);
      onChange(e);
    }
  };

  return (
    <div className="relative">
      <input
        type={showPassword && type === "password" ? "text" : "text"}
        placeholder={placeholder}
        value={displayValue}
        onChange={handleChange}
        name={name}
        className="px-[10px] py-[7px] border rounded-lg border-slate-400 focus:outline-none focus:ring-2 focus:ring-custom-green-1 text-slate-400 text-xs font-medium w-full"
        disabled={isDisabled}
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
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
};
