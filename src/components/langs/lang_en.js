export function lang_en() {
    const welcome = document.getElementById('welcome');
    const notice = document.getElementById('notice');
    const joinRoomBtn = document.getElementById('joinroombtn');
    const joinRoomBtn404 = document.getElementById('joinroombtn404');
    const roomElement = document.getElementById('rooms');
    const usernameLabel = document.getElementById('usernameLabel');
    const userInput = document.getElementById('userInput');
    const copied = document.getElementById('copyroom-notif');
    const leavebtn = document.getElementById('leavebtn');
    const createbtn = document.getElementById('createbtn');
    const createlink = document.getElementById('createlink');
    const createbtnhp = document.getElementById('createbtnhp');
    const logout = document.getElementById('logout');
    const roomnotfound = document.getElementById('roomnotfound');
    const help = document.getElementById('help');
    const controls = document.getElementById('controls');
    const helpp = document.getElementById('helpp');

    const chatwelcomemessage = document.getElementById('chatwelcome');
    const chatInput = document.getElementById('chat-input');
    const chatButton = document.getElementById('chat-button');

    if (welcome) {
        welcome.innerHTML = "Create or join a room<br> to get started!";
    }

    if (notice) {
        notice.innerHTML = "The project was created at HS Anhalt and under the supervision of Toni Barth.";
    }

    if (joinRoomBtn) {
        joinRoomBtn.innerText = "Join Room";
    }

    if (joinRoomBtn404) {
        joinRoomBtn404.innerText = "Join Room";
    }

    if (roomElement) {
        roomElement.innerText = "All available rooms:";
    }

    if (usernameLabel) {
        usernameLabel.innerText = "Username";
    }

    if (userInput) {
        userInput.placeholder = "Enter your name here";
    }

    if (copied) {
        copied.innerText = "Room link copied!";
    }

    if (leavebtn) {
        leavebtn.textContent = "Leave Room";
    }

    if (createbtn) {
        createbtn.textContent = "Create Room";
    }

    if (createbtnhp) {
        createbtnhp.textContent = "Create Room";
    }

    if (createlink) {
        createlink.textContent = "Create Room";
    }

    if (logout) {
        logout.textContent = "Logout";
    }

    if (roomnotfound) {
        roomnotfound.textContent = "Room not found!";
    }

    if (help) {
        help.innerHTML = "1) Create a new room or join an existing one<br />2) Share the room URL by clicking on the room name<br /> 3) Watch2Gether!<br /><br />Shortcuts:";
    }

    if (controls) {
        controls.innerHTML = "Play/Pause Video - Spacebar or K<br />Fullscreen - F<br />Rewind - Arrow Left<br /> Fast Forward - Arrow Right<br /> Volume Down - Arrow Down<br /> Volume Up - Arrow Up<br /> Mute - M<br /> ";
    }

    if (helpp) {
        helpp.innerHTML = "Help";
    }

    if (chatwelcomemessage) {
        chatwelcomemessage.textContent = "Welcome to the Chat Room!";
    }

    if (chatInput) {
        chatInput.placeholder = "Type message";
    }

    if (chatButton) {
        chatButton.innerText = "Send";
    }
}