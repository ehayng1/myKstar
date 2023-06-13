import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Choices from "./Choices";
import Result from "./Result";
// import { setQuizScore } from "../../utils/Firebase/Score/score.firebase";
import {
  addBookmark,
  getBookmark,
} from "../../utils/Firebase/Bookmark/bookmark.firebase";
export function Quiz() {
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const [bookMark, setbookMark] = useState([]);
  const [ans, setAns] = useState("");
  const [stage, setStage] = useState(0);
  const [score, setScore] = useState(0);
  let shuffled = [];
  let choices = [];

  // gets bookmarked words
  useEffect(() => {
    const init = async () => {
      setbookMark(await getBookmark());
      shuffled = shuffle(bookMark);
      console.log(bookMark);
    };
    init();
    // console.log(bookMark);
  }, []);

  // when answer is updated, check answer
  useEffect(() => {
    const init = async () => {
      function handleCheckAns(ans, word) {
        console.log("ANS: ", ans);
        console.log("WORD: ", word);
        if (ans === word) {
          setScore(score + 1);
          console.log("Correct!");
        }
      }
      console.log(bookMark[stage]);
      bookMark[stage] && handleCheckAns(ans, bookMark[stage - 1].baseFormEng);
    };
    init();
  }, [stage]);

  function handleClick(answer) {
    setAns(answer);
    setStage(stage + 1);
    if (stage == bookMark.length) {
      finish();
    }
  }
  function finish() {
    // uploading score functions goes here
  }

  return (
    <div style={{}}>
      {/* {!Array.isArray(bookMark) && !bookMark.length && !bookMark.length < 4
       */}
      {bookMark === undefined || bookMark.length < 4 ? (
        // {bookMark && bookMark.length < 4
        <div
          style={{
            textAlign: "center",
            marginTop: "40vh",
            fontSize: "1.5rem",
            color: "#808080",
          }}
        >
          Please bookmark at least 4 words before taking the quiz!
        </div>
      ) : (
        stage < bookMark.length && (
          <div
            style={{
              fontSize: "4rem",
              marginTop: "3rem",
              marginLeft: "4rem",
            }}
          >
            <h2 style={{ width: "20%", margin: "0px auto" }}>
              {bookMark[stage].baseForm}
            </h2>{" "}
            {/* <div style={{ marginLeft: "5rem" }}>Stage: {stage}</div>
          <div style={{ marginLeft: "5rem" }}>Score: {score}</div> */}
            <div
              style={{ width: "60%", margin: "0px auto", marginTop: "3rem" }}
            >
              <Choices
                word={bookMark[stage]}
                wordList={bookMark}
                handleClick={handleClick}
              ></Choices>
            </div>
          </div>
        )
      )}
      {/* <div style={{ marginLeft: "5rem" }}>{ans}</div> */}
      {stage === bookMark && bookMark.length && <Result></Result>}
      {/* <Choices word={bookMark[0]} wordList={shuffled}></Choices> */}
      {/* <div className="options_container">
          {options.map((word, i) => {
            return (
              <button
                className="option_button"
                key={i}
                onClick={() => handleClicked(bookMark.eng)}
              >
                {bookMark.eng}
              </button>
            );
          })}
        </div> */}
    </div>
  );
}
