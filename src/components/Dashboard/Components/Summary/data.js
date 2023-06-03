export const pieData = {
  labels: ["words learned", "word missed"],
  datasets: [
    {
      label: ["asd", "asd", "1", "2", "2", "4"],
      data: [20, 11],
      backgroundColor: [
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(54, 162, 235, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      //   hoverBorderWidth: [10, 20],
      hoverBackgroundColor: ["blue", "red"],
      hoverOffset: 10,
      borderWidth: 1,
    },
  ],
};

export const pieOption = {
  hover: {
    mode: "index",
    intersect: false,
  },
  animation: {
    animateRotate: true,
    // animateScale: true,
  },
  plugins: {
    title: {
      text: "Quiz Stats",
      display: true,
      font: { size: 20, weight: "normal" },
    },
    legend: {
      position: "bottom",
      labels: {
        font: {
          size: 14,
        },
        generateLabels: (chart) => {
          const datasets = chart.data.datasets;
          return datasets[0].data.map((data, i) => ({
            text: `${chart.data.labels[i]}: ${data}`,
            fillStyle: datasets[0].backgroundColor[i],
            index: i,
          }));
        },
      },
    },
  },
};
function randNumbers(length, max) {
  let data = [];
  for (let i = 0; i < length; i++) {
    data.push(Math.floor(Math.random() * max));
  }
  return data;
}

export const scoreData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Quiz Score",
      //   data: [65, 59, 80, 81, 56, 55, 40],
      data: randNumbers(7, 100),
      //   fill: false,
      //   borderColor: "rgb(75, 192, 192)",
      //   tension: 0.1,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      // hoverBorderWidth: 3,
      hoverBackgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const wordsLearnedData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Words Learned",
      data: randNumbers(7, 100),
      //   fill: false,
      //   borderColor: "rgb(75, 192, 192)",
      //   tension: 0.1,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      // hoverBorderWidth: 3,
      //   hoverBackgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
export const wordsLearnedOption = {
  hover: {
    mode: "dataset",
    intersect: false,
  },
  datasets: {
    line: {
      hoverBorderWidth: 4,
      borderColor: "red",
    },
  },
  animation: {
    delay: 0,
    // delay: 1000,
    animateScale: true,
    x: {
      duration: 3000,
      from: 0,
      delay: 1000,
    },
    y: {
      duration: 1500,
      from: 500,
      delay: 1000,
    },
  },
  plugins: {
    title: {
      text: "Words Learned VS Time ",
      display: true,
      font: { size: 14, weight: "500" },
    },
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      grid: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
  responsive: true,
};

export const scoreOptions = {
  hover: {
    mode: "dataset",
    intersect: false,
  },
  datasets: {
    line: {
      hoverBorderWidth: 4,
      borderColor: "red",
    },
  },
  animation: {
    delay: 0,
    // delay: 500,
    x: {
      duration: 3000,
      from: 0,
      delay: 500,
    },
    y: {
      duration: 1500,
      from: 300,
      delay: 500,
    },
  },
  plugins: {
    title: {
      text: "Quiz Score VS Time ",
      display: true,
      font: { size: 14, weight: "500" },
    },
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      grid: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
  responsive: true,
};
