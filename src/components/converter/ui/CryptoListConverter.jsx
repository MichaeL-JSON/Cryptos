import { cryptoList } from "../const";

const formatNumberWithSpaces = number =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export const CryptoListConverter = ({ className }) => {
  return (
    <div className={"w-full " + className}>
      <ul className="w-full">
        <li
          key={-1}
          className="grid grid-cols-4 sm:grid-cols-9 w-full self-center font-semibold text-gray-500 text-[0.6em] sm:text-[0.75em] md:text-[0.9em]"
        >
          <p className="sm:col-span-3">Имя</p>
          <p className="sm:col-span-2">Последняя цена</p>
          <p className="sm:col-span-2">Изменение за 24ч</p>
          <p className="sm:col-span-2 text-end">Капитализация</p>
        </li>
        {cryptoList.map((cryptoItem, index) => (
          <li
            key={index}
            className="m-[1em_0em] grid grid-cols-4 sm:grid-cols-9 w-full self-center font-medium text-gray-600 text-[0.6em] sm:text-[0.85em] md:text-[1em]"
          >
            <div className="sm:col-span-3 flex items-center font-semibold text-gray-700">
              <img
                src={cryptoItem.imgSrc}
                alt=""
                className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
              />
              <p className="ml-[0.5em] ">{cryptoItem.fullName}</p>
              <p className="ml-[0.4em] text-gray-500 text-[0.5em] sm:text-[0.65em] md:text-[0.8em]">
                {cryptoItem.name}
              </p>
            </div>
            <p className="sm:col-span-2">
              ₽{formatNumberWithSpaces(cryptoItem.lastPrice)}
            </p>
            <p
              className={
                "sm:col-span-2 " +
                (String(cryptoItem.lastChange)[0] === "-"
                  ? "text-red-700"
                  : "text-green-600")
              }
            >
              {cryptoItem.lastChange}%
            </p>
            <p className="sm:col-span-2 text-end">
              ₽{formatNumberWithSpaces(cryptoItem.capitalization)}M
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
