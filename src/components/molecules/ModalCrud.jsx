import PropTypes from "prop-types";
import Modal from "./Modal";
import InputField from "./InputField";

export default function ModalCrud({
  title,
  functionCancel,
  functionOk,
  textCancel,
  textOk,
  inputValue,
  onChange,
  inputName,
  inputPlaceholder,
  inputType,
  inputLabel,
  isOpen,
  isDisabled,
  isLoading,
  isCustomer,
  inputValue2,
  onChange2,
  inputName2,
  inputPlaceholder2,
  inputType2,
  inputLabel2,
  isDisabled2,
}) {
  return (
    <Modal
      isLoading={isLoading}
      isOpen={isOpen}
      title={title}
      functionCancel={functionCancel}
      functionOk={functionOk}
      textCancel={textCancel}
      textOk={textOk}
    >
      <InputField
        value={inputValue}
        onChange={onChange}
        name={inputName}
        placeholder={inputPlaceholder}
        type={inputType}
        label={inputLabel}
        isModal={true}
        isDisabled={isDisabled}
      />
      {isCustomer && (
        <InputField
          value={inputValue2}
          onChange={onChange2}
          name={inputName2}
          placeholder={inputPlaceholder2}
          type={inputType2}
          label={inputLabel2}
          isModal={true}
          isDisabled={isDisabled2}
        />
      )}
    </Modal>
  );
}

ModalCrud.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  functionCancel: PropTypes.func,
  functionOk: PropTypes.func,
  textCancel: PropTypes.string,
  textOk: PropTypes.string,
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  inputName: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  inputType: PropTypes.string,
  inputLabel: PropTypes.string,
  isDisabled: PropTypes.bool,
};
