import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { Button } from './Button';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import AddUserPopup from './AddUserPopup';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 1400) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);
  
  const location = useLocation();

  let navigate = useNavigate(); 

  const [buttonPopup, setButtonPopup] = useState(false);

  const createRoom = async () => { 
      try {
        const res = await Axios.post(`https://gruppe8.toni-barth.com/rooms`);
        return res;

      } catch (e) {
        return e;
      }
  }

  const joinCreatedRoom = async () => { 

    closeMobileMenu();
    if(localStorage.getItem("username") == null) {
      setButtonPopup(true); 

    } else {
      createRoom();
      try {
        const res = await Axios.get(`https://gruppe8.toni-barth.com/rooms`);
        const lastRoomName = res.data.rooms[res.data.rooms.length-1].name;

        navigate(`/` + lastRoomName + `/`);
        
      } catch (e) {
        return e;
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
            <i class="far fa-play-circle"></i>
          </Link>

          {location.pathname !=="/watch2gether/" && 
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-caret-up' : 'fas fa-caret-down'} />
          </div>}

          {location.pathname !=="/watch2gether/" && 
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item' onClick={closeMobileMenu}>
              <div id='roomname'>
              </div>
            </li>

            <li className='nav-item' onClick={closeMobileMenu}>
              <div id='username'>
              </div>
            </li>

            {location.pathname !=="/room-list/" && 
            <li className='nav-item'>
              <Link
                to='/room-list/'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Join Room
              </Link>
            </li>}

            <li>
              <Link
                className='nav-links-mobile'
                onClick={joinCreatedRoom}
              >
                Create Room
              </Link>
            </li>
          </ul>}
          {location.pathname !=="/watch2gether/" && button && <Button buttonStyle='btn--create' onClick={joinCreatedRoom}>Create Room</Button>}
        </div>
      </nav>
    </>
  )
}

export default Navbar