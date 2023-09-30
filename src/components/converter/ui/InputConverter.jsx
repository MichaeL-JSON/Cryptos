import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateValue } from "../slice/converter.api";

export const InputConverter = ({ converterKey }) => {
  const converterState = useSelector(state => state.converter[converterKey]);
  const dispatch = useDispatch();

  const inputChangeHandle = event => {
    const value = event.target.value;
    const sanitizedValue = value.replace(/,/g, ".");

    if (
      sanitizedValue === "0" ||
      !isNaN(sanitizedValue) ||
      sanitizedValue === ""
    ) {
      dispatch(updateValue({ key: converterKey, value: sanitizedValue }));
    }
  };

  const keyUpHandle = event => {
    if (event.key === "Backspace" && converterState.value === "0.") {
      dispatch(updateValue({ key: converterKey, value: "" }));
    }
  };

  return (
    <div className="w-full ">
      <div className="relative rounded-[1.3rem] shadow-sm h-[50%] w-full">
        <input
          type="text"
          name="price"
          id="price"
          className="h-full block w-full rounded-[1.3rem] border-0 p-[0%_10%_0%_1em] ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none text-base sm:text-sm sm:leading-6 text-gray-600 "
          placeholder="0.00"
          onChange={inputChangeHandle}
          onKeyUp={keyUpHandle}
          value={converterState.value == 0 ? 0 : converterState.value}
        />
      </div>
    </div>
  );
};
