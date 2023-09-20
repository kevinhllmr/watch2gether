export function lang_en() {
    const welcomeElement = document.getElementById('welcome');
    const noticeElement = document.getElementById('notice');
    const joinRoomBtnElement = document.getElementById('joinroombtn');
    const roomElement = document.getElementById('rooms');
    const usernameLabel = document.getElementById('usernameLabel');
    const userInput = document.getElementById('userInput');
    const copied = document.getElementById('copyroom-notif');
    const leavebtn = document.getElementById('leavebtn');
    const createbtn = document.getElementById('createbtn');
    const createlink = document.getElementById('createlink');
    const createbtnhp = document.getElementById('createbtnhp');
    const logout = document.getElementById('logout');

    if (welcomeElement) {
        welcomeElement.innerHTML = "Create or join a room<br> to get started!";
    }

    if (noticeElement) {
        noticeElement.innerHTML = "The project was created at HS Anhalt and under the supervision of Toni Barth.";
    }

    if (joinRoomBtnElement) {
        joinRoomBtnElement.innerText = "Join Room";
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
}