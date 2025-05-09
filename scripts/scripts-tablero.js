document.addEventListener("DOMContentLoaded", () => {
   /**
    * constantes
    */
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
    let tiempoTranscurrido = 0;
    let intervalo;
    /**
     * configuración personalizada
     */

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
    /**
     * validación numero de cartas
     */
    if (totalCartas % 2 !== 0) {
        alert("El número total de cartas debe ser par.");
        return;
    }

    /**
     * array para las imagenes
     */
    const imagenes = [];
    for (let i = 1; i <= totalCartas / 2; i++) {
        imagenes.push({nombre: `carta${i}.png`, id: `carta${i}`});
        imagenes.push({nombre: `carta${i} - copia.png`, id: `carta${i}`});
    }

    /**
     * barajar cartas
     */
    imagenes.sort(() => Math.random() - 0.5);

    let primeraCarta = null;
    let segundaCarta = null;
    let bloqueo = false;
    
    let contMovimientos = 0;
    let contAciertos = 0;

    const movimientos = document.getElementById('movimientos');
    const aciertos = document.getElementById('aciertos');  
    const puntos= document.getElementById('puntos');
    
    /**
     * crear cartas
     */

    for (let i = 0; i < totalCartas; i++) {
        const celda = document.createElement('div');
        celda.className = 'celda carta';

        const contenedor = document.createElement('div');
        contenedor.className = 'contenedor-carta';

        const trasera = document.createElement('img');
        trasera.className = 'cara trasera';
    /**
     * config personalizada
     */
        if (nivel === "facil") trasera.src = "../img/cartaPorDetras.png";
        else if (nivel === "medio") trasera.src = "../img/cartaPorDetrasVerde.png";
        else if (nivel === "dificil") trasera.src = "../img/cartaPorDetrasAzul.png";
        else trasera.src = "../img/cartaPorDetrasRosa.png";

        const frente = document.createElement('img');
        frente.className = 'cara frente';
        if(tema === "Super Mario Bros"){
            frente.src = `../img/temaMarioBros/${imagenes[i].nombre}`;
        }
        else if(tema === "Castlevania"){
            frente.src = `../img/temaCastlevania/${imagenes[i].nombre}`;
        }
        else if(tema === "Metal Gear"){
            frente.src = `../img/temaMetalGear/${imagenes[i].nombre}`;
        }
        

        contenedor.appendChild(trasera);
        contenedor.appendChild(frente);
        celda.appendChild(contenedor);

        celda.dataset.id = imagenes[i].id;

        
/**
 * objeto audio
 */
let musicaFondo = new Audio();

/**
 * pista segun tema
 */
if (tema === "Super Mario Bros") {
    musicaFondo.src = "../audio/Super Mario 64 Soundtrack - Dire, Dire Docks.mp3";
} else if (tema === "Castlevania") {
    musicaFondo.src = "../audio/Marble Gallery - Castlevania Symphony of the Night OST.mp3";
} else if (tema === "Metal Gear") {
    musicaFondo.src = "../audio/01 - Metal Gear Solid Main Theme.mp3";
}

/**config audio */
musicaFondo.loop = true;
musicaFondo.volume = 0.01;

/**
 * inicio de audio despues del click
 */
campojuego.addEventListener("click", () => {
    if (musicaFondo.paused) {
        musicaFondo.play().catch(e => console.warn("Autoplay bloqueado:", e));
    }
}, { once: true }); // solo una vez
 
         /**
          * MODO FLASH
          */
         if (modo === "flash") {
           /**
            * mostrar cartas volteadas
            */
            celda.classList.add('volteada');   
        
            setTimeout(() => {
                celda.classList.remove('volteada');
            }, 5000);
        
            celda.addEventListener('click', () => {
                /**
                 * bloqueo de click en misma carta
                 */
                if (bloqueo || celda === primeraCarta || celda.classList.contains('volteada')) return;
        
                celda.classList.remove('volteada');
        
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
                       /**
                        * dejar voltadas si aciertas
                        */
                        primeraCarta.classList.add('volteada');
                        segundaCarta.classList.add('volteada');
                        
                        primeraCarta = null;
                        segundaCarta = null;
                        bloqueo = false;
        
                        contAciertos++;
                        aciertos.textContent = contAciertos;
                        /**
                         * fin partida
                         */
                        if (contAciertos === totalCartas / 2) {
                            fin();
                            const partida = {
                                nombre: nombreJugador,
                                dificultad: nivel,
                                tema: temaSeleccionado,
                                modo: modoJuego,
                                duracion: tiempoEnSegundos,
                                movimientos: totalIntentos,
                                aciertos: totalAciertos,
                                fecha: new Date().toLocaleString(),
                            };
                            const historial = JSON.parse(localStorage.getItem("historial")) || [];
                            historial.push(partida);
                            localStorage.setItem("historial", JSON.stringify(historial));
                        }
                    } else {
                        /**
                         * mostrar error si no aciertas
                         */
                        mostrarCruzVisual(primeraCarta);
                        mostrarCruzVisual(segundaCarta);
        
                        setTimeout(() => {
                            primeraCarta.classList.remove('volteada');
                            segundaCarta.classList.remove('volteada');
                            resetCartas();
                        }, 1000);
                    }
                }
            });
        }
        
        /**
         * reset de cartas despues de un intento
         */
        function resetCartas() {
            primeraCarta = null;
            segundaCarta = null;
            bloqueo = false;
        }
        
        /**
         *  Función para mostrar la cruz visual en las cartas incorrectas en el modo flash
         */ 
        function mostrarCruzVisual(carta) {
            const cruz = document.createElement('div');
            cruz.className = 'cruz-error';  
            cruz.textContent = 'X';  
            carta.appendChild(cruz);  

            setTimeout(() => {
                carta.removeChild(cruz);  
            }, 800);  
        }

        /**
         * MODO NORMAL
         */
             if (modo === "normal") {
             celda.addEventListener('click', () => {
                 if (bloqueo || celda.classList.contains('volteada')) return;
 
                 celda.classList.add('volteada');
 
                 if (!primeraCarta) {
                     primeraCarta = celda;
                 } else {
                     segundaCarta = celda;
                     bloqueo = true;
 
                     const id1 = primeraCarta.dataset.id;
                     const id2 = segundaCarta.dataset.id;
 
                     contMovimientos++;
                     movimientos.textContent = contMovimientos;
 
                     /**
                      * comparar cartas
                      */
                     if (id1 === id2) {
                         primeraCarta = null;
                         segundaCarta = null;
                         bloqueo = false;
 
                         
                         contAciertos++;
                         aciertos.textContent = contAciertos;
                        /**
                         * final de partida
                         */
                         if (contAciertos === totalCartas / 2) {
                             fin();
                             const partida = {
                                 nombre: nombreJugador,
                                 dificultad: nivel,
                                 tema: temaSeleccionado,
                                 modo: modoJuego,
                                 duracion: tiempoEnSegundos,
                                 movimientos: totalIntentos,
                                 aciertos: totalAciertos,
                                 fecha: new Date().toLocaleString(),
                             };
                             const historial = JSON.parse(localStorage.getItem("historial")) || [];
                             historial.push(partida);
                             localStorage.setItem("historial", JSON.stringify(historial));
                         }
 
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
         }
         campojuego.appendChild(celda);
     }
 /**
  * iniciar crono
  */
     function iniciarCronometro() {
         if (!intervalo) {
             intervalo = setInterval(() => {
                 tiempoTranscurrido++;
                 const minutos = Math.floor(tiempoTranscurrido / 60).toString().padStart(2, '0');
                 const segundos = (tiempoTranscurrido % 60).toString().padStart(2, '0');
                 temp.textContent = `Tiempo: ${minutos}:${segundos}`;
             }, 1000);
         }
     }
 
     /**
      * iniciar cronometro al hacer click en la primera carta (no tocar cago en die)
      */
     if (temporizador !== "desactivado") {
         campojuego.addEventListener('click', () => {
             if (!intervalo) iniciarCronometro();
         });
     }
 
     /**
      * detener el crono al terminar
      */
     const totalParejas = totalCartas / 2;
     const observer = new MutationObserver(() => {
         if (contAciertos === totalParejas) {
             clearInterval(intervalo);
         const minutos = Math.floor(tiempoTranscurrido / 60).toString().padStart(2, '0');
         const segundos = (tiempoTranscurrido % 60).toString().padStart(2, '0');
         /**
          * datos para ranking e historial
          */
         const partida = {
             nombre: localStorage.getItem("nombre"),
             dificultad: localStorage.getItem("nivel"),
             tema: localStorage.getItem("tema"),
             modo: localStorage.getItem("modo"),
             duracion: temporizador !== "desactivado" ? `${minutos}:${segundos}` : "Desactivado",
             movimientos: contMovimientos,
             aciertos: contAciertos,
             fecha: new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" })
         };
         
             /**
              * refrescar historial
              */
             const historial = JSON.parse(localStorage.getItem("historial")) || [];
             historial.push(partida);
             localStorage.setItem("historial", JSON.stringify(historial));
         }
         
     });
  /**
    * calcular puntuaciones
    */

  function calcularPuntos(aciertos, movimientos, tiempoTranscurrido) {
    const puntos = (aciertos * 50) - (movimientos * 2) - (tiempoTranscurrido*0.5);
    return Math.max(0, Math.round(puntos));

    }
    
    /**
     * funcion pantalla de fin de partida
     */
    function fin() {
        setTimeout(() => {
            const puntosFinal = calcularPuntos(contAciertos, contMovimientos, tiempoTranscurrido);
            const user = localStorage.getItem("nombre") || "Usuario";
            const crono = localStorage.getItem("temporizador") !== "desactivado";
            const puntos = document.getElementById('puntos');
            document.getElementById("pantallaFinal").style.display = "block";
            document.getElementById("campojuego").style.display = "none";
        
            puntos.textContent = puntosFinal;
        
            document.getElementById("resultadoNombre").textContent = `Jugador: ${user}`;
            document.getElementById("resultadoPuntos").textContent = `Puntos:  ${puntosFinal}`;
        
            if (crono) {
                document.getElementById("resultadoTiempo").textContent = `${temp.textContent}`;
            } else {
                document.getElementById("resultadoTiempo").textContent = `Tiempo: Sin temporizador`;

            }
            /**
             * compartir en facebook
             */
            function compartir() {
            const texto = encodeURIComponent(`¡He conseguido ${puntosFinal} puntos en Memorium!🕯️`);
            const url = encodeURIComponent("https://mauveg931.github.io/PROYECTO1_B/");
            const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${texto}`;

            window.open(facebookURL, "_blank");
            }


            
            /**
             * retraso para que se vea la ultima carta
             */
            
        }, 750); 
    }
    observer.observe(aciertos, { childList: true });
 
});
