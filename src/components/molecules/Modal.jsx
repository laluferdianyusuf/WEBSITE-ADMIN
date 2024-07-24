import PropTypes from "prop-types";
import Button from "../atoms/Button";
import { useEffect } from "react";

function Modal({
  title,
  children,
  functionCancel,
  functionOk,
  textCancel,
  textOk,
  isOpen,
}) {
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        functionCancel();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, functionCancel]);

  const handleClickOutside = (event) => {
    if (event.target.classList.contains("modal-backdrop")) {
      functionCancel();
    }
  };
  return isOpen ? (
    <div
      className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
      onClick={handleClickOutside}
    >
      <div className="bg-custom-white-1 rounded-lg flex flex-col gap-5 py-6 px-14 relative w-1/3 max-h-[90vh] overflow-y-auto">
        <div className="font-semibold text-center">
          <h4 className="text-slate-300 text-[10px] mb-1">
            UD TIMUR JAYA RAYA
          </h4>
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
    </div>
  ) : null;
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  functionCancel: PropTypes.func,
  functionOk: PropTypes.func,
  textCancel: PropTypes.string,
  textOk: PropTypes.string,
  isOpen: PropTypes.bool,
};

export default Modal;
