var users = localStorage.getItem("users");
users = JSON.parse(users);
if (users == null) users = [];
var indice = localStorage.getItem("indice");
indice = JSON.parse(indice);
var tiempo = localStorage.getItem("segundos");

const user = JSON.parse(users[indice]);

window.onload = function () {
    var audio = document.getElementById("audio-victoria");
    audio.play();
    document.getElementById("titulo-ganador").innerHTML = `Felicidades ${user.userName}`;
    document.getElementById("score").innerHTML = `Tu tiempo fue de: ${tiempo}`;
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      emojis: ["✨","🪙"],
      confettiRadius: 6,
      confettiNumber: 60,
    });
}