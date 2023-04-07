import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import authContext from "../../context/auth-context";
import { useState, useContext } from "react";

const LineChart = () => {
  const context = useContext(authContext);

  const userId = context.userId;
  const [feedback, setFeedback] = useState([
    { user: { firstName: "" }, month: "", category: "", score: 0, week: "" },
  ]);

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
        data: feedback.map((data) => data.score),
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
        labels: feedback.map((data) => data.week),
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
