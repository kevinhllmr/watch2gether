import React, { useState, useEffect } from 'react'
import '../App.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './Button'
import './HeroSection.css'
import Axios from 'axios';
import AddUserPopup from './AddUserPopup';
import { lang_de } from './langs/lang_de.js';
import { lang_en } from './langs/lang_en.js';

//hero section component for home page
function HeroSection() {

  //variables for current location and react routing
  const location = useLocation();
  let navigate = useNavigate();

  //as soon as site loads, check if username local storage is null,
  //if not null, show log out button, otherwise hide it
  //sets language
  useEffect(() => {
    if(location.pathname !== "/home/") {
        navigate(`/home/`);
    }

    let userLang = navigator.language || navigator.userLanguage;

    if(document.getElementById("imglng") !== null) {
      if(localStorage.getItem("lang") === "de") {
        lang_de();
        document.getElementById("imglng").src = process.env.PUBLIC_URL + '/images/de.svg';
    
      } else if(localStorage.getItem("lang") === "en") {
        lang_en();
        document.getElementById("imglng").src = process.env.PUBLIC_URL + '/images/gb.svg';

      } else if(userLang === "de") {
        lang_de();
        document.getElementById("imglng").src = process.env.PUBLIC_URL + '/images/de.svg';
        localStorage.setItem("lang", "de");

      } else  {
          // lang_en();
          document.getElementById("imglng").src = process.env.PUBLIC_URL + '/images/gb.svg';
          localStorage.setItem("lang", "en");
      }
    }

    if (document.getElementById("logoutbtn") != null && localStorage.getItem("username") != null || localStorage.getItem("roomname") != null) {
      document.getElementById("logoutbtn").style.display = 'block';

    } else {
      document.getElementById("logoutbtn").style.display = 'none';
    }

    if (document.getElementById("leaveroombtn")) {
      document.getElementById("roomname").innerHTML = localStorage.getItem("roomname");

      if (document.getElementById("roomname").innerHTML != null) {
        document.getElementById("leaveroombtn").style.display = 'block';
      } else {
        document.getElementById("leaveroombtn").style.display = 'none';
      }
    }
  }, []);

  //posts new room into API
  const createRoom = async () => {
    try {
      const res = await Axios.post(`https://gruppe8.toni-barth.com/rooms`);
      return res;

    } catch (e) {
      return e;
    }
  }

  //use state for popup
  const [buttonPopup, setButtonPopup] = useState(false);

  //open user create popup if local storage value of username is null, if not null:
  //creates new room if local storage value of roomname is null and navigates user to it,
  //otherwise join room which is in local storage
  const joinCreatedRoom = async () => {

    if (localStorage.getItem("username") == null) {
      setButtonPopup(true);

    } else {
      if (localStorage.getItem("roomname") == null) {
        createRoom();

        try {
          const res = await Axios.get(`https://gruppe8.toni-barth.com/rooms`);
          const lastRoomName = res.data.rooms[res.data.rooms.length - 1].name;
          await Axios.put(`https://gruppe8.toni-barth.com/rooms/` + lastRoomName + `/users`, { "user": localStorage.getItem("userID") });
          localStorage.setItem("roomname", lastRoomName);

          navigate(`/` + lastRoomName + `/`);

        } catch (e) {
          return e;
        }

      } else {
        // alert("You already joined a room: " + localStorage.getItem("roomname"));
        navigate(`/` + localStorage.getItem("roomname") + `/`);
      }
    }
  }

  //removes user from current room in API (if local storage value is not null) 
  //and removes user in API;
  //also deletes all local storage values, hides log out button and alerts user about logging out
  async function logOutUser() {

    try {
      if(localStorage.getItem("roomname") != null) {
        await Axios.delete(`https://gruppe8.toni-barth.com/rooms/` + localStorage.getItem("roomname") + `/users`, { data: { "user": localStorage.getItem("userID") } });
      }

      await Axios.delete(`https://gruppe8.toni-barth.com/users/` + localStorage.getItem("userID"));

    } catch (e) {
      return e;

    } finally {
      localStorage.removeItem("username");
      localStorage.removeItem("userID");
      localStorage.removeItem("roomname");
      localStorage.removeItem("lang");
      document.getElementById("logoutbtn").style.display = "none";
      alert("logged out!");
    }
  }

  return (
    <div className='hero-container'>
      <button
        id='helpbtn'
        onClick={() => navigate('/help/')}
      >
        <p id='helpp'>Help</p>
      </button>

      <button
        id='logoutbtn'
        onClick={() => logOutUser()}
      >
        <p id='logout'></p>
      </button>

      <img src={process.env.PUBLIC_URL + '/images/homebg.jpg'} alt='background home projector cinema' />

      <AddUserPopup trigger={buttonPopup} setTrigger={setButtonPopup}></AddUserPopup>

      <h2 id='welcome'></h2>

      <div className='hero-btns'>
        <Button
          id='newRoomBtn'
          className='btns'
          buttonStyle='btn--create'
          buttonSize='btn--large'
          onClick={() => joinCreatedRoom()}
          aria-label="create new room"
        >
          <p id='createbtnhp'></p>
        </Button><br /><br />

        <Link
          to='/room-list/'
          id='joinroombtn'
          className='join-room'
          aria-label="join room"
        >
          Join Room
        </Link><br /><br />
      </div>

      {(location.pathname === "/home/" || location.pathname !== "/home") &&
        <p id='notice'>Das Projekt ist an der HS Anhalt und unter der Aufsicht von Toni Barth entstanden.</p>
      }

    </div>
  )
}

export default HeroSection