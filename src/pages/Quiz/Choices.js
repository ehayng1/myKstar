import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { QuizCard } from "../../components/Cards/Cards";
import { createTheme, ThemeProvider } from "@mui/material/styles";
export default function Choices({ word, wordList, handleClick }) {
  //   console.log(word);
  const theme = createTheme({
    palette: {
      grey: {
        main: "#d2d2d2",
      },
    },
  });
  const [choices, setChoices] = useState([]);
  const [chosen, setChosen] = useState(false);
  let temp = [];

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  useEffect(() => {
    const init = async () => {
      function generateChoices() {
        while (temp.length < 3) {
          let rand = getRandomInt(wordList.length);

          let randWord = wordList[rand].baseFormEng;
          if (randWord != word.baseFormEng && !temp.includes(randWord)) {
            // console.log(wordList[rand].baseFormEng);
            temp.push(randWord);
          }
        }
        temp.push(word.baseFormEng);
        temp = shuffle(temp);
        // console.log(choices);
      }
      generateChoices();
    };
    init();
    setChoices(temp);
    // console.log("choices: ", choices);
  }, [word]);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        // maxWidth: "60%",
        gap: "1rem",
      }}
    >
      {choices.length > 0 &&
        choices.map((el, i) => (
          <>
            {/* <QuizCard word={el}></QuizCard> */}
            <ThemeProvider theme={theme}>
              <Button
                // color="grey"
                onClick={() => {
                  // change color to show answers.
                  setChosen(el);
                  // reset colors back
                  setTimeout(() => setChosen(false), 1250);
                  setTimeout(() => handleClick(el), 1250);
                }}
                sx={{
                  textTransform: "lowercase",

                  fontSize: "1.8rem",
                  border: "1px solid #d2d2d2",
                  width: "40%",
                  height: "10rem",
                  // colors wrong  with correct option
                  //   ":hover": {
                  //     backgroundColor: chosen
                  //       ? el === word.baseFormEng
                  //         ? "#008100d6"
                  //         : "#f40909a3"
                  //       : "transparent",
                  //   },
                  //   color: chosen ? "white" : "black",
                  //   color: "white",
                  //   backgroundColor: "#ff000063",

                  //   backgroundColor: chosen
                  //     ? el === word.baseFormEng
                  //       ? "#008100d6"
                  //       : "#f40909a3"
                  //     : "transparent",

                  //colors only correct choice
                  ":hover": {
                    backgroundColor:
                      chosen === el
                        ? chosen === word.baseFormEng
                          ? "#008100d6"
                          : "red"
                        : "transparent",
                  },
                  color: chosen === el ? "white" : "black",
                  fontWeight: chosen === el ? "700" : "400",
                  //   fontWeight: chosen
                  //     ? el === word.baseFormEng
                  //       ? "700"
                  //       : "400"
                  //     : "400",
                  backgroundColor:
                    chosen === el
                      ? chosen === word.baseFormEng
                        ? "#008100d6"
                        : "red"
                      : "transparent",
                }}
                variant="outlined"
              >
                {el}
              </Button>
            </ThemeProvider>
          </>
        ))}
    </div>
  );
}
