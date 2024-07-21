import Input from "../atoms/Input";
import Label from "../atoms/Label";
import PropTypes from "prop-types";
export default function InputField({
  label,
  type,
  placeholder,
  value,
  onChange,
  name,
}) {
  return (
    <div className="mb-4">
      <Label label={label}>
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
        />
      </Label>
    </div>
  );
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
