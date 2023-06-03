import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
// import Word from "./";
import WordList from "./components/WordList";
import WordQuiz from "./components/WordQuiz";
import Search from "./components/Search";
import {
  addBookmark,
  getBookmark,
} from "../../utils/Firebase/Bookmark/bookmark.firebase";

export function Dictionary() {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchedWord, setSearchedWord] = useState();
  const [addedWords, setAddedWords] = useState([]);

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

  return (
    <div>
      <Navbar />
      <div className="loggedIn">
        {currentPage !== 0 && (
          <Link onClick={gotoPreviousPage} className="Links backButton">
            <FontAwesomeIcon
              icon="fa-solid fa-arrow-left"
              style={{ color: "#ffffff" }}
              className="icons"
            />
          </Link>
        )}
        {currentPage === 0 && <Search onSearchWord={handleSearchWord} />}
        {currentPage === 1 && (
          <Word word={searchedWord} onAddWord={handleAddWord} />
        )}
        {currentPage === 2 && (
          <WordList words={addedWords} onStartQuiz={handleStartQuiz} />
        )}
        {currentPage === 3 && <WordQuiz words={addedWords} />}
      </div>
    </div>
  );
}
