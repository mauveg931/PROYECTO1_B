document.addEventListener("DOMContentLoaded", () => {
    const cuerpo = document.getElementById("cuerpoHistorial");
    const historial = JSON.parse(localStorage.getItem("historial")) || [];

     /**
    * calcular puntuaciones
    */

     
 
     function calcularPuntos(aciertos, movimientos, tiempoTranscurrido) {
     const puntos = (aciertos * 50) - (movimientos * 2) - (tiempoTranscurrido*0.5);
     return Math.max(0, Math.round(puntos));
 
     }
/**
 * crear historial
 */
    if (historial.length === 0) {
        const fila = document.createElement("tr");
        const celda = document.createElement("td");
        celda.colSpan = 6;
        celda.textContent = "No hay partidas registradas aún.";
        fila.appendChild(celda);
        cuerpo.appendChild(fila);
    } else {
        historial.forEach((partida) => {
            const fila = document.createElement("tr");
            const aciertos = parseInt(partida.aciertos);
            const movimientos = parseInt(partida.movimientos);
            const duracion = partida.duracion === "Desactivado" ? 0 : parseFloat(partida.duracion);
        
            if (!isNaN(aciertos) && !isNaN(movimientos) && !isNaN(duracion)) {
                partida.puntos = calcularPuntos(aciertos, movimientos, duracion);
            } else {
                partida.puntos = 0;
            }
        
            ["nombre", "dificultad", "tema", "modo", "duracion", "puntos", "fecha"].forEach((key) => {
                const celda = document.createElement("td");
                celda.textContent = partida[key];
                fila.appendChild(celda);
            });
        
            cuerpo.appendChild(fila);
        });
        
    }
});

