speedValue = 1.0;

// Récupérer la valeur depuis le stockage local
document.addEventListener('DOMContentLoaded', function () {
    let speedInput = document.getElementById('speedInput');

    // Récupérer la valeur depuis le stockage local
    chrome.storage.local.get("speedValue", function (result) {
        if (result.speedValue) {
            speedInput.value = result.speedValue;
        }
    });

    speedInput.addEventListener('change', function () {
        const newSpeedValue = parseFloat(speedInput.value);

        chrome.storage.local.set({ "speedValue": newSpeedValue });

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'changeSpeed', speed: newSpeedValue });
        });
    });
});

// Envoie un message à l'extension pour changer la vitesse de la vidéo
chrome.runtime.onMessage.addListener(function (request) {
    if (request.action === 'changeSpeed') {
        const speed = parseFloat(request.speed);
        if (!isNaN(speed)) {
            const videos = document.querySelectorAll('video');
            videos.forEach(video => {
                video.playbackRate = speed;
            });
        }
    }
});