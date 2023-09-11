import React from "react";
import LayoutBorderRadius from "../layouts/LayoutBorderRadius";

const News = () => {
  const getData = () => {
    const result = [];

    for (let i = 0; i < 10; i++) {
      result.push(
        <div className="w-full h-[45rem] bg-slate-400 mt-6 rounded-[1.5rem]"></div>
      );
    }

    return result;
  };

  return (
    <LayoutBorderRadius>
      <div className="flex justify-space-between items-center gap-4">
        <div className="relative w-full rounded-md shadow-md">
          <input
            type="text"
            name="price"
            id="price"
            className="block w-full rounded-md border-0 py-2.5 pl-3 pr-20 text-gray-900 font-medium ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 sm:text-sm sm:leading-6"
            placeholder="vol"
          />
          <div className="absolute inset-y-0 right-5 flex items-center">
            <select
              id="currency"
              name="currency"
              className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-2 text-right text-gray-500 focus:outline-0 sm:text-sm"
            >
              <option>by head</option>
              <option>by content</option>
              <option>by content content</option>
            </select>
          </div>
        </div>
        <div className="inline-flex items-center w-20 h-10 px-2 text-[#f866a3] text-md bg-[#ffffff] rounded-md shadow-md cursor-pointer">
          show all
        </div>
        {/* <div className="w-10 h-10 mb-10 rounded-md bg-white shadow-md"> */}
        {/* //       <a
  //   href="#"
  //   className="rounded-md bg-white  w-10 h-10 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
  // > */}
        {/* <svg
          viewBox="-2.4 -2.4 28.80 28.80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#9089fc"
            strokeWidth="0.24000000000000005"
          >
            {" "}
            <path
              d="M8.10627 18.2468C5.29819 16.0833 2 13.5422 2 9.1371C2 4.27416 7.50016 0.825464 12 5.50063L14 7.49928C14.2929 7.79212 14.7678 7.79203 15.0607 7.49908C15.3535 7.20614 15.3534 6.73127 15.0605 6.43843L13.1285 4.50712C17.3685 1.40309 22 4.67465 22 9.1371C22 13.5422 18.7018 16.0833 15.8937 18.2468C15.6019 18.4717 15.3153 18.6925 15.0383 18.9109C14 19.7294 13 20.5 12 20.5C11 20.5 10 19.7294 8.96173 18.9109C8.68471 18.6925 8.39814 18.4717 8.10627 18.2468Z"
              fill="#ff006a"
            ></path>{" "}
          </g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M8.10627 18.2468C5.29819 16.0833 2 13.5422 2 9.1371C2 4.27416 7.50016 0.825464 12 5.50063L14 7.49928C14.2929 7.79212 14.7678 7.79203 15.0607 7.49908C15.3535 7.20614 15.3534 6.73127 15.0605 6.43843L13.1285 4.50712C17.3685 1.40309 22 4.67465 22 9.1371C22 13.5422 18.7018 16.0833 15.8937 18.2468C15.6019 18.4717 15.3153 18.6925 15.0383 18.9109C14 19.7294 13 20.5 12 20.5C11 20.5 10 19.7294 8.96173 18.9109C8.68471 18.6925 8.39814 18.4717 8.10627 18.2468Z"
              fill="#ff006a"
            ></path>{" "}
          </g>
        </svg> */}
        {/* </a> */}
        {/* </div> */}
        {/* <div className="w-12 h-12 cursor-pointer translate-y-1">
          <svg
            viewBox="-2.4 -2.4 28.80 28.80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#9089fc"
              strokeWidth="0.24000000000000005"
            >
              {" "}
              <path
                d="M8.10627 18.2468C5.29819 16.0833 2 13.5422 2 9.1371C2 4.27416 7.50016 0.825464 12 5.50063L14 7.49928C14.2929 7.79212 14.7678 7.79203 15.0607 7.49908C15.3535 7.20614 15.3534 6.73127 15.0605 6.43843L13.1285 4.50712C17.3685 1.40309 22 4.67465 22 9.1371C22 13.5422 18.7018 16.0833 15.8937 18.2468C15.6019 18.4717 15.3153 18.6925 15.0383 18.9109C14 19.7294 13 20.5 12 20.5C11 20.5 10 19.7294 8.96173 18.9109C8.68471 18.6925 8.39814 18.4717 8.10627 18.2468Z"
                fill="#ff006a"
              ></path>{" "}
            </g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M8.10627 18.2468C5.29819 16.0833 2 13.5422 2 9.1371C2 4.27416 7.50016 0.825464 12 5.50063L14 7.49928C14.2929 7.79212 14.7678 7.79203 15.0607 7.49908C15.3535 7.20614 15.3534 6.73127 15.0605 6.43843L13.1285 4.50712C17.3685 1.40309 22 4.67465 22 9.1371C22 13.5422 18.7018 16.0833 15.8937 18.2468C15.6019 18.4717 15.3153 18.6925 15.0383 18.9109C14 19.7294 13 20.5 12 20.5C11 20.5 10 19.7294 8.96173 18.9109C8.68471 18.6925 8.39814 18.4717 8.10627 18.2468Z"
                fill="#ff006a"
              ></path>{" "}
            </g>
          </svg>
        </div> */}
      </div>
      <div>{getData()}</div>
    </LayoutBorderRadius>
  );
};

export default News;
