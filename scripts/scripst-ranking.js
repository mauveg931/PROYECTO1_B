document.addEventListener("DOMContentLoaded", () => {
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
/**
 * 
 * funcion ranking
 */

    function mostrarRanking(historial) {
        
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
    
        
        const top5 = historial.sort((a, b) => b.puntos - a.puntos).slice(0, 5);
        const ids = ["primero", "segundo", "tercero", "cuarto", "quinto"];
        const puntuaciones = document.querySelectorAll(".puntuacion");
    
        top5.forEach((partida, index) => {
            document.getElementById(ids[index]).textContent = partida.nombre || "Jugador";
            puntuaciones[index].textContent = partida.puntos + " puntos";
        });
    }
   
    mostrarRanking(historial);
});