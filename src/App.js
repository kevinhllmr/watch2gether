import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
// import Axios from "axios";
// import { useState } from "react";
import Home from './components/pages/Home';

function App() {
  // const [users, setUsers] = useState("");

  // Axios.get("https://gruppe8.toni-barth.com/users").then((res) => {
  //   setUsers(res.data.users);
  // });

  return (
    <>
      <Router>
        <Navbar />
        {/* <p>{users}</p> */}
        <Routes>
          <Route path='/' exact Component={Home} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
