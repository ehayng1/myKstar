import React from "react";
import "../Dictionary.css";
const WordList = ({ words, onStartQuiz }) => {

  return (
    <header>
      <h1>Bookmark</h1>
      <section className="word-list">
        {words.map((word, index) => {

          const { koreanWord, koreanDefinition, englishWord } = word;

          return (
            <aside className="wordcard" key={index}>
              <h2> {koreanWord} </h2>
              <h3> {englishWord} </h3>
              <p> {koreanDefinition} </p>
            </aside>
          )
        })}
      </section>
      <button onClick={onStartQuiz}>Start Quiz</button>
    </header>
  );
};

export default WordList;
