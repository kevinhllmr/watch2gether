import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { Button } from './Button';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import AddUserPopup from './AddUserPopup';
import { lang_de } from './langs/lang_de.js';
import { lang_en } from './langs/lang_en.js';

//navigation bar component
function Navbar() {

  //use state for open menu button
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  //use state for popup
  const [buttonPopup, setButtonPopup] = useState(false);

  //menu button handling
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  //show open menu button on mobile devices
  const showButton = () => {
    if (window.innerWidth <= 1400) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  //calls showButton() function on page load
  //triggers language button and sets language
  useEffect(() => {
    showButton();
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

     //event listener for language button
      document.getElementById("btn_lng").addEventListener("click", function (e) {
        if(localStorage.getItem("lang") === "de") {      
          lang_en();
          localStorage.setItem("lang", "en");
          document.getElementById("imglng").src = process.env.PUBLIC_URL + '/images/gb.svg';

        } else {
          lang_de();
          localStorage.setItem("lang", "de");
          document.getElementById("imglng").src = process.env.PUBLIC_URL + '/images/de.svg';
        }
      });
  }, []);

  //calls showButton() function on window resize
  window.addEventListener('resize', showButton);

  //variables for current location and react routing
  const location = useLocation();
  let navigate = useNavigate();

  //posts new room into API
  const createRoom = async () => {
    try {
      const res = await Axios.post(`https://gruppe8.toni-barth.com/rooms`);
      return res;

    } catch (e) {
      return e;
    }
  }

  //closes mobile menu
  //open user create popup if local storage value of username is null, if not null:
  //creates new room if local storage value of roomname is null and navigates user to it,
  //otherwise alert user that they've already joined a room  
  const joinCreatedRoom = async () => {

    closeMobileMenu();

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
        alert("You already joined a room: " + localStorage.getItem("roomname"));
      }
    }
  }

  //copies room name
  const copyRoomName = async () => {
          navigator.clipboard.writeText('https://kevinhllmr.github.io/watch2gether/#/' + document.getElementById("roomname").innerText);     
          showSnackBar();  
  }

  function showSnackBar() {
    var sb = document.getElementById("copyroom-notif");
  
    //this is where the class name will be added & removed to activate the css
    sb.className = "show";
  
    setTimeout(()=>{ sb.className = sb.className.replace("show", ""); }, 3000);
  }

  //closes mobile menu;
  //removes user from current room and roomname from local storage;
  //hides leave room button
  const leaveRoom = async () => {

    closeMobileMenu();

    try {
      await Axios.delete(`https://gruppe8.toni-barth.com/rooms/` + localStorage.getItem("roomname") + `/users`, { data: { "user": localStorage.getItem("userID") } });

    } catch (e) {
      return e;

    } finally {
      localStorage.removeItem("roomname");
      document.getElementById("leaveroombtn").style.display = "none";
      document.getElementById("roomname").style.display = "none";
      navigate(`/room-list/`);
    }
  }

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <AddUserPopup trigger={buttonPopup} setTrigger={setButtonPopup}></AddUserPopup>

          <Link to="/home/" className="navbar-logo">
            Watch2Gether
            <i className="far fa-play-circle"></i>
          </Link>

          {location.pathname !== "/home/" && location.pathname !== "/home" && location.pathname !== "/404/" && location.pathname !== "/404" &&
            <div className='menu-icon' onClick={handleClick}>
              <i className={click ? 'fas fa-caret-up' : 'fas fa-caret-down'} />
            </div>}

          {location.pathname !== "/home/" && location.pathname !== "/home" && location.pathname !== "/404/" && location.pathname !== "/404" &&
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item' onClick={closeMobileMenu}>
                <div id='roomname' onClick={() => copyRoomName()}>
                </div>
              </li>

              <li className='nav-item' onClick={closeMobileMenu}>
                <div id='username'>
                </div>
              </li>

              {location.pathname !=="/room-list/" && location.pathname !=="/room-list" && location.pathname !== "/404/" && location.pathname !== "/404" &&
              <li className='nav-item'>
                <Link
                  to='/room-list/'
                  id='joinroombtn'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Join Room
                </Link>
              </li>}

              {window.innerWidth <= 1400 && localStorage.getItem('roomname') !== null && location.pathname !== "/404/" && location.pathname !== "/404" &&
              <li className='nav-item'>
                <Link
                  // to='/room-list/'
                  id='leaveroombtn'
                  className='nav-links'
                  onClick={leaveRoom}
                >
                  Leave Room
                </Link>
              </li>}

              {location.pathname!== '/' + localStorage.getItem('roomname') + '/' && location.pathname !== "/404/" && location.pathname !== "/404" &&
              <li>
                <Link
                  className='nav-links-mobile'
                  onClick={joinCreatedRoom}
                  id='createlink'
                >
                </Link>
              </li>}
            </ul>}

          {location.pathname !== "/home/" && location.pathname !== "/home" && button && localStorage.getItem("roomname") !== null && location.pathname !== "/404/" && location.pathname !== "/404" &&
            <div id='leaveroombtn'>
              <Button buttonStyle='btn--leave'
                onClick={leaveRoom}>
                <p id='leavebtn'></p>
              </Button>
            </div>}

          {location.pathname !== "/home/" && location.pathname !== "/home" && button && location.pathname !== '/' + localStorage.getItem('roomname') + '/' && location.pathname !== "/404/" && location.pathname !== "/404" &&
            <Button 
              buttonStyle='btn--create'
              onClick={joinCreatedRoom}>
              <p id='createbtn'></p>
            </Button>}

            <span className="flags" id="btn_lng">
              <img id='imglng' alt="Language Button"></img>
            </span>

        </div>

        <span id="copyroom-notif"></span>

      </nav>
    </>
  )
}

export default Navbar