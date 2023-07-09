import React, { useState } from 'react';
import '../../App.css';
import { useNavigate } from "react-router-dom";
import './RoomList.css';
import Axios from 'axios';
import AddUserPopup from '../AddUserPopup';

function RoomList() {
    const [buttonPopup, setButtonPopup] = useState(false);

    let navigate = useNavigate(); 

    const loadRooms = async () => {
        try {
            const res = await Axios.get(`https://gruppe8.toni-barth.com/rooms`);
            const roomName = res.data.rooms;
            let btns = document.getElementById("btns").innerHTML;

            if (btns != null) {
                document.getElementById("btns").innerHTML = "";

                for (let i = 0; i < roomName.length; i++) {
                    document.getElementById("btns").innerHTML += "<button class='roombtns' style='cursor:pointer;color:#242424;background:#4ed451;padding:8px 24px;font-size: 20px;border-radius:50px;border:0px;margin:10px;'>" + roomName[i].name + "</button>";
                }

                const buttons = document.querySelectorAll(".roombtns");
                buttons.forEach(button => button.addEventListener("click", function() {
                    if(localStorage.getItem("username") != null) {
                        navigate(`/` + button.innerText + `/`);

                    } else {
                        setButtonPopup(true);  
                    }    

                    document.getElementById('roomname').innerHTML = button.innerText; 
                    document.getElementById("username").innerHTML = localStorage.getItem("username");
                }));          
        }

        } catch (e) {
            return e;
        }
    }

    loadRooms();

    window.addEventListener("DOMContentLoaded", (event) => {
        document.getElementById("username").innerHTML = localStorage.getItem("username");
    });

    return (
        <div className='roomlist-container'>
            <h2 id="rooms">All available rooms:</h2>
            <center>
                <div id="btns">
                </div>
                <AddUserPopup trigger={buttonPopup} setTrigger={setButtonPopup}></AddUserPopup>
            </center>
        </div>
    )
}

export default RoomList