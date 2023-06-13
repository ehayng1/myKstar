import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import SearchIcon from "../../components/SearchIcon/SearchIcon";

import WordToday from "../../components/Carousel/Carousel";
import { WordCard } from "../../components/Cards/Cards";
import {
  addBookmark,
  getBookmark,
} from "../../utils/Firebase/Bookmark/bookmark.firebase";

export function Words() {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchedWord, setSearchedWord] = useState();

  // let bookMark = [];

  const gotoNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const gotoPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSearchWord = (word) => {
    setSearchedWord(word);
    gotoNextPage();
  };

  const handleAddWord = async (word) => {
    await addBookmark(word);
    setAddedWords(await getBookmark());
    gotoNextPage();
  };

  const handleStartQuiz = () => {
    gotoNextPage();
  };
  const [Loading, setLoading] = useState(true);
  const [bookMark, setbookMark] = useState([
    {
      baseForm: "단어",
      pos: "noun",
      pronounciation: "단어",
      eng: "word",
      kor: "단어",
    },
  ]);
  useEffect(() => {
    const init = async () => {
      setbookMark(await getBookmark());
      setLoading(false);
    };
    init();
    // console.log(bookMark);
  }, []);

  return (
    <div style={{ marginLeft: "5rem", marginTop: "3rem" }}>
      {/* <WordToday></WordToday> */}
      <WordToday sx={{}}></WordToday>
      {/* <h1>Songs</h1> */}
      <h2 style={{ marginTop: "4rem" }}>Bookmarked Words</h2>
      {/* <h1>Missed Words</h1> */}
      {Loading === false && bookMark !== undefined && (
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
          {bookMark.map((el, i) => {
            return i < 6 && <WordCard wordInfo={el}></WordCard>;
          })}
        </div>
      )}

      <SearchIcon></SearchIcon>
    </div>
  );
}
