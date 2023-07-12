import React, { useEffect, useState, useRef } from 'react'
import ReactPlayer from 'react-player';
import '../../App.css';
import './Room.css';
import Axios from 'axios';
import PlayerControls from '../PlayerControls';
import screenfull from 'screenfull';

let count = 0;

const format = (seconds) => {
    if(isNaN(seconds)) {
        return '00:00';
    }

    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2,'0');

    if(hh) {
        return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }

    return `${mm}:${ss}`;
}

//room page for video player and chat
function Room() {

    //use state for URL and status
    const [videoURL, setVideoURL] = useState('');
    const [state, setState] = useState({
        playing: false,
        muted: false,
        played: 0,
        seeking: false,
        fullscreen: false
    });

    const { playing, muted, played, seeking, fullscreen } = state;

    const playerRef = useRef(null);
    const playerContainerRef = useRef(null);
    const controlsRef = useRef(null);

    const handlePlayPause = async () => {
        setState({ ...StaticRange, playing: !state.playing });

        try {
            let roomname = localStorage.getItem("roomname");

            if (state.playing !== true) {
                await Axios.put(`https://gruppe8.toni-barth.com/rooms/` + roomname + `/status`, { "user": localStorage.getItem("userID"), "status": "playing" });

            } else {
                await Axios.put(`https://gruppe8.toni-barth.com/rooms/` + roomname + `/status`, { "user": localStorage.getItem("userID"), "status": "paused" });
            }

        } catch (e) {
            return e;
        }
    }

    const handleRewind = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5)
    }

    const handleFastForward = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5)
    }

    const onToggleFullScreen = () => {
        screenfull.toggle(playerContainerRef.current);
    }

    const handleProgress = (changeState) => {
        if(count >= 1) {
            controlsRef.current.style.visibility = 'hidden';
            document.getElementById('controls-wrapper').style.backgroundColor = 'rgba(0, 0, 0, 0)';
            count = 0;
        }

        if(controlsRef.current.style.visibility === 'visible') {
            count+=1;
        }
        
        if(!seeking) {
            setState({ ...state, ...changeState });
        }
    }

    const handleSeekChange=(e, newValue) => {
        setState({...state,played:parseFloat(newValue / 100)});
    }

    const handleSeekMouseDown=(e) => {
        setState({...state,seeking:true});
    }

    const handleSeekMouseUp=(e, newValue) => {
        setState({...state,seeking:false});
        playerRef.current.seekTo(newValue / 100);
    }

    const handleMouseMove = () => {
        controlsRef.current.style.visibility = 'visible';
        document.getElementById('controls-wrapper').style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
        count = 0;
    }

    const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : '00:00';
    const duration = playerRef.current ? playerRef.current.getDuration() : '00:00';

    const elapsedTime = format(currentTime);
    const totalDuration = format(duration);

    //as soon as site loads, roomname and username in navbar will be set according to local storage value;
    //shows join/leave room buttons
    //calls getCurrentURL() function
    useEffect(() => {

        if (document.getElementById("username")) {
            document.getElementById("roomname").innerHTML = localStorage.getItem("roomname");
            document.getElementById("username").innerHTML = localStorage.getItem("username");
        }

        if (document.getElementById("joinroombtn")) {
            document.getElementById("joinroombtn").style.display = 'block';
        }

        if (document.getElementById("leaveroombtn")) {
            document.getElementById("roomname").style.display = "block";
            document.getElementById("leaveroombtn").style.display = "block";
        }

        getCurrentURL();

    }, []);

    //reads URL value from API
    //if no URL is saved, default URL will be set
    async function getCurrentURL() {

        try {
            let roomname = localStorage.getItem("roomname");
            const url = (await Axios.get(`https://gruppe8.toni-barth.com/rooms/` + roomname + `/video`)).data.url;

            if (url.length !== 0) {
                setVideoURL(url);
                document.getElementById("urlinput").placeholder = url;

            } else {
                setVideoURL('https://www.dailymotion.com/video/x82hnx2');
            }

        } catch (e) {
            return e;
        }
    }

    //gets input if enter key is pressed
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && document.getElementById("urlinput") != null) {
            getInput();
        }
    };

    //gets input url and puts it into API
    async function getInput() {

        let input = document.getElementById("urlinput");
        let inputVal = 0;
        if (input != null) {
            inputVal = input.value;
        }

        if (inputVal.length > 0) {
            let roomname = localStorage.getItem("roomname");

            try {
                await Axios.put(`https://gruppe8.toni-barth.com/rooms/` + roomname + `/video`, { "user": localStorage.getItem("userID"), "url": inputVal });
                setVideoURL(inputVal);

            } catch (e) {
                return e;
            }
        }
    }

    return (
        <>
            <div className='container'>
                <input
                    id='urlinput'
                    placeholder='youtu.be/watch?v=dQw4w9WgXcQ'
                    onKeyDown={handleKeyDown}
                ></input>

                <button
                    id='submitbtn'
                    onClick={() => getInput()}
                >
                    <i class="fas fa-search"></i>
                </button>

                <div className='video-container'>
                    <div
                        ref={playerContainerRef}
                        className='player-wrapper'
                        onMouseMove={handleMouseMove}
                    >
                        <ReactPlayer
                            ref={playerRef}
                            className='player'
                            url={videoURL}
                            width='100%'
                            height='100%'
                            playing={playing}
                            muted={muted}
                            onProgress={handleProgress}
                        />

                        <PlayerControls
                            ref={controlsRef}
                            onPlayPause={handlePlayPause}
                            playing={playing}
                            onRewind={handleRewind}
                            onFastForward={handleFastForward}
                            onToggleFullScreen={onToggleFullScreen}
                            played={played}
                            onSeek={handleSeekChange}
                            onSeekMouseDown={handleSeekMouseDown}
                            onSeekMouseUp={handleSeekMouseUp}
                            elapsedTime={elapsedTime}
                            totalDuration={totalDuration}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Room;