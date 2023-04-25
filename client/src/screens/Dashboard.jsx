import FeedbackChart from "../assets/FeedbackChart.png";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow"></header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              width="1000"
              height="500"
              src="https://www.youtube.com/embed/kayOhGRcNt4"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div className="bg-white flex flex-col items-center rounded-lg shadow px-4 mt-10 py-5 sm:p-6 mb-8">
            <h2 className="text-3xl font-medium leading-6 text-gray-900 mb-10">
              Track your scores and review your feedback!
            </h2>
            <img src={FeedbackChart} alt="score data and feedback" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow px-4 py-5 sm:p-6 mb-8">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Interview Tip of the Day
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Here's your tip for today:
          </p>
          <p className="mt-3 text-lg font-medium leading-6 text-gray-900">
            Research the company before the interview to learn about their
            culture and values.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Interview Question of the Day
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Here's your question for today:
          </p>
          <p className="mt-3 text-lg font-medium leading-6 text-gray-900">
            What's your biggest achievement?
          </p>
        </div>
        <div className="px-4 py-6 mt-10 sm:px-0">
          <div className="flex justify-center items-center mb-4">
            <Link to={"/signin"}>
              <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Log In
              </button>
            </Link>
          </div>
          <div className="flex justify-center items-center mb-4 text-blue-800 text-2xl">
            <Link to={"/signup"}>New Here? Sign Up!</Link>
          </div>
        </div>
      </main>
    </div>
  );
};
