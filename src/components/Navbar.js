import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { Button } from './Button';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import AddUserPopup from './AddUserPopup';

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
  useEffect(() => {
    showButton();
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

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <AddUserPopup trigger={buttonPopup} setTrigger={setButtonPopup}></AddUserPopup>

          <Link to="/watch2gether/" className="navbar-logo">
            Watch2Gether
            <i className="far fa-play-circle"></i>
          </Link>

          {location.pathname !== "/watch2gether/" && location.pathname !== "/watch2gether" &&
            <div className='menu-icon' onClick={handleClick}>
              <i className={click ? 'fas fa-caret-up' : 'fas fa-caret-down'} />
            </div>}

          {location.pathname !== "/watch2gether/" && location.pathname !== "/watch2gether" &&
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item' onClick={closeMobileMenu}>
                <div id='roomname'>
                </div>
              </li>

              <li className='nav-item' onClick={closeMobileMenu}>
                <div id='username'>
                </div>
              </li>

              {/* {location.pathname !=="/room-list/" && location.pathname !=="/room-list" && */}
              <li className='nav-item'>
                <Link
                  to='/room-list/'
                  id='joinroombtn'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Join Room
                </Link>
              </li>

              <li>
                <Link
                  className='nav-links-mobile'
                  onClick={joinCreatedRoom}
                >
                  Create Room
                </Link>
              </li>
            </ul>}

          {location.pathname !== "/watch2gether/" && location.pathname !== "/watch2gether" && button &&
            <Button buttonStyle='btn--create'
              onClick={joinCreatedRoom}>
              Create Room
            </Button>}

        </div>
      </nav>
    </>
  )
}

export default Navbar