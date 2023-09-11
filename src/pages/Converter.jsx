import React from "react";
import { useGetCoinChartQuery } from "../redux";

const Converter = () => {
  // для теста вытащим data здесь
  const { data } = useGetCoinChartQuery({
    id: "bitcoin",
    currency: "usd",
    days: 14
  });

  console.log(data);
  return <div>Converter</div>;
};

export default Converter;
