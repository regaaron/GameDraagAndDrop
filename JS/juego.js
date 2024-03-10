var users = localStorage.getItem("users");
users = JSON.parse(users);
if (users == null) users = [];
var indice = localStorage.getItem("indice");
indice = JSON.parse(indice);

const user = JSON.parse(users[indice]);
var canvas ;
var canvas2;
var canvas3;
var lapiz2;
var lapiz3;
var lapiz ;

var startX;
var startY;

let current_animal_index = null;
let is_dagging = false;

let preX;
let preY;
var contador = 0;

let scoreCurrent=0;
var aciertos = 0;

let imagesLoaded = 0;
let totalImages = 0

class Animal {
    constructor(animalX, animalY, animalImage, casaX, casaY, casaImage, bandera, number1) {
      this.animalX = animalX;
      this.animalY = animalY;
      this.animalImage = animalImage;
      this.casaX = casaX;
      this.casaY = casaY;
      this.casaImage = casaImage;
      this.bandera = bandera;
      this.number1 = number1;
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
    new Animal(0, 250, "./Imagenes/mono.png", 0, 25, "./Imagenes/HabitadMono.png", false,0),
    new Animal(0, 250, "./Imagenes/Caballo.png", 0, 25, "./Imagenes/HabitadCaballo.png", false,1),
    new Animal(0, 250, "./Imagenes/Cerdo.png", 0, 25, "./Imagenes/HabitadCerdos.png", false,2),
    new Animal(0, 250, "./Imagenes/Elefante.png", 0, 25, "./Imagenes/HabitadElefante.png", false,3),
    new Animal(0, 250, "./Imagenes/Gallina.png", 0, 25, "./Imagenes/HabitadGallinas.png", false,4),
    new Animal(0, 250, "./Imagenes/Osopolar.png", 0, 25, "./Imagenes/HabitadOsopolar.png", false,5),
    new Animal(0, 250, "./Imagenes/Pajaros.png", 0, 25, "./Imagenes/HabitadPajaros.png", false,6),
    new Animal(0, 250, "./Imagenes/Perro.png", 0, 25, "./Imagenes/HabitadPerro.png", false,7),
    new Animal(0, 250, "./Imagenes/Rana.png", 0, 25, "./Imagenes/HabitadRana.png", false,8),
  ];
  
  let opciones2 = [];

  var animales;

  
function obtenerAleatorios(arr, cantidad) {
    // Copia el array para no modificar el original
    const opcionesCopia = arr.slice();
    console.log(opcionesCopia);
    // Función de comparación aleatoria
    for (var i = opciones2.length - 1; i >= 0; i--) {
      opcionesCopia.splice(opciones2[i], 1);
    }
    const comparacionAleatoria = () => Math.random() - 0.5;
  
    // Mezcla el array usando la función de comparación aleatoria
    opcionesCopia.sort(comparacionAleatoria);

    // Devuelve los primeros 'cantidad' elementos del array mezclado
    return opcionesCopia.slice(0, cantidad);
  }

  let tiempoInicio = new Date().getTime(); // Guardamos el momento en que comienza el contador de tiempo

  let tiempoElemento = document.getElementById("time");
  
  // Función para actualizar el tiempo transcurrido
  let minutos = 0;
  let segundos = 0;

  function actualizarTiempo() {
    // Obtener el tiempo actual
    tiempoActual = new Date().getTime();
    
    // Calcular la diferencia de tiempo en milisegundos
    let tiempoTranscurrido = tiempoActual - tiempoInicio;
  
    // Calcular minutos y segundos
    minutos = Math.floor(tiempoTranscurrido / (1000 * 60));
    segundos = Math.floor((tiempoTranscurrido % (1000 * 60)) / 1000);
  
    // Mostrar el tiempo transcurrido en formato MM:SS
    tiempoElemento.textContent = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
  }
  
  // Llamar a la función actualizarTiempo cada segundo (1000 milisegundos)
  setInterval(actualizarTiempo, 1000);
  


