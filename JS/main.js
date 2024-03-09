var users = localStorage.getItem("users");
users = JSON.parse(users);
if (users == null) users = [];
var indice;

var canvas = document.getElementById("gameCanvas");
var lapiz = canvas.getContext("2d");

var startX;
var startY;

let current_animal_index = null;
let is_dagging = false;

let preX;
let preY;

let scoreCurrent=0;
var aciertos = 0;

let imagesLoaded = 0;
let totalImages = 0

class Animal {
  constructor(animalX, animalY, animalImage, casaX, casaY, casaImage) {
    this.animalX = animalX;
    this.animalY = animalY;
    this.animalImage = animalImage;
    this.casaX = casaX;
    this.casaY = casaY;
    this.casaImage = casaImage;
  }

  Info() {
    console.log(
      "Animal en x: " +
        this.animalX +
        " y: " +
        this.animalY +
        " animalImage: " +
        this.animalImage +
        " Casa en x: " +
        this.casaX +
        " y: " +
        this.casaY +
        " casaimage: " +
        this.casaImage
    );
  }
}

let opciones = [
  new Animal(0, 250, "./Imagenes/mono.png", 0, 25, "./Imagenes/arbol.png"),
  new Animal(0, 250, "./Imagenes/shark.jpg", 0, 25, "./Imagenes/mar.jpg"),
  new Animal(0, 250, "./Imagenes/shark.jpg", 0, 25, "./Imagenes/aaron.jpg"),
  new Animal(0, 250, "./Imagenes/shark.jpg", 0, 25, "./Imagenes/alan.jpg"),
  new Animal(0, 250, "./Imagenes/shark.jpg", 0, 25, "./Imagenes/omar.jpg"),
  new Animal(0, 250, "./Imagenes/mono.png", 0, 25, "./Imagenes/aaron.jpg"),
  new Animal(0, 250, "./Imagenes/mono.png", 0, 25, "./Imagenes/alan.jpg"),
  new Animal(0, 250, "./Imagenes/mono.png", 0, 25, "./Imagenes/mar.jpg"),
  new Animal(0, 250, "./Imagenes/mono.png", 0, 25, "./Imagenes/omar.jpg"),
];

var animales;

window.onload = function () {
  // document.getElementById("canvas-container").style.display = "none";
  
  // var btnStart = document.getElementById("btn-start");
  // btnStart.addEventListener("click", startGame, false);
  const miAudio = document.getElementById("audio");
  miAudio.volume = 0.4;
  
};

// oculta los botones del inicio y desoculta el form donde pones el nombre
function startGame() {
  document.getElementById("container-buttons").style.display = "none";
  var formulario = document.getElementById("formulario");
  formulario.style.display = "flex";
  formulario.style.flexDirection = "column";
  formulario.style.justifyContent = "center";
  formulario.style.alignItems = "center";
}

function obtenerAleatorios(arr, cantidad) {
    // Copia el array para no modificar el original
    const opcionesCopia = arr.slice();
  
    // Función de comparación aleatoria
    const comparacionAleatoria = () => Math.random() - 0.5;
  
    // Mezcla el array usando la función de comparación aleatoria
    opcionesCopia.sort(comparacionAleatoria);
  
    // Devuelve los primeros 'cantidad' elementos del array mezclado
    return opcionesCopia.slice(0, cantidad);
  }


  function obtenerValorAleatorioNoRepetitivo() {
    var valoresX = [50, 350, 600];

    // Mezclar el arreglo de opciones de manera aleatoria
    var opcionesMezcladas = valoresX.sort(function () {
      return Math.random() - 0.5;
    });
  
    // Obtener los primeros 3 elementos del arreglo mezclado
    var valoresAleatorios = opcionesMezcladas.slice(0, 3);
    animales[0].animalX=valoresAleatorios[0];
    animales[1].animalX=valoresAleatorios[1];
    animales[2].animalX=valoresAleatorios[2];

    var opcionesMezcladas2 = valoresX.sort(function () {
        return Math.random() - 0.5;
      });
    var valoresAleatorios2 = opcionesMezcladas2.slice(0, 3);
    animales[0].casaX=valoresAleatorios2[0];
    animales[1].casaX=valoresAleatorios2[1];
    animales[2].casaX=valoresAleatorios2[2];
  }
  

// oculta el form y desoculta el canvas y el modal tambien checa si el usuario ya existe o es nuevo
function empezar() {
  formulario.style.display = "none";
  
  document.getElementById("canvas-container").style.display = "flex";
// Obtener un nuevo conjunto aleatorio de animales
  animales = obtenerAleatorios(opciones, 3);
  obtenerValorAleatorioNoRepetitivo();

  console.log(animales);
  // Llamar cargarImagenes después de que se haya inicializado animales
  cargarImagenes();
  if (!existe()) {
    alta();
    const user = JSON.parse(users[indice]);
    document.getElementById("user-name").innerHTML = `Bienvenido ${user.userName}`;
    document.getElementById("user-score").innerHTML = `Score: ${scoreCurrent}`;
    document.getElementById("exampleModalLabel").innerHTML = `Bienvenido ${user.userName}`;
    document.getElementById("modal-p").innerHTML = `Tu score es de 0 pero estoy seguro a que llegaras a los mejores 5`;
  } else {
    // alert("Usuario  existe en el indice:" + indice)
    const user = JSON.parse(users[indice]);
    document.getElementById("user-name").innerHTML = `Bienvenido ${user.userName}`;
    document.getElementById("user-score").innerHTML = `Score: ${scoreCurrent}`;
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
    lapiz.drawImage(
      animal.animalImageObj,
      animal.animalX,
      animal.animalY,
      150,
      150
    );
    // Dibuja la casa
  }
}

