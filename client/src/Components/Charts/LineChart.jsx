import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import authContext from "../../context/auth-context";
import { useState, useContext } from "react";

const LineChart = () => {
  const context = useContext(authContext);

  const userId = context.userId;

  const [category, setCategory] = useState("");
  const [month, setMonth] = useState("");
  const [week, setWeek] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [firstName, setFirstName] = useState("");

  // getAllFeedback is returning undefinded. I need to get the data from the database and display it in the chart.

  useEffect(() => {
    let requestBody = {
      query: `
            query {
                getAllFeedback(userId: "${userId}") {
                    _id
                    category
                    month
                    week
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
        console.log("This is the res data: " + resData.data);
        setCategory(resData.data.getAllFeedback.category);
        setMonth(resData.data.getAllFeedback.month);
        setWeek(resData.data.getAllFeedback.week);
        setFeedback(resData.data.getAllFeedback);
        setFirstName(resData.data.getAllFeedback.user.firstName);
        console.log("This is the feedback: " + feedback);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const data = {
    datasets: [
      {
        label: `${firstName}'s ${month} ${category} Feedback`,
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
        labels: week,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
