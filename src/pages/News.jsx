import React, { useCallback, useEffect, useState } from "react";
import LayoutBorderRadius from "../layouts/LayoutBorderRadius";

import { news } from "../data/news";
import PostNews from "../components/PostNews/PostNews";
import { useDebounce } from "../hooks/useDebounce";
import { usePosts } from "../hooks/usePosts";
import { DATA_SORT_LIST as dataList } from "../components/PostNews/const";
import { useDispatch, useSelector } from "react-redux";
import { setNews } from "../redux/news/news";
import FloatingButton from "../components/PostNews/ui/FloatingButton";
import Skeleton from "../components/PostNews/ui/Skeleton";
import { InputNews } from "../components/news/ui/InputNews";

const News = () => {
  const [sortValue, setSortValue] = useState(dataList[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayed, setDisplayed] = useState(10);
  const [term, setTerm] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [isShowFavorites, setIsShowFavorites] = useState(false);

  const { news: stateNews, favorites } = useSelector(state => state.news);
  const favoritesOrAllNews = isShowFavorites ? favorites : stateNews;

  const dispatch = useDispatch();

  const debounceSearch = useDebounce(term, 600);
  const posts = usePosts(favoritesOrAllNews, sortValue.name, debounceSearch);

  const showMore = () => {
    setDisplayed(prev => prev + 10);
  };

  const handleSearch = e => {
    console.log(e.target.value);
    setDisplayed(10);
    setTerm(e.target.value);
  };

  const createPreview = text => {
    const paragraphZero = text.match(/<p>.*?<\/p>/g);
    let preview = paragraphZero[0].split(" ").slice(0, 20).join(" ");

    if (!/<\/a>/.test(preview)) {
      preview = paragraphZero[0].split(" ").slice(0, 30).join(" ");
    }

    if (!/<\/mark>/.test(preview)) {
      preview = paragraphZero[0].split(" ").slice(0, 30).join(" ");
    }

    if (!/<p>[\s\S]*<\/p>$/.test(preview)) {
      preview += "</p>";
    }

    return preview;
  };

  const wrapText = (html, searchText) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const body = doc.querySelector("body");

    const textNodes = [];
    const walk = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walk.nextNode())) {
      textNodes.push(node);
    }

    textNodes.forEach(node => {
      const text = node.textContent;
      const newText = text.replace(
        searchText,
        "<mark className='bg-violet-300'>$&</mark>"
      );

      node.textContent = newText;

      const span = document.createElement("span");
      span.innerHTML = newText;

      node.parentNode.replaceChild(span, node);
    });

    return body.innerHTML;
  };

  const paintingText = useCallback(
    text => {
      const searchRegex = new RegExp(debounceSearch.trim(), "gi");

      if (sortValue.name === "title") {
        return text.replace(searchRegex, match => {
          return `<mark className='bg-violet-300'>${match}</mark>`;
        });
      }

      const result = wrapText(text, searchRegex);
      return result;
    },
    [debounceSearch, sortValue]
  );

  const getContent = data => {
    return data.slice(0, displayed).map(item => {
      const title =
        sortValue.name === "title" && debounceSearch && posts.length > 0
          ? paintingText(item.title)
          : item.title;

      const content =
        sortValue.name === "content" && debounceSearch && posts.length > 0
          ? paintingText(item.content)
          : item.content;

      const preview = createPreview(item.content);
      const highlightedPreview =
        sortValue.name === "content" && debounceSearch && posts.length > 0
          ? paintingText(preview)
          : preview;

      return (
        <PostNews
          key={item.id}
          id={item.id}
          title={title}
          content={content}
          image={item.image}
          preview={highlightedPreview}
        />
      );
    });
  };

  const renderButton = () => {
    const total = posts.length > 0 && posts.length;
    const count = total - displayed < 10 ? Math.floor(total % displayed) : 10;
    if (term && posts.length === 0) {
      return null;
    }

    if (displayed < total) {
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

  // eslint-disable-next-line no-unused-vars
  const onHandleSelect = value => {
    setDisplayed(10);
    setSortValue(value);
  };

  const msgNotSearchData =
    posts.length === 0 && debounceSearch ? (
      <div className="flex justify-center mt-14">Not Search Data</div>
    ) : null;

  useEffect(() => {
    const getData = () => {
      setTimeout(() => {
        setIsLoading(false);
        const newsData = news.content.map((obj, index) => {
          return { id: index + 1, ...obj };
        });
        dispatch(setNews(newsData));
      }, 3000);
    };
    getData();
  }, []);

  return (
    <>
      <LayoutBorderRadius>
        <div className="flex justify-space-between items-center gap-4">
          <InputNews value={term} setValue={handleSearch} />
        </div>
        <>
          {!isLoading ? (
            <>
              <div>
                {getContent(posts)}
                {msgNotSearchData}
                {isShowFavorites && favorites.length === 0 && (
                  <div className="flex justify-center mt-14">
                    Not Favorites News
                  </div>
                )}
              </div>
              {renderButton()}
            </>
          ) : (
            Array(3)
              .fill(0)
              .map((_, index) => <Skeleton key={index} />)
          )}
        </>
      </LayoutBorderRadius>
      <FloatingButton />
    </>
  );
};

export default News;
