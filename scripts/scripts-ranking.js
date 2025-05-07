document.addEventListener("DOMContentLoaded", () => {
/**
 * calcular puntuaciones
 */
const movimientos = document.getElementById('movimientos');
const aciertos = document.getElementById('aciertos'); 

function calcularPuntos(aciertos, movimientos, tiempo) {
  var puntosFinales = (aciertos * 10) - (movimientos * 5) - (tiempo*0.5) ;


}


});