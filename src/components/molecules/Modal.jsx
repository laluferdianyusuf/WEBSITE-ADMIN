import PropTypes from "prop-types";
import Button from "../atoms/Button";

function Modal({
  title,
  children,
  functionCancel,
  functionOk,
  textCancel,
  textOk,
}) {
  return (
    <div className="bg-custom-white-1 rounded-lg flex flex-col gap-5 w-fit py-6 px-14">
      <div className="font-semibold text-center">
        <h4 className="text-slate-300 text-[10px] mb-1">UD TIMUR JAYA RAYA</h4>
        <h3 className="text-slate-900 text-lg">{title}</h3>
      </div>
      {children}

      <div className="flex justify-center gap-5 mt-2">
        {functionCancel && textCancel && (
          <Button
            backgroundColor="white"
            text={textCancel}
            onClick={functionCancel}
          />
        )}
        <Button
          backgroundColor="custom-green-1"
          text={textOk}
          onClick={functionOk}
        />
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  functionCancel: PropTypes.func,
  functionOk: PropTypes.func,
  textCancel: PropTypes.string,
  textOk: PropTypes.string,
};

export default Modal;
