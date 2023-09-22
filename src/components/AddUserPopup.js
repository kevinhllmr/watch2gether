import React, { useEffect } from 'react';
import './AddUserPopUp.css';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { lang_de } from './langs/lang_de.js';
import { lang_en } from './langs/lang_en.js';

//creates popup for user creation
function AddUserPopup(props) {

    useEffect(() => {
        if(localStorage.getItem("lang") === "de") {
            lang_de();
        
        } else {
            lang_en();

        } 
    });

    //gets input if enter key is pressed
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && document.getElementById("userInput") != null) {
            getInput();
        }
    };

    //sets variable for react routing
    let navigate = useNavigate();

    //gets username input and puts it together with userID into API
    //creates room if popup is called on create room instead of join room
    //navigates user to the room
    async function getInput() {

        let input = document.getElementById("userInput");
        let inputVal = 0;
        if (input != null) {
            inputVal = input.value;
        }

        if (inputVal.length > 0) {
            closePopup();

            localStorage.setItem("username", inputVal);
            await Axios.post(`https://gruppe8.toni-barth.com/users`, { name: inputVal });
            const users = await Axios.get(`https://gruppe8.toni-barth.com/users`);
            const lastUserID = users.data.users[users.data.users.length - 1].id;
            localStorage.setItem("userID", lastUserID);

            let roomname = localStorage.getItem("roomname");

            if (roomname != null) {
                navigate(`/` + roomname + `/`);

                try {
                    await Axios.put(`https://gruppe8.toni-barth.com/rooms/` + roomname + `/users`, { "user": localStorage.getItem("userID") });

                } catch (e) {
                    alert(false);
                    return e;
                }

            } else {
                joinCreatedRoom();
            }
        }
    }

    //posts new room into API
    const createRoom = async () => {
        try {
            const res = await Axios.post(`https://gruppe8.toni-barth.com/rooms`);
            return res;

        } catch (e) {
            return e;
        }
    }

    //puts user into last room created
    const joinCreatedRoom = async () => {

        createRoom();

        try {
            const res = await Axios.get(`https://gruppe8.toni-barth.com/rooms`);
            const lastRoomName = res.data.rooms[res.data.rooms.length - 1].name;
            localStorage.setItem("roomname", lastRoomName);
            navigate(`/` + lastRoomName + `/`);

            try {
                await Axios.put(`https://gruppe8.toni-barth.com/rooms/` + lastRoomName + `/users`, { "user": localStorage.getItem("userID") });

            } catch (e) {
                return e;
            }

        } catch (e) {
            return e;
        }
    }

    //closes popup, reload site
    //if roomname in navbar is not null, its innerHTML will get removed
    function closePopup() {
        props.setTrigger(false);

        if (document.getElementById("roomname") != null) {
            document.getElementById("roomname").innerHTML = "";
        }
    }

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                {/* <button className='closebtn' onClick={() => closePopup()}>&times;</button> */}

                {props.children}

                <label id='usernameLabel'>Username:</label><br />

                <input
                    id='userInput'
                    placeholder='Enter your name here'
                    maxLength="24"
                    onKeyDown={handleKeyDown}
                >
                </input>

                <i id='confirm' className="fas fa-check" onClick={() => getInput()}></i>
            </div>
        </div>
    ) : "";
}

export default AddUserPopup