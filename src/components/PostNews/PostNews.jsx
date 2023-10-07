import { useCallback, useEffect, useRef, useState } from "react";
import parse, { domToReact } from "html-react-parser";

const PostNews = ({ title, content, image }) => {
  const [expanded, setExpanded] = useState(false);
  const [preview, setPreview] = useState("");

  const contentRef = useRef(null);

  const options = {
    replace: ({ attribs, children, name }) => {
      if (!attribs) {
        return;
      }

      if (name === "p") {
        return <p className="mb-4">{domToReact(children, options)}</p>;
      }

      if (name === "a") {
        return (
          <a href={attribs.href} className="border-b-2 border-gray-500">
            {domToReact(children, options)}
          </a>
        );
      }
    }
  };

  const toggleExpand = useCallback(() => {
    const div = contentRef.current;
    const paragraphs = div.querySelectorAll("p");
    const originalText = paragraphs[0].textContent;
    const words = paragraphs[0].textContent.split(" ");
    setPreview(words.slice(0, 20).join(" "));

    if (expanded) {
      paragraphs[0].textContent = originalText;
    }

    for (let i = 0; i < paragraphs.length; i++) {
      if (expanded && paragraphs[i].style.display === "none") {
        paragraphs[i].style.display = "block";
      } else {
        paragraphs[i].style.display = "none";
      }
    }

    setExpanded(prev => !prev);
  }, [expanded]);

  useEffect(() => {
    toggleExpand();
  }, [toggleExpand]);

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
        <h2 className="mb-4 max-w-[80%] font-bold text-3xl [text-wrap:balance]">
          {title}
        </h2>
      </div>
      <div
        className="p-5 h-auto bg-white overflow-hidden font-medium"
        ref={contentRef}
      >
        {parse(content, options)}
        {expanded && (
          <div className="relative mb-4">
            Preview: {preview}
            <span className="relative inline-block right-[100px] bg-gradient-to-r from-transparent from-0% to-white to-55%">
              <button
                className="relative inline-block ml-28"
                onClick={toggleExpand}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ebb839] to-[#c4917e] bg-gradient-125">
                  learn more
                </span>
              </button>
            </span>
          </div>
        )}
      </div>
      <div className="flex gap-3 h-full w-full bg-white rounded-b-[1.5rem]">
        {/* <div className="w-8 h-8 mb-10 rounded-md bg-white shadow-md">
          <a
            href="#"
            className="rounded-md bg-white  w-10 h-10 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
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
          </a>
        </div> */}
        {/* <div className="relative left-4 bottom-4 w-9 h-9 cursor-pointer translate-y-1 rounded-b-[1.5rem] ">
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
        {/* Разметка SVG Полого сердца*/}
        <div className="relative left-4 bottom-4 w-6 h-6 cursor-pointer translate-y-1 rounded-b-[1.5rem] ">
          <svg
            viewBox="0 0 24.00 24.00"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#000000"
            strokeWidth="0.00024000000000000003"
            transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.463 6.02421 11.4664 6.02765 11.4698 6.03106L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM13.4698 8.03034C13.7627 8.32318 14.2376 8.32309 14.5304 8.03014C14.8233 7.7372 14.8232 7.26232 14.5302 6.96948L13.4698 8.03034ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219ZM11.4698 6.03106L13.4698 8.03034L14.5302 6.96948L12.5302 4.97021L11.4698 6.03106Z"
                fill="#ff006a"
              ></path>{" "}
            </g>
          </svg>
        </div>
        {/* Разметка иконки Share */}
        <div className="relative left-4 bottom-4 w-6 h-6 cursor-pointer translate-y-1 rounded-b-[1.5rem]">
          <svg
            viewBox="-0.5 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M13.47 4.13998C12.74 4.35998 12.28 5.96 12.09 7.91C6.77997 7.91 2 13.4802 2 20.0802C4.19 14.0802 8.99995 12.45 12.14 12.45C12.34 14.21 12.79 15.6202 13.47 15.8202C15.57 16.4302 22 12.4401 22 9.98006C22 7.52006 15.57 3.52998 13.47 4.13998Z"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PostNews;
