var users = localStorage.getItem("users");
users = JSON.parse(users);
if (users == null) users = [];
var indice = localStorage.getItem("indice");
indice = JSON.parse(indice);
var tiempo = localStorage.getItem("segundos");
var tiempo2 = localStorage.getItem("minutos");

const user = JSON.parse(users[indice]);

// Guardar el tiempo en el objeto de usuario
user.tiempo = `${tiempo2}:${tiempo}`;

// Guardar el usuario actualizado de nuevo en el arreglo de usuarios
users[indice] = JSON.stringify(user);

// Guardar los usuarios actualizados en el almacenamiento local
localStorage.setItem("users", JSON.stringify(users));

window.onload = function () {
    var audio = document.getElementById("audio-victoria");
    audio.play();
    document.getElementById("titulo-ganador").innerHTML = `Felicidades ${user.userName}`;
    document.getElementById("score").innerHTML = `Tu mejor tiempo fue de ${tiempo2}:${tiempo}. ¡Toca superarlo!`;
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      emojis: ["✨","🪙"],
      confettiRadius: 6,
      confettiNumber: 60,
    });
}
