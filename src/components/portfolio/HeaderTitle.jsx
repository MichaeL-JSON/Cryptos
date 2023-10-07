import React from "react";

const HeaderTitle = () => {
  return (
    <>
      <div className=" text-[#6B6565] leading-[58.09px] text-[48px] font-medium">
        197,003,700 $
      </div>

      <div className="w-[160px] font-medium flex items-center justify-center bg-[#42F068] bg-opacity-70 rounded gap-[4px] px-[7px] py-[2px] mt-[7px] text-[#1BA920] text-[21px]">
        <div>+3,700</div>
        <div className="w-[3px] h-[3px] rounded bg-green-600"></div>
        <div>15,2%</div>
      </div>
    </>
  );
};

export default HeaderTitle;
