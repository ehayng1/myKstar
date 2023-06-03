import React from "react";

export const Player = ({
  music_url,
  album_url,
  title,
  artist,
  audioRef,
  handleTimeUpdate,
  handleAudioEnd,
}) => {
  return (
    <div className="player" style={{ marginLeft: "4rem" }}>
      <div
        className="left"
        style={{ backgroundImage: `url(${album_url})` }}
      ></div>
      <div className="right">
        <div className="top" style={{ textAlign: "center" }}>
          <a className="song">{title}</a>
          <a className="artist">{artist}</a>
        </div>
        <div className="bottom">
          <audio
            style={{ width: "100%" }}
            ref={audioRef}
            muted={true}
            controls={true}
            autoPlay={true}
            name={"media"}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleAudioEnd}
          >
            <source src={music_url} type="audio/mpeg"></source>
          </audio>
        </div>
      </div>
    </div>
  );
};
