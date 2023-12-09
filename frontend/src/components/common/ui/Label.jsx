import React from "react";

export const Label = ({ children }) => {
  return (
    <label className="absolute left-[13px] md:left-[50px] top-[-15px] text-[#4D4AC8] text-[11px] font-bold">
      {children}
    </label>
  );
};
