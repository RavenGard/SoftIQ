import { Link } from "react-router-dom";
import interviewImage from "../assets/job-interview.png";

export const Signin = () => {
  return (
    <div class="flex flex-row justify-center mt-12">
      <div class="mt-8 pl-5">
        <img src={interviewImage} />
      </div>
      <div class="max-w-lg mt-8 ml-20">
        <h1 class="text-5xl font-extrabold text-slate-600 mb-2 py-8">
          SoftIQ
          <small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">
            Welcome back. We're excited to help you with your interview prep!
          </small>
        </h1>
        <form>
          <div class="mb-6">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div class="mb-6">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div class="flex items-start mb-6">
            <div class="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              for="remember"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
          <div class="flex flex-col ">
            <button
              type="submit"
              class="text-white bg-slate-500 hover:bg-slate-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Log In
            </button>

            <Link to={"/signup"}>
              <a
                href="#responsive-header"
                class="inline-block text-md px-4 py-2 leading-none text-black hover:text-teal-500 hover:bg-white mt-4"
                //"block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                New here? Sign up!
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
