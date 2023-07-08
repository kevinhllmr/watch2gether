import React from 'react'
import '../App.css'
import { Button } from './Button'
import { Link } from 'react-router-dom';
import './HeroSection.css'

function HeroSection() {

  return (
    <div className='hero-container'>
        <img src={process.env.PUBLIC_URL + '/images/homebg.jpg'} alt='background home projector cinema'/>
        <h2>Create or join a room to get started!</h2>
        <div className='hero-btns'>
            <Button 
              className='btns' 
              buttonStyle='btn--create' 
              buttonSize='btn--large'
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