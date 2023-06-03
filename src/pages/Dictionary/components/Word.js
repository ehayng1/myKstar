
import React from "react";
import "../Dictionary.css";

const Word = ({ word, onAddWord }) => {
  const { koreanWord, koreanDefinition, englishWord, englishDefinition } = word;

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = koreanWord;
    utterance.lang = 'ko-KR';
    utterance.pitch = 1;
    utterance.rate = 0.75;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div>
      <div className="header">
        <button className="button" onClick={speak}> 🔊 </button>
        <h1 className="h1">{koreanWord}</h1>
        <button className="button" onClick={async () => await onAddWord(word)}> ⭐️ </button>
      </div>

      <section>
        <aside className="wordcard">
          <h3>{englishWord} </h3>
          <p>{koreanDefinition}</p>
          <p>{englishDefinition}</p>
        </aside>
      </section>
    </div>
  );
};

export default Word;
