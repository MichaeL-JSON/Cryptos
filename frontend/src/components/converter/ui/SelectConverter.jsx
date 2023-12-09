import React, { Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetCoinsDataQuery,
  useLazyGetCoinChartQuery
} from "../../../redux/coinApi";
import {
  updateCurrency,
  updatePrice,
  updateValue
} from "../../../redux/converter.slice";

import "../styles/index.css";

export const SelectConverter = ({ converterKey }) => {
  const { data } = useGetCoinsDataQuery();
  const [getCoinChart, { data: coinData }] = useLazyGetCoinChartQuery();

  const currency = useSelector(state => state.converter[converterKey].currency);
  const converterValue = useSelector(
    state => state.converter[converterKey].value
  );
  const dispatch = useDispatch();

  const clickHandle = async value => {
    await dispatch(updateCurrency({ key: converterKey, value: value.symbol }));

    await getCoinChart({
      id: value.id,
      currency: "usd"
    });
  };

  useEffect(() => {
    getCoinChart({
      id: "bitcoin",
      currency: "usd"
    });
  }, [getCoinChart]);

  useEffect(() => {
    if (coinData) {
      dispatch(
        updatePrice({ key: converterKey, value: coinData?.body?.[0]?.[1] || 0 })
      );
      dispatch(updateValue({ key: converterKey, value: converterValue }));
    }
  }, [coinData, converterKey, dispatch]);

  return (
    <>
      {data && (
        <Listbox>
          {({ open }) => (
            <>
              <div className="relative min-w-[7rem] ml-[4%] sm:min-w-[35%] md:min-w-[37%] flex items-center h-[50%]">
                <Listbox.Button className="relative cursor-pointer h-full w-full rounded-[1.3rem] bg-white pl-[10%] sm:pl-2 md:pl-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base sm:text-sm sm:leading-6">
                  <span className="flex items-center">
                    <img
                      src={data.find(item => item.symbol === currency).image}
                      alt=""
                      className="w-6 h-6 sm:w-4 sm:h-4 md:h-5 md:w-5 flex-shrink-0 rounded-full"
                    />
                    <span className="ml-[10%] block text-[0.9rem] sm:text-[0.7rem] md:text-[0.8rem] text-gray-600">
                      {currency.toUpperCase()}
                    </span>
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronDownIcon
                      className={
                        "h-5 w-5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-gray-400 cursor-pointer mt-[0.13rem] transition-all " +
                        (open ? "rotate-[180deg]" : "")
                      }
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute overflow-x-hidden custom-scrollbar z-20 mt-1 top-[100%] max-h-56 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {data.map(dataItem => (
                      <Listbox.Option
                        key={dataItem.id}
                        className={
                          "relative cursor-pointer select-none py-2 sm:py-1 md:py-2 pl-2 md:pl-3 text-[0.9rem] sm:text-[0.7rem] md:text-[0.8rem]"
                        }
                        value={dataItem.id}
                      >
                        {() => (
                          <div
                            onClick={() => clickHandle(dataItem)}
                            className={"flex items-center"}
                          >
                            <img
                              src={dataItem.image}
                              alt=""
                              className="w-6 h-6 sm:w-4 sm:h-4 md:h-5 md:w-5 flex-shrink-0 rounded-full"
                            />
                            <span
                              className={
                                "font-semibold hover:text-indigo-600 ml-3 sm:ml-1 md:ml-3 block transition-all " +
                                (dataItem.symbol === currency
                                  ? "hover:text-yellow-600 text-yellow-600"
                                  : "")
                              }
                            >
                              {dataItem.symbol.toUpperCase()}
                            </span>
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      )}
    </>
  );
};
