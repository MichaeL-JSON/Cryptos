import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonCardNews = () => {
  return (
    <SkeletonTheme>
      <div className="mt-5 md:mt-8 border-2 rounded-md md:rounded-[1.5rem]">
        <div style={{ padding: "10px 10px 0 10px" }} className="left-col">
          <Skeleton style={{ borderRadius: "1rem" }} height={300} />
        </div>
        <div className="p-2.5">
          <Skeleton count={3} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonCardNews;
