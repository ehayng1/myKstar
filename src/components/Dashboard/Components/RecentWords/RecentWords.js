import { useState, useEffect } from "react";
import { auth } from "../../../../utils/Firebase/Firebase";
import { getUser } from "../../../../utils/Firebase/Users/users.firebase";
import { Link } from "react-router-dom";
import { RecentWordCard } from "../../../Cards/Cards";
import "../../dashboard.css";

export default function RecentWords() {
  const [recentWords, setRecentWords] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const dbUser = await getUser();
        const bookmark = dbUser.bookmark || [];
        setRecentWords(bookmark.length > 3 ? bookmark.slice(-3) : bookmark);
      }
    })
  }, [])

  return (
    <div className="recent-words">
      <h2>
        Recent Words
        <Link to={"/dictionary"}>View All</Link>
      </h2>
      {recentWords.map((word, index) => (
        <RecentWordCard key={index} {...word} />
      ))}
    </div>
  )
}