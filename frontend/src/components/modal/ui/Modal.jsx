import React from "react";
import "../styles/modal.css";

export const Modal = ({ active, setActive, children }) => {
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? "modal__content active" : "modal__content"}
        onClick={e => e.stopPropagation()}
      >
        {children}
        <button className="absolute right-[-30px] bottom-[-30px]" onClick={() => setActive(false)}>
          <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 27.4473L27.0416 3.40563" stroke="#4D4AC8" stroke-width="5" stroke-linecap="round" />
            <path d="M4 3L28.0416 27.0416" stroke="#4D4AC8" stroke-width="5" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};
