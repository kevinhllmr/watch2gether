import React from 'react';
import '../../App.css';
import { useNavigate } from "react-router-dom";
import './RoomList.css';
import Axios from 'axios';

function RoomList() {

    let navigate = useNavigate(); 

    const loadRooms = async () => {
        try {
            const res = await Axios.get(`https://gruppe8.toni-barth.com/rooms`);
            const roomName = res.data.rooms;
            let btns = document.getElementById("btns").innerHTML;

            if (btns != null) {
                document.getElementById("btns").innerHTML = "";

                for (let i = 0; i < roomName.length; i++) {
                    document.getElementById("btns").innerHTML += "<button class='btn' style='color:#242424;background:#4ed451;padding:8px 24px;font-size: 20px;border-radius:50px;border:0px;margin:10px;'>" + roomName[i].name + "</button>";
                }

                const buttons = document.querySelectorAll(".btn");
                buttons.forEach(button => button.addEventListener("click", function() {
                    navigate(`/` + button.innerText)
                }));
             
        }

        } catch (e) {
            return e;
        }
    }
    loadRooms();

    return (
        <div className='roomlist-container'>
            <h2 id="rooms">All available rooms:</h2>
            <center>
                <div id="btns">
                </div>
            </center>
        </div>
    )
}

export default RoomList