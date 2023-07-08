import React from 'react'
import '../App.css'
import { Button } from './Button'
import './HeroSection.css'

function HeroSection() {
  return (
    <div className='hero-container'>
        <img src='../images/homebg.jpg' alt='background home projector cinema'/>
        <h5>Create or join a room to get started!</h5>
        <div className='hero-btns'>
            <Button 
                className='btns'
                buttonStyle='button--outline'
                buttonSize='btn--large'
            >
                Create New Room
            </Button>
        </div>
    </div>
  )
}

export default HeroSection