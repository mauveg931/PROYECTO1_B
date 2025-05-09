document.addEventListener("DOMContentLoaded", () => {
    /**
     * Constantes y configuración inicial
     */
    const nivel = localStorage.getItem("nivel");
    const temporizador = localStorage.getItem("temporizador");
    const nombre = localStorage.getItem("nombre");
    const modo = localStorage.getItem("modo");
    const tema = localStorage.getItem("tema");
    const filas = parseInt(localStorage.getItem("filas")) || 0;
    const columnas = parseInt(localStorage.getItem("columnas")) || 0;
    const nombreScreen = document.getElementById("nombreScreen");
    const modoScreen = document.getElementById("modoScreen");
    const nivelScreen = document.getElementById("nivelScreen");
    const tematicaScreen = document.getElementById("tematicaScreen");
    const fondoImg = document.querySelector(".fondo1");
    const temp = document.getElementById("tiempo");
    const campojuego = document.getElementById("campojuego");
    const movimientos = document.getElementById("movimientos");
    const aciertos = document.getElementById("aciertos");
    const puntos = document.getElementById("puntos");

    let tiempoTranscurrido = 0;
    let intervalo = null;
    let primeraCarta = null;
    let segundaCarta = null;
    let bloqueo = false;
    let contMovimientos = 0;
    let contAciertos = 0;

    /**
     * Configuración personalizada
     */
    temp.textContent = temporizador === "desactivado" ? "TEMPORIZADOR DESACTIVADO" : "Tiempo: 00:00";

    if (fondoImg) {
        const fondos = {
            facil: "../img/fondorojo.png",
            medio: "../img/fondoverde.png",
            dificil: "../img/fondoazul.png",
            personalizado: "../img/fondorosa.png"
        };
        fondoImg.src = fondos[nivel] || "../img/fondorosa.png";
    }

    nombreScreen.textContent = `Nombre: ${nombre}`;
    modoScreen.textContent = `Modo: ${modo}`;
    nivelScreen.textContent = `Nivel: ${nivel}`;
    tematicaScreen.textContent = `Tema: ${tema}`;

    /**
     * Configuración del tablero
     */
    const grid = document.getElementById("campojuego");
    const dimensiones = {
        facil: { fila: 4, colum: 4 },
        medio: { fila: 5, colum: 4 },
        dificil: { fila: 6, colum: 6 },
        personalizado: { fila: filas, colum: columnas }
    };

    const { fila, colum } = dimensiones[nivel] || {};
    if (!fila || !colum || fila * colum % 2 !== 0) {
        alert("El número total de cartas debe ser par.");
        return;
    }

    grid.style.gridTemplateColumns = `repeat(${colum}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${fila}, 1fr)`;

    const totalCartas = fila * colum;

    /**
     * Generar y barajar cartas
     */
    const imagenes = Array.from({ length: totalCartas / 2 }, (_, i) => ({
        nombre: `carta${i + 1}.png`,
        id: `carta${i + 1}`
    })).flatMap(img => [img, { ...img, nombre: `${img.nombre} - copia.png` }]);

    imagenes.sort(() => Math.random() - 0.5);

    /**
     * Crear cartas en el tablero
     */
    const fragment = document.createDocumentFragment();
    imagenes.forEach(({ nombre, id }) => {
        const celda = document.createElement("div");
        celda.className = "celda carta";
        celda.dataset.id = id;

        const contenedor = document.createElement("div");
        contenedor.className = "contenedor-carta";

        const trasera = document.createElement("img");
        trasera.className = "cara trasera";
        trasera.src = {
            facil: "../img/cartaPorDetras.png",
            medio: "../img/cartaPorDetrasVerde.png",
            dificil: "../img/cartaPorDetrasAzul.png",
            personalizado: "../img/cartaPorDetrasRosa.png"
        }[nivel] || "../img/cartaPorDetras.png";

        const frente = document.createElement("img");
        frente.className = "cara frente";
        frente.src = `../img/tema${tema.replace(/\s+/g, "")}/${nombre}`;

        contenedor.append(trasera, frente);
        celda.appendChild(contenedor);
        fragment.appendChild(celda);

        /**
         * Eventos de las cartas
         */
        celda.addEventListener("click", () => {
            if (bloqueo || celda.classList.contains("volteada") || celda === primeraCarta) return;

            celda.classList.add("volteada");
            if (!primeraCarta) {
                primeraCarta = celda;
            } else {
                segundaCarta = celda;
                bloqueo = true;

                const id1 = primeraCarta.dataset.id;
                const id2 = segundaCarta.dataset.id;

                contMovimientos++;
                movimientos.textContent = contMovimientos;

                if (id1 === id2) {
                    contAciertos++;
                    aciertos.textContent = contAciertos;
                    resetCartas();

                    if (contAciertos === totalCartas / 2) fin();
                } else {
                    setTimeout(() => {
                        primeraCarta.classList.remove("volteada");
                        segundaCarta.classList.remove("volteada");
                        resetCartas();
                    }, 1000);
                }
            }
        });
    });
    campojuego.appendChild(fragment);

    /**
     * Funciones auxiliares
     */
    function resetCartas() {
        primeraCarta = null;
        segundaCarta = null;
        bloqueo = false;
    }

    function calcularPuntos(aciertos, movimientos, tiempo) {
        return Math.max(0, Math.round(aciertos * 50 - movimientos * 2 - tiempo * 0.5));
    }

    function iniciarCronometro() {
        if (!intervalo) {
            intervalo = setInterval(() => {
                tiempoTranscurrido++;
                const minutos = Math.floor(tiempoTranscurrido / 60).toString().padStart(2, "0");
                const segundos = (tiempoTranscurrido % 60).toString().padStart(2, "0");
                temp.textContent = `Tiempo: ${minutos}:${segundos}`;
            }, 1000);
        }
    }

    function detenerCronometro() {
        clearInterval(intervalo);
    }

    function fin() {
        detenerCronometro();
        const puntosFinal = calcularPuntos(contAciertos, contMovimientos, tiempoTranscurrido);
        const user = nombre || "Usuario";
        const crono = temporizador !== "desactivado";

        document.getElementById("pantallaFinal").style.display = "block";
        campojuego.style.display = "none";

        puntos.textContent = puntosFinal;
        document.getElementById("resultadoNombre").textContent = `Jugador: ${user}`;
        document.getElementById("resultadoPuntos").textContent = `Puntos: ${puntosFinal}`;
        document.getElementById("resultadoTiempo").textContent = crono ? temp.textContent : "Tiempo: Sin temporizador";

        document.getElementById("compartirFacebook").addEventListener("click", () => {
            const texto = encodeURIComponent(`¡He conseguido ${puntosFinal} puntos en Memorium!`);
            const url = encodeURIComponent(window.location.href);
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${texto}`, "_blank");
        });

        const partida = {
            nombre: user,
            dificultad: nivel,
            tema,
            modo,
            duracion: crono ? temp.textContent : "Desactivado",
            movimientos: contMovimientos,
            aciertos: contAciertos,
            fecha: new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" })
        };

        const historial = JSON.parse(localStorage.getItem("historial")) || [];
        historial.push(partida);
        localStorage.setItem("historial", JSON.stringify(historial));
    }

    /**
     * Iniciar cronómetro al primer clic
     */
    if (temporizador !== "desactivado") {
        campojuego.addEventListener("click", iniciarCronometro, { once: true });
    }

    /**
     * Observar cambios en los aciertos
     */
    const observer = new MutationObserver(() => {
        if (contAciertos === totalCartas / 2) detenerCronometro();
    });
    observer.observe(aciertos, { childList: true });
});
