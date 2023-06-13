import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Link from "@mui/material/Link";
import "./Carousel.css";
const speak = (word) => {
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = word;
  utterance.lang = "ko-KR";
  utterance.pitch = 1;
  utterance.rate = 0.75;
  utterance.volume = 1;
  window.speechSynthesis.speak(utterance);
};
export default function WordToday() {
  var items = [
    {
      name: "복잡하다",
      definitionKor:
        "일, 감정 등이 정리하기 어려울 만큼 여러 가지가 얽혀 있다.",
      definitionEng: "Things, emotions, etc., being too entangled to sort out.",
      level: "Easy",
      pronounciation: "복짜파다",
      pos: "adjective",
      link: "https://krdict.korean.go.kr/dicSearch/SearchView?ParaWordNo=66274",
    },
    {
      name: "Word of the Day #2",
      definitionKor: "Excepteur sint occaecat cupidatat non proident.",
      definitionEng: "Ut enim ad minim veniam commodo",
      level: "Easy",
      pronounciation: "Lorem ipsum",
      pos: "dolor sit",
      link: "",
    },
  ];

  return (
    <Carousel
      //   indicators={false}
      autoPlay={false}
      indicatorContainerProps={{
        style: { marginTop: "2rem" },
      }}
      sx={{
        marginLeft: "25%",
        width: "40%",
        boxShadow: "none",
        borderRadius: "1rem",
        border: "1px solid #d2d2d2",
        padding: "1rem",
      }}
    >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  return (
    <Paper sx={{ boxShadow: "none" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="title">{props.item.name}</div>
        <div className="pronounciation">[{props.item.pronounciation}]</div>
        <VolumeUpIcon
          className="volumeIcon"
          sx={{ marginLeft: "0.5rem", color: "#0052cc" }}
          fontSize="large"
          onClick={() => speak(props.item.name)}
        ></VolumeUpIcon>
      </div>
      <div className="pos">{props.item.pos}</div>
      <p>
        <div className="def">{props.item.definitionKor}</div>
        <div className="defEng">{props.item.definitionEng}</div>
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1.5rem",
          marginTop: "1.5rem",
        }}
      >
        <div className="level">Word Level: </div>
        <div
          style={{ color: "green", marginLeft: "0.5rem" }}
          className="difficulty"
        >
          {" "}
          {props.item.level}
        </div>
      </div>
      <Link href={props.item.link} target="_blank">
        <Button
          sx={{ padding: 0, textDecoration: "underline" }}
          className="CheckButton"
        >
          Full Definition
        </Button>
      </Link>
    </Paper>
  );
}
