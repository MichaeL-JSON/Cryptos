const HeaderTitle = () => {
  return (
    <>
      <div className=" text-[#6B6565] leading-[58.09px] font-custom font-bold text-[48px] ">
        197,003,700 $
      </div>

      <div className="font-custom font-bold w-[160px] flex items-center justify-center bg-[#42F068] bg-opacity-70 rounded gap-[4px] px-[7px] py-[2px] mt-[7px] text-[#1BA920] text-[21px]">
        <div>+3,700</div>
        <div className="w-[4px] h-[4px] rounded bg-green-600"></div>
        <div>15,2%</div>
      </div>
    </>
  );
};

export default HeaderTitle;
