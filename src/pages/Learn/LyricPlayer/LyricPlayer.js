import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LyricPlayer.css";
import { BackButton } from "../../../components/Buttons/BackButton";
import { Lyrics } from "./components/Lyrics";
import { Player } from "./components/Player";
import { Scoreboard } from "./components/Scoreboard";
import { setSongScore } from "../../../utils/Firebase/Score/score.firebase";
import SearchIcon from "../../../components/SearchIcon/SearchIcon";

export const LyricPlayer = () => {
  const location = useLocation();
  const song = location.state?.song;
  const { music_url, album_url, artist, title, lyrics } = song || {};

  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const scoreState = useState(null);
  const setScore = scoreState[1];

  const contentRef = useRef(null);
  const audioRef = useRef(null);

  const scrollToHighlightedLine = () => {
    const highlightedElement = document.querySelector(".highlighted");
    if (highlightedElement && contentRef.current) {
      const highlightedHeight = highlightedElement.offsetHeight;
      const contentHeight = contentRef.current.offsetHeight;
      const highlightedTop = highlightedElement.offsetTop;
      const scrollValue =
        highlightedTop - (contentHeight - highlightedHeight) / 2;
      contentRef.current.scrollTop = scrollValue;
    }
  };

  const handleTimeUpdate = async () => {
    const time = audioRef.current.currentTime * 1000;
    setCurrentLineIndex((prevIndex) => {
      const past = lyrics.filter((item) => item.time < time);
      if (past.length !== prevIndex) {
        scrollToHighlightedLine();
      }
      return past.length - 1;
    });
    //
  };

  const handleAudioEnd = async () => {
    const randomScore = Math.floor(Math.random() * 100);
    await setSongScore(randomScore);
    setScore(randomScore);
    audioRef.current.controls = false;
  };

  useEffect(() => {
    window.addEventListener("resize", scrollToHighlightedLine);
    return () => {
      window.removeEventListener("resize", scrollToHighlightedLine);
    };
  }, []);

  return (
    <div className="pbody">
      <BackButton to={"/learn"} />
      <div className="content" ref={contentRef}>
        <Lyrics lyrics={lyrics} currentLineIndex={currentLineIndex} />
      </div>
      <Player
        music_url={music_url}
        album_url={album_url}
        title={title}
        artist={artist}
        audioRef={audioRef}
        handleTimeUpdate={handleTimeUpdate}
        handleAudioEnd={handleAudioEnd}
      />
      <Scoreboard scoreState={scoreState} audioRef={audioRef} />
      {/* <SearchIcon></SearchIcon> */}
    </div>
  );
};
