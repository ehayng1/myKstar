import React from "react";
import "./Summary.css";
import "./LineChart";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import * as data from "./data";
import { Line } from "react-chartjs-2";
import { flexbox } from "@mui/system";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Summary() {
  return (
    // <div style={{ display: "flex", flexDirection: "column" }}>
    <div
      style={{
        width: "70%",
        height: "30%",
        padding: "0rem 1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h3 style={{ alignSelf: "flex-start" }}>Summary</h3>
      <div className="pieChart">
        <Pie data={data.pieData} options={data.pieOption} />
      </div>
      <div
        style={{ display: "flex", justifyContent: "space-evenly", gap: "5%" }}
      >
        <div className="lineChart">
          <Line options={data.scoreOptions} data={data.scoreData}></Line>
        </div>
        <div className="lineChart" style={{ marginLeft: "2%" }}>
          <Line
            options={data.wordsLearnedOption}
            data={data.wordsLearnedData}
          ></Line>
        </div>
      </div>
    </div>
  );
}
