import React from "react";
import { FormConverter } from "./FormConverter";

export const FormContainerConverter = () => {
  return (
    <div className="text-[0.6rem] sm:text-[0.8rem] md:text-[1rem] flex w-full h-[5.3rem] sm:h-[6.3rem] md:h-[7.3rem] justify-between border-[0.13rem] border-b-[0px] border-zinc-200 rounded-[1.3rem]">
      <FormConverter>From</FormConverter>
      <div className="z-10 bg-white relative w-[16%] h-[60%] m-[0px_-0.13rem]">
        <div className="absolute flex items-center justify-center top-[40%] w-full h-full border-[0.13rem] border-b-[0px] border-zinc-200 rounded-[1.3rem] rounded-b-none">
          <button>
            <svg
              fill="#8c8c8c"
              className="cursor-pointer active:scale-95 absolute top-[1rem] left-[35%] w-[2rem] h-[2rem] sm:w-[2.5rem] sm:h-[2.5rem] md:w-[3rem] md:h-[3rem] transition-all"
              viewBox="0 0 24.00 24.00"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#8c8c8c"
              strokeWidth="0.00024000000000000003"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="m7.5 21 2.999-3v1.5c4.143 0 7.501-3.359 7.501-7.502 0-2.074-.842-3.952-2.202-5.309l2.114-2.124c1.908 1.901 3.088 4.531 3.088 7.437 0 5.798-4.7 10.498-10.498 10.498-.001 0-.001 0-.002 0v1.5zm-7.5-9c.007-5.796 4.704-10.493 10.499-10.5h.001v-1.5l3 3-3 3v-1.5s-.001 0-.002 0c-4.143 0-7.502 3.359-7.502 7.502 0 2.074.842 3.952 2.203 5.31l-2.112 2.124c-1.907-1.89-3.088-4.511-3.088-7.407 0-.01 0-.02 0-.03v.002z"></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
      <FormConverter>To</FormConverter>
    </div>
  );
};
