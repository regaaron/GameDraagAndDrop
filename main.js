var users=localStorage.getItem('users');
users=JSON.parse(users);
if(users==null) users=[];
var indice;


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
    

    if(!(existe())){
      alert("Usuario no existe")
        alta();
        var user=JSON.parse(users[users.length-1]);
        document.getElementById("user-name").innerHTML += user.userName;
        document.getElementById("user-score").innerHTML += user.userScore;
    }else{
        alert("Usuario  existe en el indice:" + indice)
    var user=JSON.parse(users[indice]);
    document.getElementById("user-name").innerHTML += user.userName;
    document.getElementById("user-score").innerHTML += user.userScore;
    }

}
function existe(){
    var userName=document.getElementById('name').value;
    var user = JSON.stringify({
        userName:userName,
        userScore:0
    });
    for(var i in users){
        var user=JSON.parse(users[i]);
        if(user.userName==userName){
            indice=i;
            return true;
        }
    }
    return false;

}
function alta(){
    var userName=document.getElementById('name').value;
    var userScore=0;
    var user = JSON.stringify({
        userName:userName,
        userScore:userScore
    });
    users.push(user);
    localStorage.setItem("users",JSON.stringify(users));
}

function adios(){
    document.getElementById("container-buttons").style.display = "none";
    var adios=document.getElementById("creditos").style.display = "flex";
}

function mute() {
    const logosMute = document.getElementsByClassName("volumen");
    const miAudio = document.getElementById("audio");

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
    const miAudio = document.getElementById("audio");
    miAudio.volume = 0.06;
    
}