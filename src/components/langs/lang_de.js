export function lang_de() {
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

    if (welcome) {
        welcome.innerHTML = "Erstelle oder trete einem<br> Raum bei, um loszulegen!";
    }

    if (notice) {
        notice.innerHTML = "Das Projekt ist an der HS Anhalt und unter der Aufsicht von Toni Barth entstanden.";
    }

    if (joinRoomBtn) {
        joinRoomBtn.innerText = "Raum beitreten";
    }

    if (joinRoomBtn404) {
        joinRoomBtn404.innerText = "Raum beitreten";
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

    if (createbtn) {
        createbtn.textContent = "Raum Erstellen";
    }

    if (createbtnhp) {
        createbtnhp.textContent = "Raum Erstellen";
    }

    if (createlink) {
        createlink.textContent = "Raum Erstellen";
    }

    if (logout) {
        logout.textContent = "Ausloggen";
    }

    if (roomnotfound) {
        roomnotfound.textContent = "Raum nicht gefunden!";
    }

    if (help) {
        help.innerHTML = "1) Erstelle einen Raum oder trete einem bei<br />2) Teile die Raum-URL, indem du auf den Raumnamen klickst<br /> 3) Watch2Gether!<br /><br />Tastenkombinationen:";
    }

    if (controls) {
        controls.innerHTML = "Video Start/Stopp - Leertaste oder K<br />Fullscreen - F<br />Rewind - Pfeiltaste Links<br /> Fast Forward - Pfeiltaste Rechts<br /> Volume Down - Pfeiltaste Unten<br /> Volume Up - Pfeiltaste Oben<br /> Stummschalten - M<br /> ";
    }

    if (helpp) {
        helpp.innerHTML = "Hilfe";
    }
}