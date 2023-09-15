import React from "react";
import Navbar from "./components/Navbar";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Axios from 'axios';
import Home from './components/pages/Home';
import RoomList from './components/pages/RoomList';
import Room from './components/pages/Room';

function App() {

  //empty room gets deleted after 10 minutes
  window.setInterval(function () {
    checkRoomEmpty();
  }, 60000);

  const checkRoomEmpty = async () => {
    try {
      const res = await Axios.get(`https://gruppe8.toni-barth.com/rooms`);
      res.data.rooms.forEach(async room => {
        const usersInRoom = await Axios.get(`https://gruppe8.toni-barth.com/rooms/` + room.name + `/users`);
        if (usersInRoom.data.users.length === 0) {
          await Axios.post(`https://gruppe8.toni-barth.com/users`, { name: "temp" });
          const users = await Axios.get(`https://gruppe8.toni-barth.com/users`);
          const lastUserID = users.data.users[users.data.users.length - 1].id;

          await Axios.put(`https://gruppe8.toni-barth.com/rooms/` + room.name + `/users`, { "user": lastUserID });
          // await new Promise((resolve) => setTimeout(resolve, 1000));
          await Axios.delete(`https://gruppe8.toni-barth.com/rooms/` + room.name + `/users`, { data: { "user": lastUserID } });

          await Axios.delete(`https://gruppe8.toni-barth.com/users/` + lastUserID);
        }
      });

      //delete all users
        // const allUsers = await Axios.get(`https://gruppe8.toni-barth.com/users/`);
        // const lastUserID = allUsers.data.users[allUsers.data.users.length-1].id;
        // await Axios.delete(`https://gruppe8.toni-barth.com/users/`+lastUserID);

    } catch (e) {
      return e;
    }
  }

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='' exact Component={Home} />
          <Route path='/home/' exact Component={Home} />
          <Route path='/room-list/' exact Component={RoomList} />
          <Route path='/:roomname/' exact Component={Room} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
