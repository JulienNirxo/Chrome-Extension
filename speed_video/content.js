speedValue = 1.0;

//if step in input change speed
document.addEventListener('DOMContentLoaded', function () {
    const speedInput = document.getElementById('speedInput');
    speedInput.addEventListener('change', function () {
        const speedValue = speedInput.value;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'changeSpeed', speed: speedValue });
        });
    });
});

// Envoie un message à l'extension pour changer la vitesse de la vidéo
chrome.runtime.onMessage.addListener(function (request) {
    if (request.action === 'changeSpeed') {
        const speed = parseFloat(request.speed);
        if (!isNaN(speed)) {
            controlVideoSpeed(speed);
        }
    }
});

// Fonction pour contrôler la vitesse de la vidéo
function controlVideoSpeed(speedValue) {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.playbackRate = speedValue;
    });
}