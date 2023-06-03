import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Scoreboard = ({ scoreState, audioRef }) => {
  const navigate = useNavigate();
  
  const [score, setScore] = scoreState;

  return score && (
    <div className="score">
      <>
        <h1 className="scoreDisplay"> Your score: <br /> 🎤 {score} 🎤</h1>
        <div className="scoreBoardNavBtn">
          <button onClick={() => navigate("/scoreboard")}>Scoreboard</button>
          {/* TODO for Minjun */}
          <button onClick={() => {
            setScore(null);
            audioRef.current.controls = true;
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          }
          }>Practice Again</button>
          <button onClick={() => navigate("/learn")}>Other songs</button>
        </div>
      </>
    </div>
  )
};
