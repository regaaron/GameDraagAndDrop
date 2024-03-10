

var Nombre = localStorage.nombre;
var Puntuacion = localStorage.puntaje;

var fondo= document.getElementById("Pfin");
var lapiz = fondo.getContext("2d");
var cartel = new Image();
var felicidades= new Image();
fondoF = new Image();
fondoF.src = "./Imagenes/fondoFinal.jpg"
let texto = "has completado el nivel "
felicidades.src = "./Imagenes/Felicidades.png";
cartel.src= "./Imagenes/cartel.png"
cartel.onload = function(){
    lapiz.drawImage(fondoF, 0, 0, 800, 600);
    lapiz.drawImage(cartel, 0, 0, 800, 600);
    lapiz.drawImage(felicidades, 160,20, 500, 200)
    lapiz.font = "40px Arial bolder";
    lapiz.fillStyle = "white";
    lapiz.fillText(Nombre, 300, 340);
    lapiz.font = "20px Arial";
    lapiz.fillText("has completado el nivel nivel con", 240, 380);
    lapiz.fillText(Puntuacion+" puntos", 300, 410);
    lapiz.fillText("sigue jugando para batir esos records", 240, 440);
}



