var users = localStorage.getItem("users");
users = JSON.parse(users);
if (users == null) users = [];
var indice = localStorage.getItem("indice");
indice = JSON.parse(indice);

const user = JSON.parse(users[indice]);

window.onload = function () {
    var audio = document.getElementById("audio-victoria");
    audio.play();
    document.getElementById("titulo-ganador").innerHTML = `Felicidades ${user.userName}`

    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      emojis: ["✨"],
      confettiRadius: 6,
      confettiNumber: 60,
    });
}