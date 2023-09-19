import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { optionItems } from "../const";

export const InputConverter = () => {
  const [selectedValue, setSelectedValue] = useState(optionItems[0]);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const selectHandle = value => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  const inputChangeHandle = event => {
    const value = event.target.value;
    const sanitizedValue = value.replace(/,/g, ".");

    if (sanitizedValue === "0" || sanitizedValue === "-0") {
      setInputValue("0.");
    } else if (sanitizedValue === "-") {
      setInputValue("-");
    } else if (!isNaN(sanitizedValue) || sanitizedValue === "") {
      setInputValue(sanitizedValue);
    }
  };

  const keyUpHandle = event => {
    if (event.key === "Backspace" && inputValue === "0.") {
      setInputValue("");
    }
  };

  return (
    <div className="w-[65%]">
      <div className="relative rounded-[1.3rem] shadow-sm h-[50%] w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 text-base sm:text-sm">$</span>
        </div>
        <input
          type="text"
          name="price"
          id="price"
          className="h-full block w-full rounded-[1.3rem] border-0 pl-9 sm:pl-6 md:pl-7 pr-[40%] ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none text-base sm:text-sm sm:leading-6 text-gray-600 "
          placeholder="0.00"
          onChange={inputChangeHandle}
          onKeyUp={keyUpHandle}
          value={inputValue}
        />
        <div className="w-[5rem] sm:w-[3.4rem] absolute inset-y-0 right-0 flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center w-full relative appearance-none h-full rounded-[1.3rem] border-0 bg-transparent py-0 pl-2 pr-2 text-gray-500 focus:outline-none "
          >
            <p className="text-[1rem] sm:text-[0.8rem]">{selectedValue}</p>
            <ChevronDownIcon
              className={
                "h-6 w-6 sm:h-5 sm:w-5 text-gray-400 cursor-pointer sm:mt-[0.13rem] transition-all " +
                (isOpen ? "rotate-[-180deg]" : "")
              }
              aria-hidden="true"
            />
            <ul
              className={
                "absolute z-20 shadow-lg bottom-[-150%] sm:bottom-[-160%] md:bottom-[-155%] left-[-0rem] transition-all flex justify-center items-center rounded-md flex-col w-[80%] sm:w-[90%] md:w-[100%] bg-white border-[1px] border-zinc-200 " +
                (isOpen
                  ? "opacity-100"
                  : "opacity-0 z-[-1] translate-y-[-10px]")
              }
            >
              {optionItems.map(item => (
                <li
                  className={
                    "py-0 sm:py-[0.13rem] md:py-1 text-[1rem] sm:text-[0.8rem] cursor-pointer transition-all font-normal hover:text-yellow-600 " +
                    (selectedValue === item
                      ? "font-semibold text-indigo-600"
                      : "")
                  }
                  onClick={() => selectHandle(item)}
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </button>
        </div>
      </div>
    </div>
  );
};
