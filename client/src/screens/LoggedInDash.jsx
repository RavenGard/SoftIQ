import React from "react";
import { Link } from "react-router-dom";

export const LoggedInDash = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <Link
          to="/interview"
          className="block w-full text-center py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Go to Interview
        </Link>
      </div>
    </div>
  );
};
