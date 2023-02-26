import LoginButton from "../auth/SignIn";
import LogoutButton from "../auth/SignOut";
import Profile from "../Components/Profile/Profile";

export const Dashboard = () => {
  return (
    <div class="bg-gray-100 min-h-screen">
      <header class="bg-white shadow"></header>
      <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="bg-white rounded-lg shadow px-4 py-5 sm:p-6 mb-8">
          <h2 class="text-lg font-medium leading-6 text-gray-900">
            Interview Tip of the Day
          </h2>
          <p class="mt-1 text-sm text-gray-500">Here's your tip for today:</p>
          <p class="mt-3 text-lg font-medium leading-6 text-gray-900">
            Research the company before the interview to learn about their
            culture and values.
          </p>
        </div>
        <div class="bg-white rounded-lg shadow px-4 py-5 sm:p-6">
          <h2 class="text-lg font-medium leading-6 text-gray-900">
            Interview Question of the Day
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            Here's your question for today:
          </p>
          <p class="mt-3 text-lg font-medium leading-6 text-gray-900">
            What's your biggest achievement?
          </p>
        </div>
        <div class="px-4 py-6 sm:px-0">
          <div class="flex justify-center items-center mb-4">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              <LoginButton>Log In</LoginButton>
            </button>
          </div>
          <div class="flex justify-center items-center mb-8">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              <LogoutButton>Log Out</LogoutButton>
            </button>
          </div>
          <Profile />
        </div>
      </main>
    </div>
  );
};
