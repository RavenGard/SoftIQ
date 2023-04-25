import React, { useEffect, useState, useContext } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import authContext from "../../context/auth-context";
import Oops from "../../screens/Oops";

// Moved calcAverageWeeklyScore to ChartHelper.js
import { calcAverageWeeklyScore } from "./ChartHelper";

const LineChart = () => {
  // Gains access to the userId from the authContext. (Global store)
  const context = useContext(authContext);
  const userId = context.userId;

  // State for the feedback array that will be used to plot the chart.
  const [feedback, setFeedback] = useState([]);

  // This useEffect is used to fetch the feedback from the database. We also get the associated user's first name.
  useEffect(() => {
    let requestBody = {
      query: `
            query {
                getAllFeedback(userId: "${userId}") {
                    _id
                    category
                    month
                    week
                    day
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
          // If the user has not created any feedback, we log a message to the console.
          console.log("No feedback yet!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // This is the data object that is passed to the Bar component.
  let data;

  // This checks if the feedback array has any elements. If it does, we set the data object.
  if (feedback.length > 0) {
    // This is the data object being created only if there is feedback data to plot.
    data = {
      datasets: [
        {
          label: `${feedback[0].user.firstName}'s ${feedback[0].month} ${feedback[0].category} Feedback`,
          data: feedback.map((data) => {
            console.log(data.score);
            return data.score;
          }), // returns an array of average scores for each week. (See ChartHelper.js)
          fill: false,
          backgroundColor: "rgb(75, 192, 192)",
          borderColor: "rgba(75, 192, 192, 0.2)",
        },
      ],
    };
  }

  // This is the options object that is passed to the Bar component.
  const options = {
    scales: {
      x: {
        type: "category",
        labels: feedback.map((data) => {
          console.log(data.day);
          return data.day;
        }),
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  // This is the JSX that is returned by the BarChart component.
  return (
    <>
      {feedback.length !== 0 ? (
        <Line data={data} options={options} />
      ) : (
        <Oops />
      )}
    </>
  );
};

export default LineChart;
