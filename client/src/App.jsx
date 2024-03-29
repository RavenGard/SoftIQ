import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthContext from "./context/auth-context";
import { Nav } from "./Components/Nav/Nav";
import { Dashboard } from "./screens/Dashboard";
import { Feedback } from "./screens/Feedback";
import { Tips } from "./screens/Tips";
import { LoggedInDash } from "./screens/LoggedInDash";
import { Interview } from "./screens/Interview";
import { Contact } from "./screens/Contact";
import Signin from "./screens/Signin/Signin";
import Signup from "./screens/Signup/Signup";

function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = (token, userId) => {
    setToken(token);
    setUserId(userId);

    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (storedToken && storedUserId) {
      login(storedToken, storedUserId);
    }
  }, []);

  const location = useLocation();

  return (
    <div className="h-full w-full">
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
