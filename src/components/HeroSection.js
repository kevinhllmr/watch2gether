import React, { useState } from 'react'
import '../App.css'
import { useNavigate } from "react-router-dom";
import { Button } from './Button'
import { Link } from 'react-router-dom';
import './HeroSection.css'
import Axios from 'axios';
import AddUserPopup from './AddUserPopup';

function HeroSection() {

  let navigate = useNavigate();

  const createRoom = async () => {
    try {
      const res = await Axios.post(`https://gruppe8.toni-barth.com/rooms`);
      return res;

    } catch (e) {
      return e;
    }
  }

  const [buttonPopup, setButtonPopup] = useState(false);

  const joinCreatedRoom = async () => {
    if (localStorage.getItem("username") == null) {


      const res = await Axios.get(`https://gruppe8.toni-barth.com/rooms`);
      const lastRoom = res.data.rooms[res.data.rooms.length - 1].name;
      console.log(lastRoom);
      await Axios.delete(`https://gruppe8.toni-barth.com/rooms`,{
        params: {
          name: res.data.rooms[res.data.rooms.length - 1].name
        }
      });



      // setButtonPopup(true);

    } else {
      if(document.getElementById("username") != null) {
        document.getElementById("username").innerHTML = localStorage.getItem("username");
      }

      // createRoom();

      try {
        const res = await Axios.get(`https://gruppe8.toni-barth.com/rooms`);
        const lastRoomName = res.data.rooms[res.data.rooms.length - 1].name;
        navigate(`/` + lastRoomName + `/`);

      } catch (e) {
        return e;
      }
    }
  }

  function logOutUser() {
    localStorage.removeItem("username");
    document.getElementById("logoutbtn").style.display = "none";
    alert("logged out!");
  }

  window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("logoutbtn").style.display = "none";
  });

  return (
    <div className='hero-container'>
      <button
        id='logoutbtn'
        onClick={() => logOutUser()}
      >
        Log out
      </button>
      <img src={process.env.PUBLIC_URL + '/images/homebg.jpg'} alt='background home projector cinema' />
      <AddUserPopup trigger={buttonPopup} setTrigger={setButtonPopup}></AddUserPopup>
      <h2>Create or join a room to get started!</h2>
      <div className='hero-btns'>

        <Button
          className='btns'
          buttonStyle='btn--create'
          buttonSize='btn--large'
          onClick={() => joinCreatedRoom()}
        >
          Create New Room
        </Button><br /><br />
        <Link
          to='/room-list/'
          className='join-room'
        >
          Join Room
        </Link><br /><br />
      </div>
    </div>
  )
}

export default HeroSection