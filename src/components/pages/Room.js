import React, { useEffect, useState, useRef } from 'react'
import ReactPlayer from 'react-player';
import '../../App.css';
import './Room.css';
import Axios from 'axios';
import PlayerControls from '../PlayerControls';
import screenfull from 'screenfull';
import { useNavigate } from "react-router-dom";

//count variable for UI fade out
let count = 0;

//formats the time of the video into hours, minutes and seconds and returns string
const format = (seconds) => {
    if (isNaN(seconds)) {
        return '00:00';
    }

    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');

    if (hh) {
        return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }

    return `${mm}:${ss}`;
}

//room page for video player
function Room() {

    //use state for URL, status and position
    //as well as user create popup if user has not set a name yet
    const [videoURL, setVideoURL] = useState('');
    const [videoPlaying, setVideoPlaying] = useState(false);
    const [videoPosition, setVideoPosition] = useState(0.0);
    const [setButtonPopup] = useState(false);

    //multiple states for synchronize handling
    const [state, setState] = useState({
        playing: false,
        muted: false,
        played: 0,
        seeking: false,
        fullscreen: false,
        duration: 0,
    });

    const { playing, muted, played, seeking, fullscreen } = state;

    const playerRef = useRef(null);
    const playerContainerRef = useRef(null);
    const controlsRef = useRef(null);


    //update status and position on play/pause
    const handlePlayPause = async () => {

        const newPlayingState = !state.playing;

        try {
            let roomname = localStorage.getItem('roomname');
            const user = localStorage.getItem('userID');
            const status = newPlayingState ? 'playing' : 'paused';
            const position = playerRef.current.getCurrentTime();

            await Promise.all([
                Axios.put(`https://gruppe8.toni-barth.com/rooms/${roomname}/status`, {
                    user: user,
                    status: status,
                }),
                Axios.put(`https://gruppe8.toni-barth.com/rooms/${roomname}/position`, {
                    user: user,
                    position: position,
                }),
            ]);

            setState((prevState) => ({ ...prevState, playing: newPlayingState }));
            setVideoPlaying(newPlayingState);

            // Auto-start video on URL change with a delay
            if (videoURL !== playerRef.current.props.url) {
                setTimeout(() => {
                    setVideoPlaying(true);
                }, 3000); // Adjust the delay as needed
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    //seeks to new positon and updates video position in API
    const handleRewind = async () => {
        const currentTime = playerRef.current.getCurrentTime();
        playerRef.current.seekTo(currentTime - 5);
        updateVideoPosition(currentTime - 5);
    }

    //seeks to new positon and updates video position in API
    const handleFastForward = async () => {
        const currentTime = playerRef.current.getCurrentTime();
        playerRef.current.seekTo(currentTime + 5);
        updateVideoPosition(currentTime + 5);
    }

    //updates position in API
    const updateVideoPosition = async (position) => {
        try {
            const roomname = localStorage.getItem('roomname');
            const user = localStorage.getItem('userID');

            await Axios.put(`https://gruppe8.toni-barth.com/rooms/${roomname}/position`, {
                user: user,
                position: position,
            });

        } catch (e) {
            console.error('Error:', e);
        }
    };

    //toggle fullscreen
    const onToggleFullScreen = () => {
        screenfull.toggle(playerContainerRef.current);
        setState({ ...state, fullscreen: !state.fullscreen });
    }

    //handle for fading UI out after 3 seconds
    const handleProgress = (changeState) => {
        if (count >= 3) {
            controlsRef.current.style.visibility = 'hidden';
            document.getElementById('controls-wrapper').style.backgroundColor = 'rgba(0, 0, 0, 0)';
            count = 0;
        }

        if (controlsRef.current.style.visibility === 'visible') {
            count += 1;
        }

        if (!seeking) {
            setState({ ...state, ...changeState });
        }
    }

    //multiple events for seek bar and mouse movement

    const handleSeekChange = (e, newValue) => {
        setState({ ...state, played: parseFloat(newValue / 100) });
    }

    const handleSeekMouseDown = (e) => {
        setState({ ...state, seeking: true });
    }

    const handleSeekMouseUp = (e, newValue) => {
        setState({ ...state, seeking: false });
        playerRef.current.seekTo(newValue / 100);
    };

    const handleMouseMove = () => {
        controlsRef.current.style.visibility = 'visible';
        document.getElementById('controls-wrapper').style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
        count = 0;
    }

    //new duration on URL change
    const handleDuration = (duration) => {
        setState({ ...state, duration });
    };

    const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : '00:00';
    const duration = playerRef.current ? playerRef.current.getDuration() : '00:00';

    const elapsedTime = format(currentTime);
    const totalDuration = format(duration);

    //polling for new URL, position and status
    const longPolling = async () => {
        try {
            let roomname = localStorage.getItem('roomname');
            let lastStatus = '';
            let lastPosition = 0;
            let lastURL = '';

            while (true) {
                const [statusResponse, positionResponse, urlResponse] = await Promise.all([
                    Axios.get(`https://gruppe8.toni-barth.com/rooms/${roomname}/status`),
                    Axios.get(`https://gruppe8.toni-barth.com/rooms/${roomname}/position`),
                    Axios.get(`https://gruppe8.toni-barth.com/rooms/${roomname}/video`),
                ]);

                const currentStatus = statusResponse.data.status;
                const currentPosition = positionResponse.data.position;
                const currentURL = urlResponse.data.url;

                if (currentStatus !== lastStatus) {
                    setVideoPlaying(currentStatus === 'playing');
                    lastStatus = currentStatus;

                    if (currentStatus === 'playing') {
                        playerRef.current.play(); // Start playing the video
                    } else {
                        playerRef.current.pause(); // Pause the video
                    }
                }

                if (currentURL !== lastURL) {
                    setVideoURL(currentURL);
                    lastURL = currentURL;
                }

                if (playerRef.current && currentPosition !== lastPosition) {
                    playerRef.current.seekTo(currentPosition);
                    lastPosition = currentPosition;
                }

                // Delay between polling requests
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
        } catch (error) {
            console.error('Long polling error:', error);
        }
    };

    //every second, video synchronizes additionally to polling function in case of lags/stuttering
    const synchronizeVideoPosition = async () => {
        try {
            let roomname = localStorage.getItem("roomname");
            let lastPosition = videoPosition;

            while (true) {
                const response = await Axios.get(
                    `https://gruppe8.toni-barth.com/rooms/${roomname}/position`
                );

                const currentPosition = response.data.position;

                if (playerRef.current && currentPosition !== lastPosition) {
                    playerRef.current.seekTo(currentPosition);
                    lastPosition = currentPosition;
                }

                // Delay between polling requests
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        } catch (error) {
            console.error("Video position synchronization error:", error);
        }
    };

    //handle for when video is ready
    const handleReady = () => {
        if (videoPlaying) {
            setVideoPlaying(true);
        } else {
            setVideoPlaying(false);
        }
    };

    //sets variable for react routing
    let navigate = useNavigate(); 

    //as soon as site loads, roomname and username in navbar will be set according to local storage value;
    //shows join/leave room buttons
    //calls getCurrentURL, longPolling and synchronizeVideoPosition function
    //if username is null, navigate to room list (and open user create popup)
    useEffect(() => {

        doesRoomExist();

        try {
            if(localStorage.getItem("username") === null) {
                setButtonPopup(true);  
                navigate(`/room-list/`);
            }    
        } catch { }

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
        longPolling();
        // setState((prevState) => ({ ...prevState, duration: 0 }));
        synchronizeVideoPosition();

    }, [videoURL]);

    //check if room exists from copied room link. if not, show 404 page
    async function doesRoomExist() {
        const url = window.location + '';
        const parts = url.split('/');
        const roomname = parts[parts.length - 2];
        let stringFound = false;

        try {
            const res = await Axios.get(`https://gruppe8.toni-barth.com/rooms`);
            res.data.rooms.forEach(async room => {
                if (room.name === roomname) {
                    stringFound = true;
                  }
            });

            if(stringFound === false) {
                navigate(`/404/`);
            }
      
          } catch (e) {
            return e;
          }
    }

    //reads URL value from API
    //if no URL is saved, default URL will be set
    async function getCurrentURL() {
        try {
            let roomname = localStorage.getItem("roomname");
            const { url, position } = (await Axios.get(
                `https://gruppe8.toni-barth.com/rooms/${roomname}/video`
            )).data;

            if (url.length !== 0) {
                setVideoURL(url);
                setVideoPosition(position);
                document.getElementById("urlinput").placeholder = url;
            } else {
                setVideoURL("https://www.dailymotion.com/video/x82hnx2");
            }
        } catch (e) {
            console.error("Error:", e);
        }
    }

    //gets input if enter key is pressed
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && document.getElementById("urlinput") != null) {
            getInput();
        }
        if (event.key === 'Escape') {
            alert(true);
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
                            onDuration={handleDuration}
                            style={{ pointerEvents: 'none' }}
                            onContextMenu={(e) => e.preventDefault()}
                            controls={false}
                            onReady={handleReady}
                            preload="auto"
                        />

                        <PlayerControls
                            ref={controlsRef}
                            onPlayPause={handlePlayPause}
                            playing={playing}
                            onRewind={handleRewind}
                            onFastForward={handleFastForward}
                            onToggleFullScreen={onToggleFullScreen}
                            fullscreen={fullscreen}
                            played={played}
                            onSeek={handleSeekChange}
                            onSeekMouseDown={handleSeekMouseDown}
                            onSeekMouseUp={handleSeekMouseUp}
                            elapsedTime={elapsedTime}
                            totalDuration={totalDuration}
                            videoStatus={videoPlaying ? "playing" : "paused"}
                        />
                    </div>
                </div>    
            </div>
        </>
    );
}

export default Room;