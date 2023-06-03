import { useEffect, useState } from "react";
// import ChartCard from "./Components/ChartCard/ChartCard";
// import RecentSongs from "./Components/RecentSongs/RecentSongs";
// import RecentWords from "./Components/RecentWords/RecentWords";
import { ScoreBoard } from "./Components/ScoreBoard/ScoreBoard";
import Recent from "./Components/Recent/Recent";
import Goal from "./Components/Goals/Goal";
import Summary from "./Components/Summary/Summary";
import { getUser } from "../../utils/Firebase/Users/users.firebase";
import { auth } from "../../utils/Firebase/Firebase";

import "./dashboard.css";

export default function Dashboard() {
  return (
    <div class="container" style={{ display: "flex", flexWrap: "wrap" }}>
      <Summary sx={{ padding: "1rem" }}></Summary>
      <ScoreBoard></ScoreBoard>

      <Recent></Recent>
      <Goal></Goal>
    </div>
    // <div class="grid-container">
    //   <div class="summary">
    //     {" "}
    //     {/* <Summary></Summary> */}
    //   </div>
    //   <div class="scoreBoard">2</div>
    //   <div class="recommendations">{/* <RecentWords /> */}</div>
    //   <div class="goals">{/* <RecentSongs /> */}</div>
    // </div>
  );
}
