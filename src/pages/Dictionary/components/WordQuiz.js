import React, { useEffect, useState } from "react";
import { setQuizScore } from "../../../utils/Firebase/Score/score.firebase";
// import {
//   addBookmark,
//   getBookmark,
// } from "../../utils/Firebase/Bookmark/bookmark.firebase";
import "../Dictionary.css";

function WordQuiz({ words }) {
  const [numCorrect, setNumCorrect] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const otherWords = words.filter((_, index) => {
      return index !== currentWordIndex;
    });
    const shuffledOtherWords = shuffle(otherWords).slice(0, 3);
    setOptions(shuffle([...shuffledOtherWords, currentWord]));
  }, [currentWordIndex]);

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  async function handleClicked(selected) {
    const currentAnswer = words[currentWordIndex].englishWord;
    let newCorrect = numCorrect;
    if (selected === currentAnswer) {
      newCorrect++;
      setNumCorrect(newCorrect);
    }
    if (currentWordIndex === words.length - 1) {
      const score = (newCorrect / words.length) * 100;
      alert(`Your score is : ${score}`);
      await setQuizScore(score);
      setNumCorrect(0);
      setCurrentWordIndex(0);
    } else {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  }

  return (
    <header>
      <h1> {words[currentWordIndex].koreanWord} </h1>
      <h3> Correct: {numCorrect} </h3>
      <div className="options_container">
        {options.map((word, i) => {
          return (
            <button
              className="option_button"
              key={i}
              onClick={() => handleClicked(word.englishWord)}
            >
              {word.englishWord}
            </button>
          );
        })}
      </div>
    </header>
  );
}

export default WordQuiz;
