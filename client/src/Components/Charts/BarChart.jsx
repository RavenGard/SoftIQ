import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import authContext from "../../context/auth-context";
import { useState, useContext } from "react";
import Oops from "../../screens/Oops";

// Moved calcAverageWeeklyScore to ChartHelper.js
import { calcAverageWeeklyScore } from "./ChartHelper";

const BarChart = () => {
  const context = useContext(authContext);

  const userId = context.userId;

  const [feedback, setFeedback] = useState([]);

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
        // This tests if the user has created any feedback before we set the state of the feedback array.
        // Otherwise, we get an error when we try to access the first element of the array.
        if (resData.data.getAllFeedback.length > 0) {
          setFeedback(
            resData.data.getAllFeedback.filter(
              (data) => data.category === "Eye Contact"
            )
          );
        } else {
          console.log("No feedback yet!");
          console.log();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let data;

  if (feedback.length > 0) {
    data = {
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
  }

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

  return (
    <>
      {feedback.length !== 0 ? <Bar data={data} options={options} /> : <Oops />}
    </>
  );
};

export default BarChart;
