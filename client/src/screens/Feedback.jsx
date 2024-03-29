import React, { useState } from "react";
import BarChart from "../Components/Charts/BarChart";
import QuestionList from "../Components/Charts/QuestionList";
import LineChart from "../Components/Charts/LineChart";
export const Feedback = () => {
  const [byDay, setByDay] = useState(false);
  return (
    //
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 p-4">
      <div className="w-full mt-20 bg-gray-100 rounded-lg p-4 border">
        {byDay ? <LineChart /> : <BarChart />}
        <div className="grid grid-cols-2 gap-4 mt-10 border-t-2 border-gray-300 ">
          <button
            className="bg-gray-400 m-auto p-2 rounded-md text-white font-bold mt-3 hover:bg-gray-600"
            onClick={() => setByDay(false)}
          >
            By Week
          </button>
          <button
            className="bg-gray-400 m-auto p-2 rounded-md text-white font-bold mt-3 hover:bg-gray-600"
            onClick={() => setByDay(true)}
          >
            By Day
          </button>
        </div>
      </div>

      <div className="pt-1 w-full mt-20 bg-gray-800 rounded-lg px-2 py-1 border overflow-scroll">
        <QuestionList />
      </div>
    </div>
  );
};
