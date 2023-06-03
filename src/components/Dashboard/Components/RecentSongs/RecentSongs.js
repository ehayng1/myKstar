import { RecentSongCard } from "../../../Cards/Cards";
import { Link } from "react-router-dom";
import "../../dashboard.css";

export default function RecentSongs() {
  const songs = [
    // album_url, artist, title
    { album_url: 'https://lh3.googleusercontent.com/vYnAGmLOhdCYC3qj7VYkEXAsY6lu2VE0LGOBhPgSS__GjdgMwu2CZDlDjJd4up21_sCMUxovlzvrnG7i4t_o1-GRxP4nEu-w_e83brKewKL_BFiX=w960-rj-nu-e365', title: 'Song 1', artist: 'Singer 1' },
    { album_url: 'https://external-preview.redd.it/MY3_HQFLzswJrX8tYEEbBuodnWH67nqf5gDYSZrFh0s.jpg?auto=webp&s=c75ba2d2994db81df63721b8da0af2316dd3df86', title: 'Song 2', artist: 'Singer 2' },
    { album_url: 'https://media.pitchfork.com/photos/6092f075f85a3980dcfb9b04/1:1/w_3000,h_3000,c_limit/itzy_guess_who_album_artwork.jpg', title: 'Song 3', artist: 'Singer 3' },
  ];
  return (
    <div className="recent-songs">
      <h2>
        Recent Songs
        <Link to={"/learn"}>View All</Link>
      </h2>
      {songs.map((song, index) => (
        <RecentSongCard key={index} {...song} />
      ))}
    </div>
  )
}