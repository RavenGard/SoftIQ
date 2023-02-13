import { Dashboard } from "./screens/Dashboard";
import { Feedback } from "./screens/Feedback";
import { Tips } from "./screens/Tips";
import { LoggedInDash } from "./screens/LoggedInDash";
import { Interview } from "./screens/Interview";
import { SignIn } from "./screens/SignIn";
import { SignUpOne } from "./screens/SignUpOne";
import { SignUpTwo } from "./screens/SignUpTwo";
import { AccountUpdateScreen } from "./screens/AccountUpdateScreen";
import { Contact } from "./screens/Contact";
import { Route, Routes } from "react-router-dom";
import { Nav } from "./Components/Nav/Nav";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/tips" element={<Tips />} />
        <Route path="/loggedin-dashboard" element={<LoggedInDash />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup-one" element={<SignUpOne />} />
        <Route path="/signup-two" element={<SignUpTwo />} />
        <Route path="/acct-update" element={<AccountUpdateScreen />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
