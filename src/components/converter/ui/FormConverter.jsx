import React from "react";
import { InputConverter } from "./InputConverter";
import { SelectConverter } from "./SelectConverter";

export const FormConverter = ({ converterKey }) => {
  return (
    <div
      className={`sm:w-[43%] h-[11em] sm:h-full p-[0.6rem_0.8rem] border-[0.13rem] sm:border-[0rem] sm:border-b-[0.13rem] ${
        converterKey.charAt(0).toUpperCase() + converterKey.slice(1) === "From"
          ? "sm:border-r-[0.13rem]"
          : "sm:border-l-[0.13rem]"
      }  border-zinc-200 rounded-[1.3rem] sm:rounded-t-none`}
    >
      <h4 className="font-bold text-gray-700 text-[1.1rem] sm:text-[0.9rem] md:text-[1.1rem] mb-[0.4rem] md:mb-[0.5rem]">
        {converterKey.charAt(0).toUpperCase() + converterKey.slice(1)}
      </h4>
      <div className="h-full flex justify-between">
        <InputConverter converterKey={converterKey} />
        <SelectConverter converterKey={converterKey} />
      </div>
    </div>
  );
};
