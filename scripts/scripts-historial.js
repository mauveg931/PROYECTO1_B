
//constantes
const nombreFinal = localStorage.getItem("nombreFinal");
const dificultadFinal = localStorage.getItem("dificultadFinal");
const modoFinal = localStorage.getItem("modoFinal");
const temaFinal = localStorage.getItem("temaFinal");
const duracionFinal = localStorage.getItem("duracionFinal");
const fechaFinalFormateada = localStorage.getItem("fechaFinalFormateada");

//creacion de tabla con las constantes cada vez que se acaba una partida
const tabla = document.createElement("table");
const encabezado = document.createElement("thead");
const cuerpo = document.createElement("tbody");
const filaEncabezado = document.createElement("tr");
filaEncabezado.textContent= "Historial de partidas";


