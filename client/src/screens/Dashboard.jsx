import LoginButton from "../auth/SignIn";
import LogoutButton from "../auth/SignOut";

export const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <LoginButton>Log In</LoginButton>
      <br></br>
      <LogoutButton>Log Out</LogoutButton>
    </div>
  );
};
