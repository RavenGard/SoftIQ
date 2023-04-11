import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import authContext from "../../context/auth-context";
import { useState, useContext } from "react";

const LineChart = () => {
  const context = useContext(authContext);

  const userId = context.userId;

  const [feedback, setFeedback] = useState([
    { user: { firstName: "" }, month: "", category: "", score: 0, week: "" },
  ]);

  const calcAverageWeeklyScore = (feedback) => {
    let week1Sum = 0;
    let week2Sum = 0;
    let week3Sum = 0;
    let week4Sum = 0;
    let week1Avg = 0;
    let week2Avg = 0;
    let week3Avg = 0;
    let week4Avg = 0;
    let week1Count = 0;
    let week2Count = 0;
    let week3Count = 0;
    let week4Count = 0;

    feedback.forEach((element) => {
      if (element.week === "Week 1") {
        week1Sum += element.score;
        console.log("This is the element.score: " + element.score);
        week1Count++;
      } else if (element.week === "Week 2") {
        week2Sum += element.score;
        week2Count++;
      } else if (element.week === "week 3") {
        week3Sum += element.score;
        week3Count++;
      } else if (element.week === "week 4") {
        week4Sum += element.score;
        week4Count++;
      }
    });
    week1Avg = week1Sum / week1Count;
    week2Avg = week2Sum / week2Count;
    week3Avg = week3Sum / week3Count;
    week4Avg = week4Sum / week4Count;

    console.log("Week 1 Avg: " + week1Avg);
    console.log("Week 2 Avg: " + week2Avg);
    console.log("Week 3 Avg: " + week3Avg);
    console.log("Week 4 Avg: " + week4Avg);

    return [week1Avg, week2Avg, week3Avg, week4Avg];
  };

  useEffect(() => {
    //TODO: Data could not be retrieved because we were trying to set single values to an array. We need to set the entire array to the state.
    //TODO: Week 1 is plotted multiple times here on the x axis. We need to fix this. Need to be able to plot multiple points between week 1 and week 2, etc..

    let requestBody = {
      query: `
            query {
                getAllFeedback(userId: "${userId}") {
                    _id
                    category
                    month
                    week
                    score
                    user {
                        firstName
                    }
                }
            }
          `,
    };
    fetch("http://localhost:3000/softiq", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        setFeedback(
          resData.data.getAllFeedback.filter(
            (data) => data.category === "Eye Contact"
          )
        );
        console.log("This is the feedback: " + feedback);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const data = {
    datasets: [
      {
        label: `${feedback[0].user.firstName}'s ${feedback[0].month} ${feedback[0].category} Feedback`,
        data: calcAverageWeeklyScore(feedback),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category",
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

// import React, { useState } from "react";
// import { Bar } from "react-chartjs-2";

//

// const ChartWithReport = ({ data, options }) => {
//   const [selectedData, setSelectedData] = useState(null);

//

//   const handleClick = (event) => {
//     const { datasetIndex, index } = event;
//     const clickedData = data.datasets[datasetIndex].data[index];
//     setSelectedData(clickedData);
//   };

//

//   return (
// <div>
// <Bar data={data} options={options} onClick={handleClick} />
//       {selectedData && <Report data={selectedData} />}
// </div>
//   );
// };

//

// const Report = ({ data }) => {
//   // render the report with the selected data
// };

//

// export default ChartWithReport;

export default LineChart;
