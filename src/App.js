import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";
import Home from './components/pages/Home';
import RoomList from './components/pages/RoomList';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/watch2gether' exact Component={Home} />
          <Route path='/room-list' exact Component={RoomList} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
