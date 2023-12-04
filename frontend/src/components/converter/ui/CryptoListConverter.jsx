import React, { useState } from "react";
import { useGetCoinsDataQuery } from "../../../redux";
import { FormTransaction } from "./FormTransaction";

const formatNumberWithSpaces = number =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export const CryptoListConverter = ({ className }) => {
  const [state, setState] = useState({
    showComponent: false,
    activeIndex: null
  });
  const { data, isLoading } = useGetCoinsDataQuery(null);

  return (
    <div className={"w-full " + className}>
      <ul className="w-full">
        <li
          key={-1}
          className="hidden sm:grid grid-cols-4 sm:grid-cols-9 w-full self-center font-semibold text-gray-500 text-[0.6em] sm:text-[0.75em] md:text-[0.9em]"
        >
          <p className="sm:col-span-3">Имя</p>
          <p className="sm:col-span-2">Последняя цена</p>
          <p className="sm:col-span-2">Изменение за 24ч</p>
          <p className="sm:col-span-2 text-end">Капитализация</p>
        </li>
        {
          !isLoading && data ? (
            data.map((cryptoItem, index) => (
              <li
                onClick={() =>
                  setState(() => ({
                    showComponent: true,
                    activeIndex: index
                  }))
                }
                key={index}
                className="m-[2em_0em] cursor-pointer transition-all sm:m-[1em_0em] grid grid-cols-3 sm:grid-cols-9 w-full self-center font-medium text-gray-600 text-[0.75em] sm:text-[0.85em] md:text-[1em]"
              >
                <div className="mb-[0.2em] sm:m-0 col-span-3 sm:col-span-3 flex items-center font-semibold text-gray-700">
                  <img
                    src={cryptoItem.image}
                    alt=""
                    className="w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5"
                  />
                  <p className="ml-[0.5em] ">{cryptoItem.name.split(" ")[0]}</p>
                  <p className="ml-[0.4em] text-gray-500 text-[0.7em] sm:text-[0.65em] md:text-[0.8em]">
                    {cryptoItem.symbol.toUpperCase()}
                  </p>
                </div>
                <p className="ml-[2em] sm:m-0 sm:col-span-2">
                  ${formatNumberWithSpaces(cryptoItem.current_price)}
                </p>
                <p
                  className={
                    "sm:col-span-2 text-center " +
                    (String(cryptoItem.price_change_percentage_24h)[0] === "-"
                      ? "text-red-700"
                      : "text-green-600")
                  }
                >
                  {cryptoItem.price_change_percentage_24h.toFixed(2)}%
                </p>
                <p className="sm:col-span-2 text-end">
                  {cryptoItem.market_cap.length > 6
                    ? "$" + formatNumberWithSpaces(cryptoItem.market_cap)
                    : "$" +
                      formatNumberWithSpaces(
                        Math.floor(cryptoItem.market_cap / 1000000)
                      ) +
                      "M"}
                </p>
              </li>
            ))
          ) : (
            <>loading</>
          ) // <Loading /> or <Spinner />
        }
      </ul>
      {state.showComponent && (
        <FormTransaction
          image={data[state.activeIndex].image}
          name={data[state.activeIndex].name.split(" ")[0]}
          price={data[state.activeIndex].current_price}
          setShowComponent={value => {
            setState(() => ({ activeIndex: null, showComponent: value }));
          }}
        />
      )}
    </div>
  );
};
