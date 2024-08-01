import PropTypes from "prop-types";
import Back from "/icons/back.svg";

export default function BackButton({
  backgroundColor = "bg-transparent",
  onClick,
  type = "button",
}) {
  return (
    <button className={`${backgroundColor}`} onClick={onClick} type={type}>
      <img src={Back} alt="back button" />
    </button>
  );
}

BackButton.propTypes = {
  backgroundColor: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
};
