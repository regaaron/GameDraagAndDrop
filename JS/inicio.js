// oculta los botones del inicio y desoculta el form donde pones el nombre
function startGame() {
    document.getElementById("container-buttons").style.display = "none";
    var formulario = document.getElementById("formulario");
    formulario.style.display = "flex";
    formulario.style.flexDirection = "column";
    formulario.style.justifyContent = "center";
    formulario.style.alignItems = "center";
}




// funcion que oculta los botones del inicio y muestra los creditos
function adios() {
    document.getElementById("container-buttons").style.display = "none";
    var adios = (document.getElementById("creditos").style.display = "flex");
  }
  
  // funcion para mutiar el audio de fondo y cambiar el icono de musica de fondo
  function mute() {
    const logosMute = document.getElementsByClassName("volumen");
    const miAudio = document.getElementById("audio");
  
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
}