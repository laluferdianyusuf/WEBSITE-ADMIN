import { useEffect, useState } from "react";
import warning from "/icons/warning.svg";
import PropTypes from "prop-types";

export default function WarningNotification({ text, duration = 3000 }) {
  const [isVisible, setIsVisible] = useState(true);
  const [animate, setAnimate] = useState("translate-y-[-100px]");

  useEffect(() => {
    const timerIn = setTimeout(() => {
      setAnimate("translate-y-0");
    }, 10);

    const timerOut = setTimeout(() => {
      setAnimate("translate-y-[-100px]");
      setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }, duration);

    return () => {
      clearTimeout(timerIn);
      clearTimeout(timerOut);
    };
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-transform duration-300 ease-in-out ${animate}`}
    >
      <div className="flex gap-[6px] py-[6px] px-[18px] bg-custom-white-1 rounded-xl items-center justify-center shadow-lg">
        <img src={warning} alt="warning" />
        <p className="text-xs text-slate-900">{text}</p>
      </div>
    </div>
  );
}

WarningNotification.propTypes = {
  text: PropTypes.string.isRequired,
  duration: PropTypes.number,
};
