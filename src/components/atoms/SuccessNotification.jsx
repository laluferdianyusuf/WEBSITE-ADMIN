import { useEffect, useState, useRef } from "react";
import check from "/icons/check.svg";
import PropTypes from "prop-types";

export default function SuccessNotification({ text, duration = 3000 }) {
  const [isVisible, setIsVisible] = useState(true);
  const [animate, setAnimate] = useState("translate-y-[-100px]");
  const notificationRef = useRef(null);

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

  const handleOverlayClick = (event) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setAnimate("translate-y-[-100px]");
      setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={handleOverlayClick}
      />
      <div
        ref={notificationRef}
        className={`fixed top-10 left-1/2 transform -translate-x-1/2 z-50 transition-transform duration-300 ease-in-out ${animate}`}
      >
        <div className="flex gap-[6px] py-[6px] px-[18px] bg-custom-white-1 rounded-xl items-center justify-center shadow-lg">
          <img src={check} alt="success" />
          <p className="text-xs text-slate-900">{text}</p>
        </div>
      </div>
    </>
  );
}

SuccessNotification.propTypes = {
  text: PropTypes.string.isRequired,
  duration: PropTypes.number,
};
