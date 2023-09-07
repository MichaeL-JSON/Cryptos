import React, { useEffect } from "react";

const BASE_URL =
  "https://financialmodelingprep.com/api/v3/fmp/articles?page=0&size=5&apikey=c8092cca65efe2a489a17fa00af07416";

const News = () => {
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(BASE_URL);
        const body = await response.json();
        console.log(body.content);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log(error);
        }
      }
    };
    getData();
  }, []);

  return <div>News</div>;
};

export default News;
