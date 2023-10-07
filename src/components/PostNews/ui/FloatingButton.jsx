import React from "react";
import { useGetPositionScroll } from "../../../hooks/useGetPositionScroll";

const FloatingButton = () => {
  const scrollPos = useGetPositionScroll();

  function smoothScrollTop() {
    const scrollTop = window.scrollY;

    if (scrollTop > 0) {
      window.scrollTo(0, scrollTop - scrollTop / 20);
      requestAnimationFrame(smoothScrollTop);
    }
  }

  const handleClick = () => {
    smoothScrollTop();
  };

  return (
    <div className="fixed right-5 bottom-5">
      <button
        className={`${
          scrollPos > 1000 && "sticky"
        } w-10 h-10 text-gray-500 p-2 rounded-full
          transition duration-500 hover:rounded-full hover:bg-gray-500 hover:text-white
          ${scrollPos > 1000 ? "opacity-100" : "opacity-0"}`}
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
          />
        </svg>
      </button>
    </div>
  );
};

export default FloatingButton;
