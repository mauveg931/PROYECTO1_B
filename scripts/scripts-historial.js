document.addEventListener("DOMContentLoaded", () => {
    const cuerpo = document.getElementById("cuerpoHistorial");
    const historial = JSON.parse(localStorage.getItem("historial")) || [];

    /**
    * calcular puntuaciones
    */
    const movimientos = document.getElementById('movimientos');
    const aciertos = document.getElementById('aciertos'); 

    function calcularPuntos(aciertos, movimientos, tiempoTranscurrido) {
    const puntos = (aciertos * 50) - (movimientos * 2) - (tiempoTranscurrido*0.5);
    return Math.max(0, Math.round(puntos));

    }


    function mostrarRanking(historial) {
        // Asegurarse de que los puntos estén calculados
        historial.forEach(partida => {
            const aciertos = parseInt(partida.aciertos);
            const movimientos = parseInt(partida.movimientos);
            const duracion = parseFloat(partida.duracion);
    
            if (!isNaN(aciertos) && !isNaN(movimientos) && !isNaN(duracion)) {
                partida.puntos = calcularPuntos(aciertos, movimientos, duracion);
            } else {
                partida.puntos = 0;
            }
        });
    
        // Ordenar por puntos descendente y tomar top 5
        const top5 = historial.sort((a, b) => b.puntos - a.puntos).slice(0, 5);
    
        // IDs para colocar los nombres
        const ids = ["primero", "segundo", "tercero", "cuarto", "quinto"];
        const puntuaciones = document.querySelectorAll(".puntuacion");
    
        top5.forEach((partida, index) => {
            document.getElementById(ids[index]).textContent = partida.nombre || "Anónimo";
            puntuaciones[index].textContent = partida.puntos + " puntos";
        });
    }
    
    // Llamar a la función después de cargar el historial
    mostrarRanking(historial);
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
            const duracion = parseFloat(partida.duracion);

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
