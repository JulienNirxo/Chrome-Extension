// Fonction pour contrôler la vitesse de la vidéo
function controlVideoSpeed(speed) {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.playbackRate = speed;
    });
}

// Envoie un message à l'extension pour changer la vitesse de la vidéo
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'changeSpeed') {
        const speed = parseFloat(request.speed);
        if (!isNaN(speed)) {
            controlVideoSpeed(speed);
        }
    }
});
