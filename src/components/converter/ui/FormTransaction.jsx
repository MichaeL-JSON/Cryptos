import React, { useState, useRef, useEffect } from "react";
import PortalComponent from "../../../layouts/PortalComponent";

const formatNumberWithSpaces = number =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

function formatNumber(number) {
  if (Number.isInteger(number)) {
    return formatNumberWithSpaces(number.toString());
  } else {
    return formatNumberWithSpaces(number.toFixed(4));
  }
}

export const FormTransaction = ({ image, name, price, setShowComponent }) => {
  const [inputValue, setInputValue] = useState(1);
  const [showInput, setShowInput] = useState(false);

  const inputRef = useRef(null);
  const container = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef.current]);

  const onChangeHandle = event => {
    const value = Number(event.target.value);
    if (value >= 0 && value < 99999) {
      if (value === 0) {
        setInputValue(1);
        return;
      }
      setInputValue(event.target.value);
    }
  };

  const onClickHandle = e => {
    if (container.current && !container.current.contains(e.target)) {
      setShowComponent(false);
    }
  };

  return (
    <PortalComponent>
      <div
        onClick={onClickHandle}
        className="fixed top-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-10 z-50"
      >
        <div
          ref={container}
          style={{
            backgroundImage:
              "linear-gradient(to bottom right, rgba(77, 74, 200, 1), rgba(77, 74, 200, 0))",
            boxShadow: "1px 1px 24px 0px rgba(77, 74, 200, 0.42)"
          }}
          className=" rounded-[30px] w-[280px] h-[280px] sm:w-[430px] sm:h-[430px] md:w-[540px] md:h-[540px] flex items-center justify-center"
        >
          <div className="w-[278px] h-[278px] sm:w-[428px] sm:h-[428px] md:w-[538px] md:h-[538px] flex flex-col justify-between items-center rounded-[30px] bg-white p-[10px_0px] sm:p-[17px_0px] md:p-[25px_0px]">
            <div
              style={{ boxShadow: "0px 0px 2px 0px rgb(181, 177, 255)" }}
              className="border-[2px] border-[#b5b1ff0f] flex items-center p-[4px_11px_5px_10px] md:p-[9px_16px_11px] rounded-[11px]"
            >
              <img
                src={image}
                style={{ boxShadow: "0px 0px 7px 0px rgb(247, 147, 26)" }}
                className="w-[25px] h-[25px] sm:w-[35px] sm:h-[35px] md:w-[55px] md:h-[55px] rounded-full"
              />
              <p className="text-[21px] sm:text-[30px] md:text-[41px] text-[#4D4AC8] font-medium m-[0px_0px_0px_6px] sm:m-[0px_0px_0px_11px] md:m-[0px_22px]">
                {name}
              </p>
            </div>
            <div className="bg-[#B5B1FF] bg-opacity-[0.3] rounded-[16px] w-[230px] h-[210px] sm:w-[356px] sm:h-[323px] md:w-[429px] md:h-[389px]">
              <div className="flex flex-col items-center w-[210px] sm:w-[329px] m-[0px_auto]">
                <div className="flex m-[8px_0px_5px] sm:m-[17px_0px_27px] md:m-[42px_0px_59px] items-center p-[7px] bg-[#B5B1FF] bg-opacity-[0.4] rounded-[5px] text-[15px] sm:text-[21px] text-[#6B68D0] font-bold">
                  <button className="w-[55px] h-[45px] sm:w-[71px] sm:h-[60px] bg-white rounded-[6px] uppercase mr-[8px] active:scale-95 transition-all">
                    buy
                  </button>
                  <button className="relative bg-white w-[45px] h-[35px] sm:w-[61px] sm:h-[50px] rounded-[6px] overflow-hidden active:scale-95 transition-all flex items-center justify-center">
                    <p className="uppercase">sell</p>
                    <div className="absolute z-10 bg-white bg-opacity-[0.63] left-0 right-0 top-0 bottom-0 backdrop-blur-[3px] p-[0px_5px] flex flex-col items-center pointer-events-none">
                      <svg
                        className="m-[3px_0px_4px] sm:m-[5px_0px_6px]"
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 11.5C1 9.3787 1 8.31805 1.65901 7.65903C2.31802 7 3.37868 7 5.5 7H11.5C13.6213 7 14.6819 7 15.341 7.65903C16 8.31805 16 9.3787 16 11.5C16 13.6213 16 14.6819 15.341 15.341C14.6819 16 13.6213 16 11.5 16H5.5C3.37868 16 2.31802 16 1.65901 15.341C1 14.6819 1 13.6213 1 11.5Z"
                          stroke="#8E8F93"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M8.5 10V13"
                          stroke="#8E8F93"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M4 7V5.5C4 3.01472 6.01472 1 8.5 1C10.9853 1 13 3.01472 13 5.5V7"
                          stroke="#8E8F93"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <p className="text-[#828282] text-[6px] sm:text-[9px] text-center">
                        login to sell coins
                      </p>
                    </div>
                  </button>
                </div>

                <div className="flex justify-center text-[#3F3F3F] text-[21px] sm:text-[31px] font-bold items-center mb-[10px] sm:mb-[33px]">
                  <div className="flex items-end">
                    {showInput ? (
                      <input
                        ref={inputRef}
                        className="w-[70px] h-[33px] sm:h-[48px] sm:w-[95px] mr-[5px] rounded-lg p-[0px_2px] border-[1px] border-black border-opacity-60 bg-[#D4D2FF] cursor-pointer focus:cursor-text transition-all outline-none"
                        value={inputValue}
                        onChange={onChangeHandle}
                        onBlur={() => setShowInput(false)}
                      />
                    ) : (
                      <div
                        className="cursor-pointer p-[1px_0px] border-[1px] border-transparent h-[33px] sm:h-[48px]"
                        onClick={() => setShowInput(true)}
                      >
                        {inputValue}
                      </div>
                    )}
                    <span className="text-[#828282] text-[11px] mb-[5px]">
                      coin
                    </span>
                  </div>
                  <svg
                    className="m-[0px_14px] w-[10px] h-[10px] sm:w-[14px] sm:h-[14px]"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 11.8506L11.8505 2.05129"
                      stroke="#6B68D0"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M2.05078 2L11.8501 11.8505"
                      stroke="#6B68D0"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p>{price}$</p>
                </div>

                <div
                  style={{ boxShadow: "0px 0px 4px 0px rgb(212, 210, 255)" }}
                  className="text-[#3F3F3F] text-[21px] sm:text-[31px] font-bold w-full h-[38px] sm:h-[54px] bg-white rounded-[5px] flex items-center justify-center"
                >
                  {formatNumber(Number(inputValue) * price)}$
                </div>
              </div>

              <div className="w-full flex flex-row-reverse text-[#6B68D0] text-[15px] sm:text-[21px] font-bold mt-[15px] sm:mt-[23px] md:mt-[27px] p-[0px_10px]">
                <button
                  style={{ boxShadow: "0px 0px 4px 0px rgb(212, 210, 255)" }}
                  className="w-[55px] h-[30px] sm:w-[86px] sm:h-[40px] bg-white uppercase rounded-[5px] active:scale-95 transition-all ml-[5px] sm:ml-[9px]"
                >
                  ok
                </button>
                <button
                  onClick={() => setShowComponent(false)}
                  style={{ boxShadow: "0px 0px 4px 0px rgb(212, 210, 255)" }}
                  className="w-[55px] h-[30px] sm:w-[86px] sm:h-[40px] bg-[#D4D2FF] uppercase rounded-[5px] active:scale-95 transition-all"
                >
                  close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalComponent>
  );
};
