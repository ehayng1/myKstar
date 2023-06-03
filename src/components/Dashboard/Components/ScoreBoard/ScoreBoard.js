import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../../../utils/Firebase/Firebase";
import "./ScoreBoard.css";

export function ScoreBoard() {
  const [scores, setScores] = useState([]);

  function getHighestScore(user) {
    const songScore = user.highScore.song || 0;
    const quizScore = user.highScore.quiz || 0;
    return {
      name: `${user.firstName} ${user.lastName}`,
      type: "Song",
      singScore: songScore,
      quizScore: quizScore,
    };
    // if (songScore > quizScore) {
    //   return {
    //     name: `${user.firstName} ${user.lastName}`,
    //     type: "Song",
    //     score: songScore,
    //   };
    // } else {
    //   return {
    //     name: `${user.firstName} ${user.lastName}`,
    //     type: "Quiz",
    //     score: quizScore,
    //   };
    // }
  }

  useEffect(() => {
    onValue(ref(database, "/users"), (snapshot) => {
      const users = Object.values(snapshot.val());
      if (users) {
        const highestScores = users
          .map((user) => getHighestScore(user))
          // .sort((a, b) => b.score - a.score)
          .sort(
            (a, b) => b.singScore + b.quizScore - (a.singScore + a.quizScore)
          )
          .slice(0, 10);
        setScores(highestScores);
      }
    });
  }, []);

  return (
    <div
      style={{
        width: "30%",
        padding: "0rem 1rem",
      }}
    >
      <main className="loggedIn">
        <h3 style={{ marginBottom: "2rem" }}> Scoreboard </h3>
        <div
          style={{
            display: "flex",
            marginBottom: "1rem",
            justifyContent: "center",
          }}
        >
          <div className="headerText" style={{ flex: 1 }}></div>
          <div className="headerText" style={{ flex: 5 }}>
            name
          </div>
          <div className="headerText" style={{ flex: 2 }}>
            song
          </div>
          <div className="headerText" style={{ flex: 2 }}>
            quiz
          </div>
        </div>
        {scores.map((score, index) => {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // className: "list",
                className: "rankList",
              }}
            >
              <div
                style={{
                  fontSize: "1.5rem",
                  flex: 1,
                  // fontWeight: 800,
                  fontWeight: index < 3 ? 600 : 400,
                  //   color: "#d4af37",
                  color:
                    index === 0
                      ? "#d4af37"
                      : index === 1
                      ? "#c0c0c0"
                      : index === 2
                      ? "#cd7f32"
                      : "black",

                  //   platnium : #e5e4e2 brass: #b5a642
                }}
              >
                {index + 1 + ". "}
              </div>
              <div className="rankList" style={{ flex: 5 }}>
                {score.name}
              </div>
              <div className="rankList" style={{ flex: 2 }}>
                {score.singScore}
              </div>
              <div className="rankList" style={{ flex: 2 }}>
                {score.quizScore}
              </div>
            </div>
          );
        })}

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
