import React from "react";

const LayoutBorderRadius = ({ children }) => {
  return (
    <div className="h-auto max-w-4xl mx-auto mt-7 p-[2rem] border-4 border-b-0 border-zinc-200 rounded-t-[4rem]">
      {children}
    </div>
  );
};

export default LayoutBorderRadius;
