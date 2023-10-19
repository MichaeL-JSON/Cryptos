import React from "react";

const Button = ({ text, type, onClick }) => {
  const typeButton = {
    outline: {
      button:
        "relative inline-block rounded-[8px] border border-[#ECEDF0] px-2 py-0",
      span: "text-[#C4C4C4] font-semibold italic"
    },
    gradient: {
      button:
        "inline-block p-px pr-0.5 rounded-r-[8px] bg-gradient-to-r from-transparent from-25% to-[#ECEDF0]",
      span: "inline-block pb-px pr-4 pl-[0.3125rem] text-[#C4C4C4] font-semibold italic rounded-r-[8px] bg-white"
    }
  };

  return (
    <button
      className={typeButton[type]["button"]}
      type="button"
      onClick={onClick}
    >
      <span className={typeButton[type]["span"]}>{text}</span>
    </button>
  );
};

export default Button;
