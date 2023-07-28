import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffectOnce } from "../utils/useEfftect";
import axios from "axios";
import { BarChart } from "./BarChart";
Chart.register(CategoryScale);

const BarGraph = () => {
  const [chartData, setChartData] = useState<any>();
  useEffectOnce(() => {
    const serverUrl = "https://disease.sh/v3/covid-19/all";
    const fetchData = async () => {
      await axios.get(serverUrl).then((response) =>
        setChartData({
          labels: Object.keys(response?.data),
          datasets: [
            {
              label: "World Wide Data",
              data: Object.values(response?.data),
              backgroundColor: [
                "rgba(75,192,192,1)",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0",
              ],
              borderColor: "black",
              borderWidth: 2,
            },
          ],
        })
      );
    };
    fetchData();
  });
  return <>{chartData && <BarChart chartData={chartData} />}</>;
};

export default BarGraph;
