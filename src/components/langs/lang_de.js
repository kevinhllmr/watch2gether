export function lang_de() {
    const welcomeElement = document.getElementById('welcome');
    const noticeElement = document.getElementById('notice');
    const joinRoomBtnElement = document.getElementById('joinroombtn');
    const roomElement = document.getElementById('rooms');
    const usernameLabel = document.getElementById('usernameLabel');
    const userInput = document.getElementById('userInput');
    const copied = document.getElementById('copyroom-notif');
    const leavebtn = document.getElementById('leavebtn');
    const joinbtn = document.getElementById('joinbtn');
    const logout = document.getElementById('logout');

    if (welcomeElement) {
        welcomeElement.innerHTML = "Erstelle oder trete einem<br> Raum bei, um loszulegen!";
    }

    if (noticeElement) {
        noticeElement.innerHTML = "Das Projekt ist an der HS Anhalt und unter der Aufsicht von Toni Barth entstanden.";
    }

    if (joinRoomBtnElement) {
        joinRoomBtnElement.innerText = "Raum beitreten";
    }

    if (roomElement) {
        roomElement.innerText = "Alle verfügbaren Räume:";
    }

    if (usernameLabel) {
        usernameLabel.innerText = "Benutzername";
    }

    if (userInput) {
        userInput.placeholder = "Gib deinen Namen hier ein";
    }

    if (copied) {
        copied.innerText = "Raumlink kopiert!";
    }

    if (leavebtn) {
        leavebtn.textContent = "Raum Verlassen";
    }

    if (joinbtn) {
        joinbtn.textContent = "Raum Erstellen";
    }

    if (logout) {
        logout.textContent = "Ausloggen";
    }
}