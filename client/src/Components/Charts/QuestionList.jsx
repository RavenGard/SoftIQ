import React, {useEffect, useContext} from 'react'
import { useState } from 'react';
import authContext from "../../context/auth-context";
export const QuestionList = () => {

  const context = useContext(authContext);
  const userId = context.userId;

  const [feedback, setFeedback] = useState([]);

  useEffect(() => {

    let requestBody = {
      query: `
            query {
                getAllFeedback(userId: "${userId}") {
                    _id
                    month
                    day
                    week
                    score
                    user {
                        firstName
                    }
                    question{
                        questionDescription
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
          setFeedback( resData.data.getAllFeedback);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let currentQ = 1;
  

  return (
    <div className='w-full col-span-1 relative lg:h-[50vh] h-[50vh] m-auto p-2 border border-transparent rounded-lg bg-gray-800'>
         <h1 className='text-white flex flex-col items-center font-bold'> FEEDBACK DATA</h1>
        
        <ol>
          {feedback.map((data, id) => (
            
            <li
             key={id}
             className='bg-gray-700 hover:bg-gray-600 rounded-lg my-3 p-2 flex items-center cursor-pointer'
            >
              {/* <div>
                <FcQuestions size={40}/>
              </div> */}
              <div className='py-2' >
                <p className='py-px text-white font-semibold'> {`Q${id + currentQ})  ${data.question.questionDescription}`}  </p>
                <p className='text-white font-bold pl-0'> score: {data.score}</p>   
              </div> 
              <p className='absolute right-6 bg-gray-700 rounded-lg border p-1 text-white text-sm'>{`${data.month}/${data.day}`}</p>
            </li>
          ))}
        </ol>
    </div>
  )
  
}

export default QuestionList;