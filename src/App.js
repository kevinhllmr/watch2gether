import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from './components/pages/Home';

function App() {
  return (
    <>
      <Router>
      <Navigate from="*" to="/" />
        <Navbar />
        <Routes>
          <Route path='/' exact Component={Home} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