// funcion para comprobar si el usuario ya exitia y guardar el indice
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

// si no existe se da de alta y se indica que el indice es el ultimo elemento
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

 // Cada animal tiene dos imágenes


// funcion para cargar las imagenes antes de ser pintadas en el canvas esto evita que salgan parpadiando
function cargarImagenes() {

    imagesLoaded = 0;
    totalImages = 6;
  for (let animal of animales) {
    cargarImagen(animal);
  }
}

// funcion para cargar las imagene
function cargarImagen(animal) {
    // las imagenes del animal
  animal.animalImageObj = new Image();
  animal.animalImageObj.src = animal.animalImage;
  animal.animalImageObj.onload = function () {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
      // Todas las imágenes han sido cargadas, ahora podemos dibujar
      dibujar();
    }
  };
//   las imagenes de la casa
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

// funcion para cuando haces clik
let mouse_down = function (event) {
    event.preventDefault();
  //   obtener x y y dentro del canvas use offset por si se hace mas chica la pantalla 
    startX = parseInt(event.offsetX);
    startY = parseInt(event.offsetY);
  
    let index = 0;
    for (let animal of animales) {
        // comprobamos si se dio click a uno y guardamos su index del array de 
        // animales guardamos prex y prey valores iniales por si se equivoca regresar el obj a su posicion
      if (is_mouse_in_animal(startX, startY, animal)) {
        current_animal_index = index;
        preX = animal.animalX;
        preY = animal.animalY;
        is_dagging = true;
        return;
      }

      index++;
    }

};


let is_mouse_in_animal = function (x, y, animal) {
    let animal_left = animal.animalX;
    let animal_right = animal.animalX + 150;
    let animal_top = animal.animalY;
    let animal_bottom = animal.animalY + 150;
  
    return (
      x > animal_left && x < animal_right && y > animal_top && y < animal_bottom
    );
};

// logica del drop o soltar el clik
let mouse_up = function (event) {
  let finX = parseInt(event.offsetX);
  let finY = parseInt(event.offsetY);
  if (!is_dagging) {
    return;
  }
  event.preventDefault();
  const user = JSON.parse(users[indice]);

//   comprobamos si el animal esta dentro de la casa para hacer todo como puntos sonido etc
  if (dentroCasa(finX, finY)) {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      emojis: ["✨"],
      confettiRadius: 6,
      confettiNumber: 50,
    });
    scoreCurrent += 10;
    aciertos++
    console.log(`aciertos=${aciertos}`);
    reproducirSonidoGanador();
    
  } else {
    let current_animal = animales[current_animal_index];
    current_animal.animalX = preX;
    current_animal.animalY = preY;
    scoreCurrent -= 10;
    reproducirSonidoPerdedor();

  }
  
  if(aciertos==3){
    
    if(scoreCurrent>user.userScore){
        actualizarPuntajeNuevo();
    }
  }

  document.getElementById("user-score").innerHTML = `Score: ${scoreCurrent}`;

  dibujar();
  is_dagging = false;

};

function actualizarPuntajeNuevo() {
    const user = JSON.parse(users[indice]);
  
    // Actualiza el puntaje del usuario
    user.userScore = scoreCurrent;
    users[indice]=JSON.stringify(user);

    // Guardar la información actualizada en el localStorage
    localStorage.setItem("users", JSON.stringify(users));

  }


const dentroCasa = function (x, y) {
  let animal = animales[current_animal_index];
   return (
    x > animal.casaX &&x < animal.casaX + 150 &&
    y > animal.casaY && y < animal.casaY + 150
  );
    
};


let mouse_out = function (event) {
  if (!is_dagging) {
    return;
  }
  event.preventDefault();
  is_dagging = false;
};

// logica del movimiento
let mouse_move = function (event) {

  if (!is_dagging) {
    return;
  } else {
    event.preventDefault();

    let mouseX = parseInt(event.offsetX);
    let mouseY = parseInt(event.offsetY);

    // deltax y deltay es para saber cuantos pixeles se ha movido desde el inicio y movernos esos 
    // pixeles y se actualiza starX y startY
    let dx = mouseX - startX;
    let dy = mouseY - startY;

    let current_animal = animales[current_animal_index];
    current_animal.animalX += dx;
    current_animal.animalY += dy;


    dibujar();

    startX = mouseX;
    startY = mouseY;
  }
};


function reproducirSonidoGanador() {
    var audio = document.getElementById("audio-point");
    audio.play();
  }
  
  function reproducirSonidoPerdedor() {
    var audio = document.getElementById("audio-error");
    audio.play();
  }

//   eventos del canvas de mouse disparadores cuando ocurren hacen la funcion 
canvas.onmousedown = mouse_down;
canvas.onmouseup = mouse_up;
canvas.onmousemove = mouse_move;
canvas.onmouseout = mouse_out;