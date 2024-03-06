function startGame(){
    document.getElementById("container-buttons").style.display = "none";
    // document.getElementById("gameCanvas").style.display = "block";
    var formulario=document.getElementById("formulario")
    formulario.style.display = "flex";
    formulario.style.flexDirection = "column";
    formulario.style.justifyContent = "center";
    formulario.style.alignItems = "center";
    

}

function empezar(){
    formulario.style.display = "none";
    document.getElementById("canvas-container").style.display = "flex";

}

function adios(){
    document.getElementById("container-buttons").style.display = "none";
    var adios=document.getElementById("adios");
    adios.innerHTML=`<h2 class="adios">Adios querido amigo</h2>`;
}

function mute() {
    const miAudio = document.getElementById("audio");
    const logosMute = document.getElementsByClassName("volumen");

    for(const logo of logosMute){

        if (miAudio.muted) {
            logo.classList.add("fa-volume-high");
            logo.classList.remove("fa-volume-xmark");
        } else {
            logo.classList.remove("fa-volume-high");
            logo.classList.add("fa-volume-xmark");
        }
    }

    miAudio.muted = !miAudio.muted;
    
}


window.onload = function(){
    var lienzo = document.getElementById("gameCanvas");
    document.getElementById("canvas-container").style.display="none";
    var btnStart = document.getElementById("btn-start");
    btnStart.addEventListener("click", startGame, false);
}