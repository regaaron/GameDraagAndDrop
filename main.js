var users=localStorage.getItem('users');
users=JSON.parse(users);
if(users==null) users=[];
var indice;
var canvas = document.getElementById("gameCanvas");
var lapiz = canvas.getContext("2d");

var startX;
var startY;

let current_animal_index=null;
let is_dagging = false;

let preX;
let preY;

// let offset_X;
// let offset_Y;



// let get_offset = function (){
//     let canvas_offsets = canvas.getBoundingClientRect();
//     offset_X = canvas_offsets.left;
//     offset_Y = canvas_offsets.top; 
//     console.log("offsetX: "+offset_X+" offsetY: "+offset_Y);
// }

// get_offset();

// window.onscroll = function() { get_offset();}
// window.onresize = function() { get_offset();}
// canvas.onresize = function() { get_offset();}


class Animal{
    constructor(animalX,animalY,animalImage,casaX,casaY,casaImage){
        this.animalX=animalX;
        this.animalY=animalY;
        this.animalImage=animalImage;
        this.casaX=casaX;
        this.casaY=casaY;
        this.casaImage=casaImage;
    }

    Info(){
        console.log("Animal en x: "+this.animalX+" y: "+this.animalY+" animalImage: "+this.animalImage
        +" Casa en x: "+this.casaX+" y: "+this.casaY+" casaimage: "+this.casaImage);
    
    }
}

let animales=[ new Animal(50,250,"./mono.png",50,25,"./arbol.png"),
                 new Animal(350,250,"./shark.jpg",350,25,"./mar.jpg"),
                new Animal(600,250,"./shark.jpg",600,25,"./aaron.jpg")];



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
    cargarImagenes();

    if(!(existe())){
    //   alert("Usuario no existe")
        alta();

        var user=JSON.parse(users[users.length-1]);
        document.getElementById("user-name").innerHTML = `Bienvenido ${user.userName}`;
        document.getElementById("user-score").innerHTML = `Score: ${user.userScore}`;
        document.getElementById("exampleModalLabel").innerHTML = `Bienvenido ${user.userName}`;
        document.getElementById("modal-p").innerHTML = `Tu score es de 0 pero estoy seguro a que llegaras a los mejores 5`;

        var okButton = document.querySelector('#exampleModal button.btn-success');

        document.getElementById('exampleModal').addEventListener('keypress', function (event) {
            // Verifica si la tecla presionada es "Enter"
            if (event.key === 'Enter') {
                // Simula hacer clic en el botón "OK"
                okButton.click();
            }
        });
    

    }else{
        // alert("Usuario  existe en el indice:" + indice)
    var user=JSON.parse(users[indice]);
    document.getElementById("user-name").innerHTML = `Bienvenido ${user.userName}`;
    document.getElementById("user-score").innerHTML = `Score: ${user.userScore}`;
    document.getElementById("exampleModalLabel").innerHTML = `Bienvenido de nuevo ${user.userName} `;
    document.getElementById("modal-p").innerHTML = `Tu mejor score quedo en ${user.userScore} venga mejoremos`;

    }

    // dibujar();
    
   

}

function dibujar() {
    lapiz.clearRect(0, 0, 800, 400);
    for (let animal of animales) {
        // Dibuja el animal
        lapiz.drawImage(animal.casaImageObj, animal.casaX, animal.casaY, 150, 150);
        lapiz.drawImage(animal.animalImageObj, animal.animalX, animal.animalY, 150, 150);
        // Dibuja la casa
    }
}

