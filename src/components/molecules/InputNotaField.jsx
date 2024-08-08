import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function InputNotaField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  isModal,
  isReadOnly = false,
}) {
  const [formattedValue, setFormattedValue] = useState(value);

  useEffect(() => {
    if (type === "number") {
      setFormattedValue(formatNumber(value.toString()));
    } else {
      setFormattedValue(value);
    }
  }, [value, type]);

  const handleChange = (e) => {
    let val = e.target.value;

    if (type === "number") {
      const rawValue = val.replace(/\./g, "");
      if (!isNaN(rawValue)) {
        setFormattedValue(formatNumber(rawValue));
        onChange({
          target: {
            name: name,
            value: rawValue,
          },
        });
      }
    } else {
      setFormattedValue(val);
      onChange(e);
    }
  };

  const formatNumber = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className={`input-field text-[10px] lg:text-xs ${isModal ? "modal-input" : ""}`}>
      <label className="mb-1 text-slate-900">{label}</label>
      <input
        name={name}
        type="text"
        placeholder={placeholder}
        value={formattedValue}
        onChange={handleChange}
        className="px-[10px] py-[7px] border rounded-lg border-slate-400 focus:outline-none focus:ring-2 focus:ring-custom-green-1 text-slate-400 font-medium w-full h-9"
        required
        readOnly={isReadOnly}
      />
    </div>
  );
}

InputNotaField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  isModal: PropTypes.bool,
  isReadOnly: PropTypes.bool,
};
