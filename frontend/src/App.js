import "./App.css";
import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignUp from "./component/user/loginSignUp.js";
import Store from "./store";
import Profile from "./component/user/profile.js";
import UpdateProfile from "./component/user/updateProfile";
import { fetchLoadUser } from "./slice/userSlice";
import Home from "./component/Home/home.js";

function App() {
  React.useEffect(() => {
    Store.dispatch(fetchLoadUser());
  }, []);
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/account" Component={Profile} />
        <Route exact path="/me/update" Component={UpdateProfile} />

        <Route exact path="/login" Component={LoginSignUp} />
      </Routes>
    </Router>
  );
}

export default App;
