import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BarChart from "../Components/Charts/BarChart";
import QuestionList from "../Components/Charts/QuestionList";

export const LoggedInDash = () => {
  const [randomTip, setRandomTip] = useState(null);
  const [question, setQuestion] = useState({});

  // pull tips from database
  useEffect(() => {
    let requestBody = {
      query: `
            query {
                getTips{
                    tipId
                    tipType
                    tipTitle
                    description
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
          console.log("stuck");
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        const randomTipIndex = Math.floor(
          Math.random() * resData.data.getTips.length
        );
        setRandomTip(resData.data.getTips[randomTipIndex]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // pull question from database
  useEffect(() => {
    let requestBody = {
      query: `
        query {
          getQuestions {
            _id
            questionDescription
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
        const length = resData.data.getQuestions.length;
        console.log("This is the length: " + length);
        const randomQuestion =
          resData.data.getQuestions[Math.floor(Math.random() * length)];
        console.log(
          "This is the random question: " + randomQuestion.questionDescription
        );

        /* 
         this code is redundant; randomQuestion is the object that can be used to access questionDescription ->
         const questionInfo = {
           questionId: randomQuestion._id,
           questionDescription: randomQuestion.questionDescription
         };
         */

        setQuestion(randomQuestion);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 min-h-screen flex items-center justify-center bg-gray-100">
        <div>
          <div className="mx-20 bg-slate-300 p-10 border-solid border-slate-600 rounded-lg">
            <h3 className="text-4xl font-bold text-gray-800">
              Interview Tip of The Day
            </h3>
            {randomTip && <h1 className="py-5">{randomTip.description}</h1>}
          </div>
          <div className="mx-20 mt-20 bg-slate-300 p-10 border-solid border-slate-600 rounded-lg">
            <h3 className="text-4xl font-bold text-gray-800">
              Question of The Day
            </h3>
            {/* need to create a blank interview page that allows the user to answer this question */}
            <Link to={"/interview"}>
              {question && (
                <h1 className="py-5">{question.questionDescription}</h1>
              )}
            </Link>
          </div>
        </div>

        <div className="mr-40 ml-10 bg-white shadow-md rounded-lg p-6 h-2/5">
          <BarChart />
          {/* <QuestionList/> */}
        </div>

        <div className="flex justify-center bg-gray-100 pb-20">
          <Link
            to="/interview"
            className="flex justify-center w-80 text-center py-2 bg-gray-700 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Go to Interview
          </Link>
        </div>
      </div>
    </div>
  );
};