  function obtenerValorAleatorioNoRepetitivo() {
    const valoresX = [100, 500 , 900];


    // Mezclar el arreglo de opciones de manera aleatoria
    var opcionesMezcladas = valoresX.sort(function () {
      return Math.random() - 0.5;
    });
  
    // Obtener los primeros 3 elementos del arreglo mezclado
    var valoresAleatorios = opcionesMezcladas.slice(0, 3);
    animales[0].animalX=valoresAleatorios[0] + 27;
    animales[1].animalX=valoresAleatorios[1] + 27;
    animales[2].animalX=valoresAleatorios[2] + 27;

    var opcionesMezcladas2 = valoresX.sort(function () {
        return Math.random() - 0.5;
      });
      
    var valoresAleatorios2 = opcionesMezcladas2.slice(0, 3);
    animales[0].casaX=valoresAleatorios2[0];
    animales[1].casaX=valoresAleatorios2[1];
    animales[2].casaX=valoresAleatorios2[2];
  }

  
function dibujar() {
    lapiz.clearRect(0, 0, canvas.width, canvas.height);
    for (let animal of animales) {
      // Dibuja el animal
      drawCircularImage(lapiz, animal.casaImageObj, animal.casaX, animal.casaY, 100); // 100 es el radio del círculo
      drawCircularImage(lapiz, animal.animalImageObj, animal.animalX, animal.animalY, 70); // 100 es el radio del círculo
      // Dibuja la casa
    }
}

function dibujar2() {
  lapiz2.clearRect(0, 0, canvas2.width, canvas2.height);
  for (let animal of animales) {
    // Dibuja el animal
    drawCircularImage(lapiz2, animal.casaImageObj, animal.casaX, animal.casaY, 100); // 100 es el radio del círculo
    drawCircularImage(lapiz2, animal.animalImageObj, animal.animalX, animal.animalY, 70); // 100 es el radio del círculo
    // Dibuja la casa
  }
}

function dibujar3() {
  lapiz3.clearRect(0, 0, canvas3.width, canvas3.height);
  for (let animal of animales) {
    // Dibuja el animal
    drawCircularImage(lapiz3, animal.casaImageObj, animal.casaX, animal.casaY, 100); // 100 es el radio del círculo
    drawCircularImage(lapiz3, animal.animalImageObj, animal.animalX, animal.animalY, 70); // 100 es el radio del círculo
    // Dibuja la casa
  }
}
  

window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  
  canvas2 = document.getElementById("gameCanvas2");
  
  canvas3 = document.getElementById("gameCanvas3");

  lapiz = canvas.getContext("2d");
  
  lapiz2 = canvas2.getContext("2d");
  
  lapiz3 = canvas3.getContext("2d");

  
  document.getElementById("gameCanvas2").style.display = "none";
  document.getElementById("gameCanvas3").style.display = "none";  

  document.getElementById("user-name").innerHTML = `Bienvenido ${user.userName}`;
  document.getElementById("user-score").innerHTML = `Score: ${scoreCurrent}`;

  animales = obtenerAleatorios(opciones, 3);
  obtenerValorAleatorioNoRepetitivo();
  cargarImagenes();

  // eventos del canvas de mouse disparadores cuando ocurren hacen la funcion
  canvas.onmousedown = mouse_down;
  canvas.onmouseup = mouse_up;
  canvas.onmousemove = mouse_move;
  canvas.onmouseout = mouse_out;
  
};

function inicializar(){
  opciones2.sort();
  console.log(opciones2);
  animales = obtenerAleatorios(opciones, 3);
  obtenerValorAleatorioNoRepetitivo();
  cargarImagenes2();

  canvas2.onmousedown = mouse_down;
  canvas2.onmouseup = mouse_up;
  canvas2.onmousemove = mouse_move;
  canvas2.onmouseout = mouse_out;
  
}

function inicializar2(){
  opciones2.sort();
  console.log(opciones2);
  animales = obtenerAleatorios(opciones, 3);
  console.log(animales);
  obtenerValorAleatorioNoRepetitivo();
  cargarImagenes3(); 

  canvas3.onmousedown = mouse_down;
  canvas3.onmouseup = mouse_up;
  canvas3.onmousemove = mouse_move;
  canvas3.onmouseout = mouse_out;
  
}

function cargarImagenes() {
  imagesLoaded = 0;
  totalImages = 6;

  for (let animal of animales) {
    cargarImagen(animal, function() {
      imagesLoaded++;
      if (imagesLoaded === totalImages) {
        dibujar(); // Llamamos a dibujar una vez que todas las imágenes estén cargadas
      }
    });
  }
}

function cargarImagenes2() {
  imagesLoaded = 0;
  totalImages = 6;

  for (let animal of animales) {
    cargarImagen(animal, function() {
      imagesLoaded++;
      if (imagesLoaded === totalImages) {
        dibujar2(); // Llamamos a dibujar una vez que todas las imágenes estén cargadas
      }
    });
  }
}

function cargarImagenes3() {
  imagesLoaded = 0;
  totalImages = 6;

  for (let animal of animales) {
    cargarImagen(animal, function() {
      imagesLoaded++;
      if (imagesLoaded === totalImages) {
        dibujar3(); // Llamamos a dibujar una vez que todas las imágenes estén cargadas
      }
    });
  }
}

