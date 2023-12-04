import React, { useEffect, useState, useRef } from "react";

export const InputNews = ({
  value,
  setValue,
  setIsShowFavorites,
  setSortValue
}) => {
  const [state, setState] = useState({
    searchItems: ["content", "title"],
    activeIndex: 1,
    toggle: false,
    activeSideLeft: true
  });

  const ref = useRef(null);
  const refButton = useRef(null);

  useEffect(() => {
    const setToggleFalse = () => {
      setState(prev => ({ ...prev, toggle: false }));
    };
    setTimeout(setToggleFalse, 800);

    return () => {
      clearTimeout(setToggleFalse);
    };
  }, [state.activeIndex]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (window.innerWidth > 640) return;

      if (ref.current && refButton.current.contains(event.target)) {
        setState(prev => ({ ...prev, toggle: !prev.toggle }));
        return;
      }

      if (ref.current && !ref.current.contains(event.target)) {
        setState(prev => ({ ...prev, toggle: false }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const clickHandle = async () => {
    if (!state.toggle) {
      setState(prev => ({ ...prev, toggle: !prev.toggle }));
      return;
    }

    const activeIndex =
      state.activeIndex + 1 === state.searchItems.length
        ? 0
        : state.activeIndex + 1;
    setState(prev => ({ ...prev, activeIndex }));
    setSortValue(state.searchItems[activeIndex]);
  };

  const clickShowAllHandle = () => {
    setState(prev => ({ ...prev, activeSideLeft: true }));
    setIsShowFavorites(false);
  };

  return (
    <div
      className={`relative sm:overflow-hidden transition-all w-full flex items-center ${
        state.activeSideLeft ? "bg-[#E2E1FF]" : "bg-[#FF66A6]"
      } rounded-[15px_32px_32px_15px] shadow-md`}
    >
      <button
        onClick={clickHandle}
        className={`hidden sm:block absolute w-[80px] overflow-hidden transition-all cursor-pointer rounded-[10px_0px_0px_10px] h-[29px] p-[0px_6px_0px_6px] ml-[10px] hover:bg-[#9693ff] hover:bg-opacity-[0.28] ${
          state.toggle
            ? "hover:bg-[#9693ff] hover:bg-opacity-[0.78] bg-opacity-[0.78] bg-[#9693ff]"
            : ""
        }`}
      >
        <div className={"flex items-center justify-between"}>
          <p
            className={
              "text-white text-[15px] font-medium transition-all " +
              (state.toggle ? "opacity-100" : "opacity-0")
            }
          >
            {state.searchItems[state.activeIndex]}
          </p>
        </div>
      </button>

      <button
        ref={refButton}
        className="absolute block sm:hidden transition-all h-[88%] w-[30%] rounded-[10px] left-[3px] cursor-pointer hover:bg-[#fff] hover:bg-opacity-[0.5]"
      >
        <svg
          className={`rotate-[90deg] sm:pointer-events-none ml-[12px] top-[43%] w-[6px] h-[9px] mr-[3px]`}
          viewBox="0 0 6 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.98401 3.59654L1.25697 0.218077C0.969316 -0.0726923 0.503048 -0.0726923 0.21574 0.218077C-0.0719134 0.505385 -0.0719134 0.969231 0.21574 1.25654L3.41974 4.16424L0.21574 7.07194C-0.0719134 7.35925 -0.0719134 7.82309 0.21574 8.1104C0.503048 8.40117 0.969316 8.40117 1.25697 8.1104L4.98401 4.73194C5.13978 4.57617 5.20832 4.36847 5.19552 4.16424C5.20832 3.96001 5.13978 3.75231 4.98401 3.59654Z"
            fill="#A7A4FF"
          />
        </svg>
      </button>

      <ul
        ref={ref}
        style={{ boxShadow: "1px 1px 10px 0 rgba(91, 88, 197, 0.4)" }}
        className={
          "block sm:hidden p-[5px] absolute transition-all bottom-[-40px] left-[25px] z-30 bg-white shadow-md rounded-[5px] " +
          (!state.toggle
            ? "translate-y-[-20px] opacity-0 z-0 pointer-events-none"
            : "")
        }
      >
        {state.searchItems.map((searchItem, index) => (
          <li
            onClick={() =>
              setState(prev => ({
                ...prev,
                activeIndex: index,
                toggle: index === prev.activeIndex ? !prev.toggle : prev.toggle
              }))
            }
            key={searchItem}
            className={`p-[0px_5px] cursor-pointer transition-all ${
              index === state.activeIndex ? "text-[#4D4ACB]" : "text-[#AFABFF]"
            } hover:text-[#4D4ACB]`}
          >
            <p className={`text-[15px] font-medium`}>{searchItem}</p>
          </li>
        ))}
      </ul>

      <div
        className={`relative z-10 w-full ml-[30px] ${
          state.activeSideLeft
            ? state.toggle
              ? state.activeIndex === 0
                ? "sm:ml-[87px]"
                : "sm:ml-[62px]"
              : "sm:ml-[26px]"
            : "ml-[2px] mr-[40px] sm:mr-[80px]"
        } transition-all m-[2px_2px_2px_2px]`}
      >
        {state.toggle ? (
          <div className="hidden sm:block absolute left-[-17px] top-[22%]">
            <button
              onClick={() => {
                setState(prev => ({ ...prev, toggle: false }));
              }}
              className="p-[4px] rounded-[4px] hover:bg-white hover:bg-opacity-30"
            >
              <svg
                className={`pointer-events-none w-[6px] h-[9px]`}
                viewBox="0 0 6 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.98401 3.59654L1.25697 0.218077C0.969316 -0.0726923 0.503048 -0.0726923 0.21574 0.218077C-0.0719134 0.505385 -0.0719134 0.969231 0.21574 1.25654L3.41974 4.16424L0.21574 7.07194C-0.0719134 7.35925 -0.0719134 7.82309 0.21574 8.1104C0.503048 8.40117 0.969316 8.40117 1.25697 8.1104L4.98401 4.73194C5.13978 4.57617 5.20832 4.36847 5.19552 4.16424C5.20832 3.96001 5.13978 3.75231 4.98401 3.59654Z"
                  fill="#fff"
                />
              </svg>
            </button>
          </div>
        ) : (
          <svg
            onClick={clickHandle}
            className={`hidden sm:block absolute cursor-pointer pointer-events-none left-[-10px] top-[43%] w-[6px] h-[9px] mr-[3px]`}
            viewBox="0 0 6 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.98401 3.59654L1.25697 0.218077C0.969316 -0.0726923 0.503048 -0.0726923 0.21574 0.218077C-0.0719134 0.505385 -0.0719134 0.969231 0.21574 1.25654L3.41974 4.16424L0.21574 7.07194C-0.0719134 7.35925 -0.0719134 7.82309 0.21574 8.1104C0.503048 8.40117 0.969316 8.40117 1.25697 8.1104L4.98401 4.73194C5.13978 4.57617 5.20832 4.36847 5.19552 4.16424C5.20832 3.96001 5.13978 3.75231 4.98401 3.59654Z"
              fill="#A7A4FF"
            />
          </svg>
        )}
        <input
          type="text"
          name="search"
          id="search"
          style={{
            boxShadow: `0 0 2px 0 rgba(${
              state.activeSideLeft ? "181, 177, 255" : "255, 0, 106"
            }, 1)`
          }}
          className={`w-full rounded-[15px_32px_32px_15px] py-2.5 pl-3 pr-14 ${
            state.activeSideLeft ? "text-[#3430C1]" : "text-[#FF63A4]"
          } font-medium border-none ring-inset ring-gray-300 tracking-widest placeholder:text-gray-400 focus:outline-0 text-sm leading-6`}
          placeholder="Search..."
          value={value}
          onChange={setValue}
        />
        <button
          onClick={() => {
            setState(prev => ({
              ...prev,
              activeSideLeft: !prev.activeSideLeft
            }));
            setIsShowFavorites(true);
          }}
          className="absolute right-[12px] top-[10px]"
          disabled={!state.activeSideLeft}
        >
          <svg
            width="25"
            height="22"
            viewBox="0 0 25 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.76798 19.0916C4.35538 16.4624 0.347168 13.3742 0.347168 8.02079C0.347168 2.11097 7.03139 -2.08016 12.4999 3.60147L14.9305 6.03038C15.2865 6.38626 15.8636 6.38616 16.2195 6.03014C16.5754 5.67414 16.5753 5.09704 16.2193 4.74115L13.8714 2.39408C19.0242 -1.37818 24.6527 2.59767 24.6527 8.02079C24.6527 13.3742 20.6445 16.4624 17.2319 19.0916C16.8773 19.3649 16.529 19.6333 16.1923 19.8987C14.9305 20.8934 13.7152 21.8299 12.4999 21.8299C11.2847 21.8299 10.0694 20.8934 8.8076 19.8987C8.47095 19.6333 8.12268 19.3649 7.76798 19.0916Z"
              fill={state.activeSideLeft ? "#FF006A" : "#FF66A6"}
              stroke="#9089FC"
              strokeWidth="0.24"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      {!state.activeSideLeft && (
        <div className="absolute right-[10px] top-[20%]">
          <button
            onClick={clickShowAllHandle}
            className="p-[10px] flex items-center h-[28px] rounded-[30px] transition-all hover:bg-[#F83586]"
          >
            <p className="block sm:hidden text-[15px] text-white font-semibold pl-[20px]">
              all
            </p>
            <p className="hidden sm:block text-[15px] text-white font-semibold pl-[20px]">
              show all
            </p>
          </button>
        </div>
      )}
    </div>
  );
};
