/**
 * how would you rate your tone of voice?
 *
 * did you maintain good eye contact?
 *
 * did you avoid babbling?
 *
 * did you avoid word fillers such as 'um' or 'like'?
 *
 * how would you rate your body language (posture, hand movements etc.)?
 *
 * did you dress professionally? ** (yes or no)
 */

// A carousel of compoents that display each feedback prompt to the user.26rem

/* TODO:
 -- save feedback responses to mongoDB
 -- css changes
 -- have scale
*/

import React, { useRef, useState, useEffect, useContext } from "react";
import Emoji from "react-emoji-render";
import authContext from "../../context/auth-context";

// const feedbackPrompts = [
//   "How would you rate your tone of voice?",
//   "How would you rate your eye contact?",
//   "How well did you avoid babbling?",
//   "How well did you avoid word fillers such as 'um' or 'like'?",
//   "How would you rate your body language (posture, hand movements etc.)?",
// ];

const feedbackPrompts = [
  {
    prompt: "How would you rate your tone of voice?",
    category: "Tone",
  },

  {
    prompt: "How would you rate your eye contact?",
    category: "Eye contact",
  },
  {
    prompt: "How well did you avoid babbling?",
    category: "Babbling",
  },
  {
    prompt: "How well did you avoid word fillers such as 'um' or 'like'?",
    category: "Word choice",
  },
  {
    prompt:
      "How would you rate your body language (posture, hand movements etc.)?",
    category: "Body language",
  },
];

const InterviewFeedback = ({ questionId }) => {
  const [currIndex, setCurrIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [scores, setScores] = useState([]);
  const [currScore, setCurrScore] = useState([]);

  const context = useContext(authContext);

  let userId = context.userId;

  const calcAvgScore = (array) => {
    let avg = 0;
    let sum = 0;

    array.forEach((element) => {
    element = parseInt(element);
      sum += element;
    });

    avg = sum / array.length;

    return avg;
  };

  const saveFeedback = (currScore) => {
    console.log("This is the userId: " + userId);
    console.log("This is the questionId: " + questionId);
    console.log("This is the current question rating: " + calcAvgScore(scores));
    console.log("This is the current score: " + currScore);
    console.log("This is the category: " + feedbackPrompts[currIndex].category);

    let requestBody = {
      query: `
          mutation {
            createFeedback(feedbackInput: {score: ${currScore}, category: "${
        feedbackPrompts[currIndex].category
      }", questionRating ${calcAvgScore(
        scores
      )}}, userId: "${userId}", questionId: "${questionId}") {
                score
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
        console.log(resData.data.createFeedback.score);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clickHandler = () => {
    if (currIndex !== feedbackPrompts.length) {
      let newScoresArray = scores;
      newScoresArray.push(currScore)
      setScores(newScoresArray);
    }
    if (currIndex !== feedbackPrompts.length - 1) {
      let nextIndex = currIndex + 1;
      saveFeedback(currScore);
      setCurrIndex(nextIndex);
    } else {
      setDone(true);
    }
  };

  return (
    <div className="mt-20 mb-40 w-3/5 flex flex-col justify-center items-center">
      <p className="text-2xl">{feedbackPrompts[currIndex].prompt}</p>
      {/* <button onClick={() => clickHandler()}>Next Prompt</button> */}

      <select
        id={feedbackPrompts[currIndex].category}
        class="bg-gray-50 mt-2 w-1/2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => setCurrScore(e.target.value)}
      >
        <option selected>Choose your score</option>
        <option value={1}>
          Very Poor <Emoji text="😭" />
        </option>
        <option value={2}>
          Poor <Emoji text="😞" />
        </option>
        <option value={3}>
          Alright <Emoji text="😐" />
        </option>
        <option value={4}>
          Good <Emoji text="🙂" />
        </option>
        <option value={5}>
          Great! <Emoji text="😄" />
        </option>
      </select>

      <div className="flex justify-center">
        <button
          className="mt-5 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
          onClick={() => clickHandler()}
        >
          Next Prompt
        </button>
      </div>
    </div>
  );
};

export default InterviewFeedback;
