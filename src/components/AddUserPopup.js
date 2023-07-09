import React from 'react';
import './AddUserPopUp.css';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

function AddUserPopup(props) {
    let input = document.getElementById("userInput");

    if (input != null) {
        input.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                getInput();
            }
        })
    }

    let navigate = useNavigate();

    function getInput() {
        let input = document.getElementById("userInput");
        let inputVal = 0;
        if (input != null) {
            inputVal = input.value;
        }

        if (inputVal.length > 0) {
            createUser(inputVal);
            localStorage.setItem("username", inputVal);
            document.getElementById("username").innerHTML = inputVal;
            let roomname = document.getElementById("roomname");
            if (roomname != null) {
                navigate(`/` + roomname.innerHTML + `/`);
            } else {
                joinCreatedRoom();
            }
        }
    }

    const createUser = async (user) => {
        let username = user;
        try {
            const res = await Axios.post(`https://gruppe8.toni-barth.com/users`, { name: username });
            return res;

        } catch (e) {
            return e;
        }
    }

    const createRoom = async () => {
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
            const lastRoomName = res.data.rooms[res.data.rooms.length - 1].name;
            document.getElementById("roomname").innerHTML = lastRoomName;
            navigate(`/` + lastRoomName + `/`);

        } catch (e) {
            return e;

        }
    }

    function closePopup() {
        props.setTrigger(false);
        document.getElementById("roomname").innerHTML = "";
    }

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <button className='closebtn' onClick={() => closePopup()}>&times;</button>
                {props.children}
                <label>Username:</label><br />
                <input id='userInput' placeholder='Enter your name here' maxLength="24"></input><i id='confirm' class="fas fa-check" onClick={() => getInput()}></i>
            </div>
        </div>
    ) : "";
}

export default AddUserPopup