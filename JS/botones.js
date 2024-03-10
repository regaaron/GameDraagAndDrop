// let banderaSonido = false;

function mute() {
    const miAudio = document.getElementById("audio");
    const logosMute = document.getElementsByClassName("volumen");

    for (const logo of logosMute) {
        if (miAudio.muted) {
            logo.classList.add("fa-volume-high");
            logo.classList.remove("fa-volume-xmark");
        } else {
            logo.classList.remove("fa-volume-high");
            logo.classList.add("fa-volume-xmark");
        }
    }
    miAudio.muted = !miAudio.muted;

    // alert("bandera: " + banderaSonido);

    // if (!banderaSonido) {
    //     miAudio.play();
    //     miAudio.loop = true;
    //     banderaSonido = true;

    //     for (const logo of logosMute) {
    //         logo.classList.add("fa-volume-high");
    //         logo.classList.remove("fa-volume-xmark");
    //     }
    // } else {
    //     for (const logo of logosMute) {
    //         if (miAudio.muted) {
    //             logo.classList.add("fa-volume-high");
    //             logo.classList.remove("fa-volume-xmark");
    //         } else {
    //             logo.classList.remove("fa-volume-high");
    //             logo.classList.add("fa-volume-xmark");
    //         }
    //     }
    //     miAudio.muted = !miAudio.muted;
    // }
}