import React from "react";
import LayoutBorderRadius from "../layouts/LayoutBorderRadius";
import PortfolioList from "../components/portfolio/PortfolioList";
import Charts from "../components/portfolio/Charts";
import HeaderTitle from "../components/portfolio/HeaderTitle";
import Content from "../components/portfolio/Content";
import image from "./../components/portfolio/img/image.png";

const Portfolio = () => {
  return (
    <>
      <LayoutBorderRadius>
        <div
          className="w-full h-full pl-[28px] pt-[31px]"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="grid grid-cols-2">
            <div>
              <HeaderTitle />
            </div>
            <div className="row-span-2">
              <Charts />
            </div>
            <div>
              <Content />
            </div>
          </div>
        </div>
        <div className="px-[28px]">
          <PortfolioList />
        </div>
      </LayoutBorderRadius>
    </>
  );
};

export default Portfolio;
