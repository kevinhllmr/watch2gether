export function lang_de() {
    const welcomeElement = document.getElementById('welcome');
    const noticeElement = document.getElementById('notice');
    const joinRoomBtnElement = document.getElementById('joinroombtn');
    const roomElement = document.getElementById('rooms');
    const usernameLabel = document.getElementById('usernameLabel');
    const userInput = document.getElementById('userInput');

    if (welcomeElement) {
        welcomeElement.innerHTML = "Erstelle oder trete einem<br> Raum bei, um zu starten!";
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
}