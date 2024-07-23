import { useEffect, useState } from "react";
import check from "/icons/check.svg";
import PropTypes from "prop-types";

export default function SuccessNotification({ text, duration = 3000 }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
      <div className="flex gap-[6px] py-[6px] px-[18px] bg-custom-white-1 rounded-xl items-center justify-center shadow-lg">
        <img src={check} alt="success" />
        <p className="text-xs text-slate-900">{text}</p>
      </div>
    </div>
  );
}

SuccessNotification.propTypes = {
  text: PropTypes.string.isRequired,
  duration: PropTypes.number,
};
