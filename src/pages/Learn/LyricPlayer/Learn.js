import { useEffect, useState } from "react";
// import { SongCard } from "../../components/Cards/Cards";
import { downloadSongs } from "../../../utils/Firebase/Songs/songs.firebase";
import SongCard from "../../../components/SongCard/SongCard";
import SearchIcon from "../../../components/SearchIcon/SearchIcon";

export function Learn() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    downloadSongs().then((s) => setSongs(s));
    console.log(songs);
  }, []);

  return (
    <div style={{ marginLeft: "5rem" }}>
      <main className="loggedIn">
        <h2> Learn </h2>
        <section style={{ marginTop: "3rem" }}>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {songs.map((song, i) => {
              return <SongCard key={i} song={song} />;
              // <SongCard song={song}></SongCard>;
            })}
          </div>
        </section>
      </main>
      <SearchIcon></SearchIcon>
    </div>
  );
}
