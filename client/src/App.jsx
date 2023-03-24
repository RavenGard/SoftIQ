import { Outlet, Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import AuthContext from "./context/auth-context";
import { Nav } from "./Components/Nav/Nav";
import { Dashboard } from "./screens/Dashboard";
import { Feedback } from "./screens/Feedback";
import { Tips } from "./screens/Tips";
import { LoggedInDash } from "./screens/LoggedInDash";
import { Interview } from "./screens/Interview";
import { Contact } from "./screens/Contact";
import { Signin } from "./screens/Signin";
import { Signup } from "./screens/Signup";

function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = (token, userId, tokenExpiration) => {
    setToken(token);
    setUserId(userId);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
  };

  const location = useLocation();

  return (
    <div class="h-full w-full">
      <AuthContext.Provider value={{ token, userId, login, logout }}>
        <Nav />
        <Routes>
          {token && (
            <Route
              path="/"
              element={<Navigate replace to="/loggedin-dashboard" />}
            />
          )}
          {token && (
            <Route
              path="/signin"
              element={<Navigate replace to="/loggedin-dashboard" />}
            />
          )}
          {token && (
            <Route
              path="/signup"
              element={<Navigate replace to="/loggedin-dashboard" />}
            />
          )}
          {!token && (
            <Route
              path="/loggedin-dashboard"
              element={<Navigate replace to="/" />}
            />
          )}
          {!token && (
            <Route path="/feedback" element={<Navigate replace to="/" />} />
          )}
          {!token && (
            <Route path="/interview" element={<Navigate replace to="/" />} />
          )}
          <Route path="/" element={<Dashboard />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/loggedin-dashboard" element={<LoggedInDash />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
