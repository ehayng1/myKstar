import { PieChart, Pie, Cell, Label } from "recharts";
import "../../dashboard.css";

export default function ChartCard() {
  const goal = 40;
  const currentScore = 32;
  const scoreSet = [
    { name: 'Current', score: currentScore },
    { name: 'Goal', score: goal - currentScore }
  ]

  const colors = [
    "rgb(25.5,127.5,93.5)",
    "rgb(255, 190,51)"
  ];

  return (
    <div>
      <h2 className="h1">Weekly Goals</h2>
      <br /><br />
      <div className="chartCard">
        <span className="tab" />
        <PieChart width={450} height={300} cy="20%" id="piechart">
          <Pie data={scoreSet} dataKey={"score"} outerRadius={150} innerRadius={75} label>
            {
              scoreSet.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))
            }
            <Label value={currentScore / goal * 100 + "%"} position={"center"} fontSize="50px" />
          </Pie>
        </PieChart>
        <><h3 className="h3">Current: {currentScore}<br /><br />Goal: {goal}</h3></>
      </div>
    </div>
  )
}