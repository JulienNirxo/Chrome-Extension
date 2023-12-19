//Détection de la page chargée et envoie d'un message à l'extension pour changer la vitesse de la vidéo
document.addEventListener('DOMContentLoaded', function () {
    const changeSpeedButton = document.getElementById('changeSpeedButton');
    const speedInput = document.getElementById('speedInput');

    changeSpeedButton.addEventListener('click', function () {
        const speed = speedInput.value;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'changeSpeed', speed: speed });
        });
    });
});
