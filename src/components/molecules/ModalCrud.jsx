import PropTypes from "prop-types";
import Button from "../atoms/Button";
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
}) {
  return (
    <div className="bg-custom-white-1 rounded-lg flex flex-col gap-5 w-fit py-6 px-14">
      <div className="font-semibold text-center">
        <h4 className="text-slate-300 text-[10px] mb-1">UD TIMUR JAYA RAYA</h4>
        <h3 className="text-slate-900 text-lg">{title}</h3>
      </div>
      <InputField
        value={inputValue}
        onChange={onChange}
        name={inputName}
        placeholder={inputPlaceholder}
        type={inputType}
        label={inputLabel}
        isModal={true}
      />
      <div className="flex justify-center gap-5 mt-2">
        <Button
          backgroundColor="white"
          text={textCancel}
          onClick={functionCancel}
        />
        <Button
          backgroundColor="bg-custom-green-1"
          text={textOk}
          onClick={functionOk}
        />
      </div>
    </div>
  );
}

ModalCrud.propTypes = {
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
};
