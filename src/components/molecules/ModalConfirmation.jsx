import PropTypes from "prop-types";
import Modal from "./Modal";

export default function ModalConfirmation({
  title,
  textCancel,
  textOk,
  functionCancel,
  functionOk,
}) {
  return (
    <Modal
      title={title}
      functionCancel={functionCancel}
      functionOk={functionOk}
      textCancel={textCancel}
      textOk={textOk}
    />
  );
}

ModalConfirmation.propTypes = {
  title: PropTypes.string,
  textCancel: PropTypes.string,
  textOk: PropTypes.string,
  functionCancel: PropTypes.func,
  functionOk: PropTypes.func,
};
