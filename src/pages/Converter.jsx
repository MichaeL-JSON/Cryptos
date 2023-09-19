import React from "react";
// import { useGetCoinChartQuery } from "../redux";
import LayoutBorderRadius from "../layouts/LayoutBorderRadius";
import {
  CryptoListConverter,
  FormContainerConverter
} from "../components/converter";

const Converter = () => {
  // для теста вытащим data здесь
  // const { data } = useGetCoinChartQuery({
  //   id: "bitcoin",
  //   currency: "usd",
  //   days: 14
  // });

  return (
    <div>
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
        </div>
        <div className="mt-6 h-full">
          <FormContainerConverter />
        </div>
        <CryptoListConverter className={"mt-4"} />
      </LayoutBorderRadius>
    </div>
  );
};

export default Converter;
