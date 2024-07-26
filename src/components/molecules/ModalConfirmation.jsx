import PropTypes from "prop-types";
import Modal from "./Modal";

export default function ModalConfirmation({
  title,
  textCancel,
  textOk,
  functionCancel,
  functionOk,
  isOpen,
  headText = "UD TIMUR JAYA RAYA",
}) {
  return (
    <Modal
      title={title}
      functionCancel={functionCancel}
      functionOk={functionOk}
      textCancel={textCancel}
      textOk={textOk}
      isOpen={isOpen}
      headText={headText}
    />
  );
}

ModalConfirmation.propTypes = {
  title: PropTypes.string.isRequired,
  textCancel: PropTypes.string,
  textOk: PropTypes.string.isRequired,
  functionCancel: PropTypes.func,
  functionOk: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  headText: PropTypes.string,
};
