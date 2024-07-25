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
  isDisabled
}) {
  return (
    <Modal
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
  inputValue: PropTypes.string,
  onChange: PropTypes.func,
  inputName: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  inputType: PropTypes.string,
  inputLabel: PropTypes.string,
  isDisabled: PropTypes.bool
};
