import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../utils/Firebase/Firebase";
import { Navbar } from "../../components/Navbar/Navbar";

export function Scoreboard() {
  const [scores, setScores] = useState([]);

  function getHighestScore(user) {
    const songScore = user.highScore.song || 0;
    const quizScore = user.highScore.quiz || 0;
    if (songScore > quizScore) {
      return {
        name: `${user.firstName} ${user.lastName}`,
        type: "Song",
        score: songScore,
      };
    } else {
      return {
        name: `${user.firstName} ${user.lastName}`,
        type: "Quiz",
        score: quizScore,
      };
    }
  }

  useEffect(() => {
    onValue(ref(database, "/users"), (snapshot) => {
      const users = Object.values(snapshot.val());
      if (users) {
        const highestScores = users
          .map((user) => getHighestScore(user))
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);
        setScores(highestScores);
      }
    });
  }, []);

  return (
    <div>
      {/* <Navbar /> */}
      <main className="loggedIn">
        <h1> Scoreboard </h1>
        <div style={{ display: "flex" }}>
          <div>User</div>
          <div>Sing</div>
          <div>Quiz</div>
        </div>
        {/* <table className="table">
          <thead className="tableHead">
            <tr key={"head"} className="tableHeadRow">
              <th className="tableHeadIndex"></th>
              <th className="tableHeadName">
                <span className="tabHead" />
                Name
              </th>
              <th className="tableHeadItem">Quiz</th>
              <th className="tableHeadItem">Sing</th>
            </tr>
          </thead>
          <tbody className="tableBody">
            {scores.map((score, index) => {
              return (
                <tr key={index} className="tableBodyRow">
                  <td className="tableBodyIndex"></td>
                  <td className="tableBodyName">
                    <b>{index + 1}</b>
                    <span className="tabBody" />
                    {score.name}
                  </td>
                  <td className="tableBodyItem">{score.type}</td>
                  <td className="tableBodyItem">{score.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table> */}
      </main>
    </div>
  );
}
