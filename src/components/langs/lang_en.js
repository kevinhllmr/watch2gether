export function lang_en() {
    const welcomeElement = document.getElementById('welcome');
    const noticeElement = document.getElementById('notice');
    const joinRoomBtnElement = document.getElementById('joinroombtn');
    const roomElement = document.getElementById('rooms');
    const usernameLabel = document.getElementById('usernameLabel');
    const userInput = document.getElementById('userInput');
    const copied = document.getElementById('snackbar');

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
}