document.addEventListener("DOMContentLoaded", () => {
    const cuerpo = document.getElementById("cuerpoHistorial");
    const historial = JSON.parse(localStorage.getItem("historial")) || [];

    // Función para formatear la duración en formato 00:00
    const formatearDuracion = (duracion) => {
        const minutos = Math.floor(duracion / 60);
        const segundos = duracion % 60;
        return `${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
    };

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

            ["nombre", "dificultad", "tema", "modo", "duracion", "fecha"].forEach((key) => {
                const celda = document.createElement("td");
                celda.textContent = partida[key];
                fila.appendChild(celda);
            });

            cuerpo.appendChild(fila);
        });
    }
});
