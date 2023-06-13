import { SongCard } from "../../../Cards/Cards";
import { downloadSongs } from "../../../../utils/Firebase/Songs/songs.firebase";
import { useState, useEffect } from "react";
import { auth } from "../../../../utils/Firebase/Firebase";
import { getUser } from "../../../../utils/Firebase/Users/users.firebase";
import { RecentWordCard } from "../../../Cards/Cards";
import { RecentSongCard } from "../../../Cards/Cards";

export default function Recent() {
  const [recentWords, setRecentWords] = useState([]);
  const [songs, setSongs] = useState([]);

  // gets songs
  useEffect(() => {
    downloadSongs().then((s) => setSongs(s));
    console.log(songs);
  }, []);

  //gets wordlist
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const dbUser = await getUser();
        const bookmark = dbUser.bookmark || [];
        setRecentWords(bookmark.length > 3 ? bookmark.slice(-2) : bookmark);
      }
    });
  }, []);
  return (
    <div style={{ width: "70%", marginTop: "0rem", padding: "1rem" }}>
      <h3>Recommended for you </h3>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          margin: "auto",
        }}
      >
        {songs.map((song, i) => {
          return i < 2 && <SongCard key={i} song={song} />;
          // <SongCard song={song}></SongCard>;
        })}
        {recentWords.map(
          (wordInfo, index) =>
            index < 2 && <RecentWordCard wordInfo={wordInfo} />
        )}
        {/* </div>
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}> */}
      </div>
    </div>
  );
}
