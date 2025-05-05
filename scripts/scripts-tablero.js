document.addEventListener("DOMContentLoaded", () => {
    const nivel = localStorage.getItem("nivel");
    const temporizador = localStorage.getItem("temporizador");
    const nombre = localStorage.getItem("nombre");
    const modo = localStorage.getItem("modo");
    const tema = localStorage.getItem("tema");
    const filas = localStorage.getItem("filas");
    const columnas = localStorage.getItem("columnas");

    const nombreScreen = document.getElementById("nombreScreen");
    const modoScreen = document.getElementById("modoScreen");
    const nivelScreen = document.getElementById("nivelScreen");
    const tematicaScreen = document.getElementById("tematicaScreen");
    const fondoImg = document.getElementsByClassName("fondo1")[0];
    const temp = document.getElementById("tiempo");
    const campojuego = document.getElementById("campojuego");

    if (temporizador === "desactivado") {
        temp.textContent = "TEMPORIZADOR DESACTIVADO";
    }

    if (fondoImg) {
        if (nivel == "facil") fondoImg.src = "../img/fondorojo.png";
        else if (nivel == "medio") fondoImg.src = "../img/fondoverde.png";
        else if (nivel == "dificil") fondoImg.src = "../img/fondoazul.png";
        else if (nivel == "personalizado") fondoImg.src = "../img/fondorosa.png";
    }

    nombreScreen.textContent = "Nombre: " + nombre;
    modoScreen.textContent = "Modo: " + modo;
    nivelScreen.textContent = "Nivel: " + nivel;
    tematicaScreen.textContent = "Tema: " + tema;

    const grid = document.getElementById('campojuego');

    let fila, colum;
    if (nivel === "facil") {
        fila = 4; colum = 4;
    } else if (nivel === "medio") {
        fila = 5; colum = 4;
    } else if (nivel === "dificil") {
        fila = 6; colum = 6;
    } else if (nivel === "personalizado") {
        fila = parseInt(filas); colum = parseInt(columnas);
    } else {
        console.warn("Nivel no reconocido:", nivel);
        return;
    }

    grid.style.gridTemplateColumns = `repeat(${colum}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${fila}, 1fr)`;

    const totalCartas = fila * colum;

    if (totalCartas % 2 !== 0) {
        alert("El número total de cartas debe ser par.");
        return;
    }

    // Crear array de rutas de imágenes
    const imagenes = [];
    for (let i = 1; i <= totalCartas / 2; i++) {
        imagenes.push(`../img/temaMarioBros/carta${i}.png`);
        imagenes.push(`../img/temaMarioBros/carta${i}-copia.png`);
    }

    // Barajar
    imagenes.sort(() => Math.random() - 0.5);

    let primeraCarta = null;
    let segundaCarta = null;
    let bloqueo = false;

    for (let i = 0; i < totalCartas; i++) {
        const celda = document.createElement('div');
        celda.className = 'celda carta';

        const contenedor = document.createElement('div');
        contenedor.className = 'contenedor-carta';

        const trasera = document.createElement('img');
        trasera.className = 'cara trasera';

        if (nivel === "facil") trasera.src = "../img/cartaPorDetras.png";
        else if (nivel === "medio") trasera.src = "../img/cartaPorDetrasVerde.png";
        else if (nivel === "dificil") trasera.src = "../img/cartaPorDetrasAzul.png";
        else trasera.src = "../img/cartaPorDetrasRosa.png";

        const frente = document.createElement('img');
        frente.className = 'cara frente';
        frente.src = imagenes[i];

        contenedor.appendChild(trasera);
        contenedor.appendChild(frente);
        celda.appendChild(contenedor);

        celda.dataset.imagen = imagenes[i];

        celda.addEventListener('click', () => {
            if (bloqueo || celda.classList.contains('volteada')) return;

            celda.classList.add('volteada');

            if (!primeraCarta) {
                primeraCarta = celda;
            } else {
                segundaCarta = celda;
                bloqueo = true;

                const img1 = primeraCarta.dataset.imagen;
                const img2 = segundaCarta.dataset.imagen;

                if (img1 === img2) {
                    primeraCarta = null;
                    segundaCarta = null;
                    bloqueo = false;
                } else {
                    setTimeout(() => {
                        primeraCarta.classList.remove('volteada');
                        segundaCarta.classList.remove('volteada');
                        primeraCarta = null;
                        segundaCarta = null;
                        bloqueo = false;
                    }, 1000);
                }
            }
        });

        campojuego.appendChild(celda);
    }
});
