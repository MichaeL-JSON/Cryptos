import { useEffect, useState } from "react";
import LayoutBorderRadius from "../layouts/LayoutBorderRadius";

import { news } from "../data/news";
import PostNews from "../components/PostNews/PostNews";
import { useDebounce } from "../hooks/useDebounce";

const News = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayed, setDisplayed] = useState(10);
  const [term, setTerm] = useState("");
  const debounceSearch = useDebounce(term, 600);

  const showMore = () => {
    setDisplayed(prev => prev + 10);
  };

  const handleSearch = e => {
    setDisplayed(10);
    setTerm(e.target.value);
  };

  const getSearchNews = value => {
    try {
      const filtered = data.filter(item => {
        return item.title.toLowerCase().includes(value.toLowerCase());
      });
      setFilteredData(filtered);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getContent = data => {
    return data.slice(0, displayed).map(item => {
      return (
        <PostNews
          key={item.title + item.date}
          title={item.title}
          content={item.content}
          image={item.image}
        />
      );
    });
  };

  const renderButton = () => {
    const total = filteredData.length > 0 ? filteredData.length : data.length;
    const count = total - displayed < 10 ? Math.floor(total % displayed) : 10;
    if (data.length > 0 && filteredData.length > 0 && displayed < total) {
      return (
        <button
          className="block mx-auto mt-16 border-2 p-2 rounded-lg"
          onClick={showMore}
        >
          Добавить ещё {count} новостей
        </button>
      );
    }
  };

  const msgNotSearchData =
    filteredData.length === 0 && debounceSearch ? (
      <div className="flex justify-center mt-14">Not Search Data</div>
    ) : null;

  useEffect(() => {
    const getData = () => {
      setTimeout(() => {
        setIsLoading(false);
        setData(news.content);
      }, 3000);
    };
    getData();
    console.log("useEffect#1");
  }, []);

  useEffect(() => {
    if (debounceSearch) {
      setIsLoading(true);
      setTimeout(() => {
        getSearchNews(debounceSearch);
      }, 1500);
      console.log("useEffect#2");
    } else {
      setFilteredData([]);
    }
  }, [debounceSearch]);

  return (
    <LayoutBorderRadius>
      <div className="flex justify-space-between items-center gap-4">
        <div className="relative w-full rounded-md shadow-md">
          <input
            type="text"
            name="search"
            id="search"
            className="block w-full rounded-md border-0 py-2.5 pl-3 pr-20 text-gray-900 font-medium ring-1 ring-inset ring-gray-300 tracking-widest placeholder:text-gray-400 focus:outline-0 sm:text-sm sm:leading-6"
            placeholder="Search..."
            value={term}
            onChange={handleSearch}
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
      <>
        {!isLoading ? (
          <>
            <div>
              {term !== "" ? getContent(filteredData) : getContent(data)}
              {msgNotSearchData}
            </div>
            {renderButton()}
          </>
        ) : (
          <div className="flex mt-14 justify-center font-medium tracking-widest text-2xl">
            Loading...
          </div>
        )}
      </>
    </LayoutBorderRadius>
  );
};

export default News;
