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
  isModal = false,
  isDisabled,
}) {
  return (
    <Label label={label} isModal={isModal}>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        isDisabled={isDisabled}
      />
    </Label>
  );
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  isModal: PropTypes.bool,
  isDisabled: PropTypes.bool,
};
