import React, { useEffect, useState } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const Charts = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const [portfolioStore, setPortfolioStore] = useState([
    { id: "bitcoin", price: 30000 },
    { id: "usd-coin", price: 3000 },
    { id: "ethereum", price: 2000 }
  ]);

  useEffect(() => {
    setPortfolioStore([
      { id: "bitcoin", price: 30000 },
      { id: "usd-coin", price: 3000 },
      { id: "ethereum", price: 2000 }
    ]);
  }, []);

  let data = {
    datasets: [
      {
        data: portfolioStore.map(ticker => ticker.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)"
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

export default Charts;