function Game(){
    

     
    let shapes = [];
    shapes.push({x:0, y:0, width:200, height:300,color:"blue"});
    shapes.push({x:0, y:0, width:100, height:100, color:"red"});
    lapiz.clearRect(0,0,canvas.width,canvas.height);
    for(let shape of shapes){
        lapiz.fillStyle = shape.color
        lapiz.fillRect(shape.x, shape.y, shape.width, shape.height);
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




window.onload = function () {
    document.getElementById("canvas-container").style.display = "none";
    cargarImagenes();
    var btnStart = document.getElementById("btn-start");
    btnStart.addEventListener("click", startGame, false);
    const miAudio = document.getElementById("audio");
    miAudio.volume = 0.4;

    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
        emojis: ['✨'],
        confettiRadius: 6,
        confettiNumber: 100,
    });
}

let mouse_down = function (event){
    event.preventDefault();
    startX = parseInt(event.offsetX);
    startY = parseInt(event.offsetY);

    let index = 0;
    for(let animal of animales){
        if(is_mouse_in_animal(startX,startY,animal)){
            console.log("dentro")
            current_animal_index=index;
            preX=animal.animalX;
            preY=animal.animalY;
            is_dagging=true;
            return
        }else{
            console.log(`fuera
                        x=${startX},y=${startY}
                        xAnimal=${animal.animalX},yAnimal=${animal.animalY}`);
                        console.log(event);
        }
        index++
    }
}

let imagesLoaded = 0;
let totalImages = animales.length * 2; // Cada animal tiene dos imágenes

function cargarImagenes() {
    for (let animal of animales) {
        cargarImagen(animal);
    }
}


function cargarImagen(animal) {
    animal.animalImageObj = new Image();
    animal.animalImageObj.src = animal.animalImage;
    animal.animalImageObj.onload = function () {
        imagesLoaded++;
        if (imagesLoaded === totalImages) {
            // Todas las imágenes han sido cargadas, ahora podemos dibujar
            dibujar();
        }
    };

    animal.casaImageObj = new Image();
    animal.casaImageObj.src = animal.casaImage;
    animal.casaImageObj.onload = function () {
        imagesLoaded++;
        if (imagesLoaded === totalImages) {
            // Todas las imágenes han sido cargadas, ahora podemos dibujar
            dibujar();
        }
    };
}


let mouse_up = function(event) {
    let finX = parseInt(event.offsetX);
    let finY = parseInt(event.offsetY);
    if(!is_dagging){
        return
    }
    event.preventDefault();

    if(dentroCasa(finX, finY)){
       alert("DropTrue");
        
    }else{
        alert("Dropfalso")
        let current_animal = animales[current_animal_index];
        current_animal.animalX = preX;
        current_animal.animalY = preY;
        dibujar();
    }

    is_dagging=false;
}

const dentroCasa = function(x,y) {
    let animal = animales[current_animal_index];
    if (x>animal.casaX && x<animal.casaX+150 && y>animal.casaY && y<animal.casaY+150){
        console.log(`x=${x}, y=${y}, casaX=${animal.casaX}, casaY=${animal.casaY}`);
        return true;
    }else{
        return false;
    }
    
}



let mouse_out = function(event) {
    if(!is_dagging){
        return
    }
    event.preventDefault();
    is_dagging=false;
}

let is_mouse_in_animal = function(x,y,animal){
    let animal_left = animal.animalX;
    let animal_right = animal.animalX + 150;
    let animal_top = animal.animalY;
    let animal_bottom = animal.animalY + 150;

    return (x>animal_left && x<animal_right && y>animal_top && y<animal_bottom);
}

let mouse_move = function(event) {
    if(!is_dagging){
        return
    }else{
        event.preventDefault();
        
        let mouseX = parseInt(event.offsetX);
        let mouseY = parseInt(event.offsetY);

        let dx = mouseX - startX;
        let dy = mouseY - startY;

        let current_animal = animales[current_animal_index];
        current_animal.animalX += dx;
        current_animal.animalY += dy;

        dibujar();

        startX = mouseX;
        startY = mouseY;

    }
}

canvas.onmousedown = mouse_down;
canvas.onmouseup = mouse_up;
canvas.onmousemove = mouse_move;
canvas.onmouseout = mouse_out;