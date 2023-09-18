import React from "react";
import { InputConverter } from "./InputConverter";
import { SelectConverter } from "./SelectConverter";

export const FormConverter = ({ children }) => {
  return (
    <div
      className={`w-[43%] h-full p-[0.6rem_0.8rem] border-b-[0.13rem] ${
        children === "From" ? "border-r-[0.13rem]" : "border-l-[0.13rem]"
      }  border-zinc-200 rounded-[1.3rem] rounded-t-none`}
    >
      <h4 className="font-normal text-[0.7rem] sm:text-[0.9rem] md:text-[1.1rem] mb-[0.4rem] md:mb-[0.5rem]">
        {children}
      </h4>
      <div className="h-full flex justify-between">
        <InputConverter />
        <SelectConverter />
      </div>
    </div>
  );
};
