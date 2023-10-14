import React, { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import parse, { domToReact } from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import Button from "./ui/Button";
import { toggleFavorites } from "../../redux/news/news";
import LikedButton from "./ui/LikedButton/";

const PostNews = ({ id, title, content, image, preview }) => {
  const [expanded, setExpanded] = useState(false);
  const [customPreview, setCustomPreview] = useState(preview);
  const { favorites } = useSelector(state => state.news);

  const dispatch = useDispatch();

  const isExists = favorites.some(n => n.id === id);

  const toggleExpand = () => {
    setExpanded(prev => !prev);
  };

  const options = {
    replace: ({ attribs, children, name }) => {
      if (!attribs) {
        return;
      }

      if (name === "button") {
        return (
          <Button text="learn more" onClick={toggleExpand} type="gradient" />
        );
      }

      if (name === "p") {
        return <p className="mb-4">{domToReact(children, options)}</p>;
      }

      if (name === "a") {
        return (
          <a href={attribs.href} className="border-b-2 border-gray-300">
            {domToReact(children, options)}
          </a>
        );
      }
    }
  };

  const addButtonToPreview = reactElement => {
    const button = <button />;
    return (
      <>
        {reactElement.props.children}
        {button}
      </>
    );
  };

  const renderPreview = () => {
    const reactElement = parse(preview, options);
    const newElement = addButtonToPreview(reactElement);
    const reactElementString = renderToString(<p>{newElement}</p>);
    setCustomPreview(parse(reactElementString, options));
  };

  useEffect(() => {
    renderPreview();
  }, [preview]);

  return (
    <div
      className={`relative w-full h-auto mt-5 md:mt-8 border-2 rounded-md md:rounded-[1.5rem]`}
    >
      <img
        className="w-full h-[400px] object-cover rounded-md md:rounded-t-[1.5rem]"
        src={image}
        alt=""
      />
      <div className="flex items-end absolute top-[120px] left-0 w-full pl-5 h-[280px] bg-gradient-to-t from-[#fff] from-5% to-transparent">
        <h2 className="mb-4 max-w-[70%] font-bold text-3xl [text-wrap:balance]">
          {parse(title)}
        </h2>
      </div>
      <div className="p-5 h-auto bg-white overflow-hidden font-medium">
        {expanded ? (
          <div className="relative mb-4">
            {parse(content, options)}
            <Button text={"roll up"} onClick={toggleExpand} type="outline" />
          </div>
        ) : (
          customPreview
        )}
      </div>
      <div className="flex gap-3 pb-3 pl-3 h-full w-full bg-white rounded-b-[1.5rem]">
        <LikedButton
          onClick={() => dispatch(toggleFavorites(id))}
          isActive={isExists}
        />
      </div>
    </div>
  );
};

export default PostNews;