function cargarImagen(animal, onLoadCallback) {
  // Cargamos la imagen del animal
  animal.animalImageObj = new Image();
  animal.animalImageObj.src = animal.animalImage;
  animal.animalImageObj.onload = onLoadCallback;

  // Cargamos la imagen de la casa
  animal.casaImageObj = new Image();
  animal.casaImageObj.src = animal.casaImage;
  animal.casaImageObj.onload = onLoadCallback;
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
    let animal_right = animal.animalX + 200; // Ajusta al nuevo tamaño de imagen
    let animal_top = animal.animalY;
    let animal_bottom = animal.animalY + 200; // Ajusta al nuevo tamaño de imagen
  
    return (
      x > animal_left && x < animal_right && y > animal_top && y < animal_bottom
    );
};

// logica del drop o soltar el clik
// logica del drop o soltar el clik
let mouse_up = function (event) {
  let finX = parseInt(event.offsetX);
  let finY = parseInt(event.offsetY);
  if (!is_dagging) {
    return;
  }
  event.preventDefault();
  const user = JSON.parse(users[indice]);

  // comprobamos si el animal esta dentro de la casa para hacer todo como puntos sonido etc
  if (dentroCasa(finX, finY)) {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      emojis: ["✨"],
      confettiRadius: 6,
      confettiNumber: 50,
    });
    if(animales[current_animal_index].bandera == false){
      scoreCurrent += 10;
      opciones2[contador] = animales[current_animal_index].number1;
      contador++;
      aciertos++
      console.log(opciones2[contador]);
      console.log(`aciertos=${aciertos}`);
      reproducirSonidoGanador();
    }
    
    // Actualiza la bandera del animal a verdadero cuando está dentro de la casa
    animales[current_animal_index].bandera = true;
  } else if (animales[current_animal_index].bandera == false) {
    if (dentroOtraCasa(finX, finY)) {
      scoreCurrent -= 10;
      reproducirSonidoPerdedor();
    }
    
    // Devolver el animal a su posición original
    let current_animal = animales[current_animal_index];
    current_animal.animalX = preX;
    current_animal.animalY = preY;
  }
  
  if(aciertos == 9){
    //pantalla de ganar
    if(scoreCurrent>user.userScore){
      actualizarPuntajeNuevo();
    }

    if(localStorage.getItem("minutos") == 0 && localStorage.getItem("segundos") == 0){
      localStorage.setItem("minutos", minutos);
      localStorage.setItem("segundos", segundos);
    }else if(((minutos*60) + segundos) < ((localStorage.getItem("minutos")*60) + localStorage.getItem("segundos"))){
      localStorage.setItem("minutos", minutos);
      localStorage.setItem("segundos", segundos);
    }
    window.location.href = "index.html";
  }

  document.getElementById("user-score").innerHTML = `Score: ${scoreCurrent}`;

  dibujar();
  dibujar2();
  dibujar3();
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


  const dentroOtraCasa = function (x, y) {
    // Iterar sobre todas las casas excepto la casa actual del animal
    for (let i = 0; i < opciones.length; i++) {
      if (i !== current_animal_index) {
        let casa = opciones[i];
        // Verificar si las coordenadas (x, y) están dentro de la casa actual
        if (
          x > casa.casaX &&
          x < casa.casaX + 200 && // Ajusta al nuevo tamaño de imagen
          y > casa.casaY &&
          y < casa.casaY + 200 // Ajusta al nuevo tamaño de imagen
        ) {
          return true; // Devolver true si las coordenadas están dentro de la casa
        }
      }
    }
    return false; // Devolver false si las coordenadas no están dentro de ninguna otra casa
  };
  

const dentroCasa = function (x, y) {
  let animal = animales[current_animal_index];
   return (
    x > animal.casaX &&x < animal.casaX + 200 && // Ajusta al nuevo tamaño de imagen
    y > animal.casaY && y < animal.casaY + 200 // Ajusta al nuevo tamaño de imagen
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

    // Verifica si la bandera del animal está en falso
    let current_animal = animales[current_animal_index];
    if (!current_animal.bandera) {
      // Si la bandera es falsa, permitir el movimiento del animal
      let dx = mouseX - startX;
      let dy = mouseY - startY;
      current_animal.animalX += dx;
      current_animal.animalY += dy;
    }

    dibujar();
    dibujar2();
    dibujar3();
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

// Función para dibujar una imagen en forma circular
function drawCircularImage(context, image, x, y, radius) {
    context.save();
    context.beginPath();
    context.arc(x + radius, y + radius, radius, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();
    context.drawImage(image, x, y, radius * 2, radius * 2);
    context.restore();
}

// Agregar un evento de clic a la flecha
document.getElementById("flecha").addEventListener("click", function() {
  if(aciertos == 3){
    document.getElementById("gameCanvas").style.display = "none";
    document.getElementById("gameCanvas2").style.display = "block";
    document.getElementById("gameCanvas3").style.display = "none";  
    inicializar();
  }else if(aciertos == 6){
    document.getElementById("gameCanvas").style.display = "none";
    document.getElementById("gameCanvas2").style.display = "none";
    document.getElementById("gameCanvas3").style.display = "block";  
    inicializar2();
  }
});
