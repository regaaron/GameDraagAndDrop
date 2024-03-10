var users = localStorage.getItem("users");
users = JSON.parse(users);
if (users == null) users = [];
var indice;


function empezar() {

    
    if (!existe()) {
      alta();
      const user = JSON.parse(users[indice]);
      document.getElementById("exampleModalLabel").innerHTML = `Bienvenido ${user.userName}`;
      localStorage.setItem("minutos", 0);
      localStorage.setItem("segundos",0);
      document.getElementById("modal-p").innerHTML = `Tu score es de 0 pero estoy seguro a que llegaras a los mejores 5`;
    } else {
      // alert("Usuario  existe en el indice:" + indice)
      const user = JSON.parse(users[indice]);
      document.getElementById("exampleModalLabel").innerHTML = `Bienvenido de nuevo ${user.userName} `;
      document.getElementById("modal-p").innerHTML = `Tu mejor score quedo en ${user.userScore} venga mejoremos tu timepo de ` + localStorage.getItem("minutos") + ":" + localStorage.getItem("segundos");
    }
    
    localStorage.setItem("indice", JSON.stringify(indice));

    setTimeout(function() {
        window.location.href = "juego.html"; // Reemplaza con la URL a la que deseas redirigir
    }, 3000);
  
    // dibujar();
  }

  function existe() {
    var userName = document.getElementById("name").value;
    var user = JSON.stringify({
      userName: userName,
      userScore: 0,
    });
    for (var i in users) {
      var user = JSON.parse(users[i]);
      if (user.userName == userName) {
        indice = i;
        return true;
      }
    }
    return false;
  }

  function alta() {
    var userName = document.getElementById("name").value;
    var userScore = 0;
    var user = JSON.stringify({
      userName: userName,
      userScore: userScore,
    });
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    indice=users.length-1;
  }