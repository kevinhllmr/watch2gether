import React from 'react'
import '../App.css'
import { useNavigate } from "react-router-dom";
import { Button } from './Button'
import { Link } from 'react-router-dom';
import './HeroSection.css'
import Axios from 'axios';

function HeroSection() {

  let navigate = useNavigate(); 

  const createRoom =  async () => { 
    try {
      const res = await Axios.post(`https://gruppe8.toni-barth.com/rooms`);
      return res;

    } catch (e) {
      return e;
    }
  }

  const joinCreatedRoom = async () => { 
    createRoom();
    try {
      const res = await Axios.get(`https://gruppe8.toni-barth.com/rooms`);
      const lastRoomName = res.data.rooms[res.data.rooms.length-1].name;
      navigate(`/` + lastRoomName);
      
    } catch (e) {
      return e;
    }
  }

  return (
    <div className='hero-container'>
        <img src={process.env.PUBLIC_URL + '/images/homebg.jpg'} alt='background home projector cinema'/>

        <h2>Create or join a room to get started!</h2>
        <div className='hero-btns'>
            <Button 
              className='btns' 
              buttonStyle='btn--create' 
              buttonSize='btn--large'
              onClick={joinCreatedRoom}
              >
                Create New Room
              </Button><br/><br/>
              <Link
                to='/room-list'
                className='join-room'
              >
                Join Room
              </Link>
        </div>
    </div>
  )
}

export default HeroSection