import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import EditIcon from "@mui/icons-material/Edit";
import "./Goal.css";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

export default function Goal() {
  return (
    <div style={{ width: "30%", marginTop: "2rem", padding: "1rem" }}>
      <h3>Goal</h3>
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>20 Words</div>
          <div className="editIcon">
            <EditIcon fontSize="small"></EditIcon>
          </div>
        </div>

        <BorderLinearProgress
          className="progressBar"
          variant="determinate"
          value={20}
        />
        <div className="completeText">20% Complete</div>
      </div>
      <div>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>40 mins / day</div>
          <div className="editIcon">
            <EditIcon fontSize="small"></EditIcon>
          </div>
        </div>
        <BorderLinearProgress
          className="progressBar"
          variant="determinate"
          value={40}
        />
        <div className="completeText">40% Complete</div>
      </div>
    </div>
  );
}
