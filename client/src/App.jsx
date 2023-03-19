import { Dashboard } from "./screens/Dashboard";
import { Feedback } from "./screens/Feedback";
import { Tips } from "./screens/Tips";
import { LoggedInDash } from "./screens/LoggedInDash";
import { Interview } from "./screens/Interview";
import { Contact } from "./screens/Contact";
import { Route, Routes } from "react-router-dom";
import { Nav } from "./Components/Nav/Nav";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";

function App() {
  return (
    <div class="h-full w-full">
      <Nav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/tips" element={<Tips />} />
        <Route path="/loggedin-dashboard" element={<LoggedInDash />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
