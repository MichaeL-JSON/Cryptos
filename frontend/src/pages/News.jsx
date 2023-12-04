import React, { useCallback, useEffect, useState } from "react";
import LayoutBorderRadius from "../layouts/LayoutBorderRadius";

// import { news } from "../data/news";
import PostNews from "../components/PostNews/PostNews";
import { useDebounce } from "../hooks/useDebounce";
import { usePosts } from "../hooks/usePosts";
import { useDispatch, useSelector } from "react-redux";
import { setNews } from "../redux/news/news";
import FloatingButton from "../components/PostNews/ui/FloatingButton";
import Skeleton from "../components/PostNews/ui/Skeleton";
import { InputNews } from "../components/news/ui/InputNews";
import { useGetAllNewsQuery } from "../redux/news/newsApi";

const News = () => {
  const [sortValue, setSortValue] = useState("title");
  const [displayed, setDisplayed] = useState(10);
  const [term, setTerm] = useState("");
  const [isShowFavorites, setIsShowFavorites] = useState(false);

  const { data: dataQuery, isLoading, isFetching } = useGetAllNewsQuery();

  const { news: stateNews, favorites } = useSelector(state => state.news);
  const favoritesOrAllNews = isShowFavorites ? favorites : stateNews || [];

  const dispatch = useDispatch();

  const debounceSearch = useDebounce(term, 600);
  const posts = usePosts(
    favoritesOrAllNews,
    sortValue,
    debounceSearch,
    isShowFavorites
  );

  const showMore = () => {
    setDisplayed(prev => prev + 10);
  };

  const handleSearch = e => {
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

      if (sortValue === "title") {
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
      const getPaintText = (isPaintingNeeded, key) => {
        if (key === "preview") {
          const preview = createPreview(item.content);
          return isPaintingNeeded ? paintingText(preview) : preview;
        }

        return isPaintingNeeded ? paintingText(item[key]) : item[key];
      };
      const isFavorites = isShowFavorites && debounceSearch && posts.length > 0;

      const isSearch = !isFavorites;

      const title = isShowFavorites
        ? getPaintText(isFavorites, "title")
        : getPaintText(isSearch && sortValue === "title", "title");

      const content = isShowFavorites
        ? getPaintText(isFavorites, "content")
        : getPaintText(isSearch && sortValue === "content", "content");

      const preview = isShowFavorites
        ? getPaintText(isFavorites, "preview")
        : getPaintText(isSearch && sortValue === "content", "preview");

      return (
        <PostNews
          key={item.id}
          id={item.id}
          title={title}
          content={content}
          image={item.image}
          preview={preview}
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

  const onHandleSelect = value => {
    setDisplayed(10);
    setSortValue(value);
  };

  const msgNotSearchData =
    posts.length === 0 && debounceSearch ? (
      <div className="flex justify-center mt-14">Not Search Data</div>
    ) : null;

  useEffect(() => {
    dispatch(setNews(dataQuery));
  }, [dataQuery]);

  return (
    <>
      <LayoutBorderRadius>
        <InputNews
          value={term}
          setValue={handleSearch}
          setIsShowFavorites={setIsShowFavorites}
          setSortValue={onHandleSelect}
        />
        <>
          {!isLoading || !isFetching ? (
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
