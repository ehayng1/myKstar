// import React from "react";
import * as React from "react";
import { parseStringPromise } from "xml2js";
import WordDialog from "../../../../components/Dialog/Dialog";

export const Lyrics = ({ lyrics, currentLineIndex }) => {
  const [open, setOpen] = React.useState();
  // let open;
  const [wordInfo, setWordInfo] = React.useState({});
  const getKoreanDefinition = async (event, word) => {
    const url = "https://krdict.korean.go.kr/api/search";
    const key = "CB4BED3D7805E0C81E978DC973449090";
    event.stopPropagation();
    const q = word;
    const translated = "y";
    const trans_lang = "1";
    const response = await fetch(
      `${url}?key=${key}&q=${q}&translated=${translated}&trans_lang=${trans_lang}`
    );
    const text = await response.text();
    const json = await parseStringPromise(text);
    const item = json.channel.item?.[0];
    let pronounciation;
    let origin;
    let wordGrade;
    let tempWordInfo = {};
    // if word is searched
    if (item) {
      tempWordInfo.baseForm = item.word[0];
      tempWordInfo.baseFormEng =
        json.channel.item?.[0].sense?.[0].translation?.[0].trans_word[0];
      tempWordInfo.pos = item.pos[0];
      tempWordInfo.link = item.link[0];
      tempWordInfo.kor = json.channel.item?.[0].sense?.[0].definition[0];
      tempWordInfo.eng =
        json.channel.item?.[0].sense?.[0].translation?.[0].trans_dfn[0];
      if (item.pronunciation) {
        pronounciation = item.pronunciation[0];
        tempWordInfo.pronounciation = pronounciation;
      }
      if (item.origin) {
        origin = item.origin[0];
        tempWordInfo.origin = origin;
        // alert(origin);
      }
      if (item.word_grade) {
        wordGrade = item.word_grade[0];
        tempWordInfo.grade = wordGrade;
        // alert(wordGrade);
      }
      setWordInfo(tempWordInfo);
      setOpen(true);
      console.log(open);
    } else {
      alert("No definition found");
    }

    // change alert to MUI modal
  };

  const extractKoreanWords = (sentence) => sentence.match(/[\uAC00-\uD7AF]+/g);

  const generateLyric = (sentence) => {
    if (sentence === "") {
      return "•";
    } else {
      const words = sentence.split(/\s+/);
      const koreanWords = extractKoreanWords(sentence);
      const lyrics = words.map((word, i) => {
        if (koreanWords?.includes(word)) {
          return (
            <>
              {" "}
              <a key={i} onClick={(event) => getKoreanDefinition(event, word)}>
                {/* {` ${word} `} &nbsp; */}
                {`${word}`}
              </a>
            </>
          );
        }
        // use for loop on getKoreanDefinition to search for base form
        else {
          return ` ${word} `;
        }
      });
      return lyrics;
    }
  };
  return (
    <div className="lyrics">
      {lyrics.map((item, index) => (
        <div
          key={index}
          className={currentLineIndex === index ? "highlighted" : ""}
          // note={item.note}
        >
          {generateLyric(item.line)}
        </div>
      ))}
      <WordDialog
        isOpen={open}
        wordInfo={wordInfo}
        handleClose={() => setOpen(false)}
      ></WordDialog>
    </div>
  );
};
