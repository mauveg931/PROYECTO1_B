document.addEventListener("DOMContentLoaded", () => {

    //variables tomadas de index
    const nivel = localStorage.getItem("nivel");
    const temporizador = localStorage.getItem("temporizador");
    const nombre = localStorage.getItem("nombre");
    const modo = localStorage.getItem("modo");
    const tema = localStorage.getItem("tema");
    const filas = localStorage.getItem("filas");
    const columnas = localStorage.getItem("columnas");
    //variables propias
    const nombreScreen = document.getElementById("nombreScreen");
    const modoScreen = document.getElementById("modoScreen");
    const nivelScreen = document.getElementById("nivelScreen");
    const tematicaScreen = document.getElementById("tematicaScreen"); 
    const fondoImg = document.getElementsByClassName("fondo1")[0];  
    const temp = document.getElementById("tiempo");


    //cambiar el temporizador
    if(temporizador === "desactivado"){
        temp.textContent="TEMPORIZADOR DESACTIVADO";
    }
    //Cambiar la imagen de fondo
    if (fondoImg) {
        if (nivel == "facil") {
            fondoImg.setAttribute("src", "../img/fondorojo.png");
        } else if (nivel == "medio") {
            fondoImg.setAttribute("src", "../img/fondoverde.png");
        } else if (nivel == "dificil") {
            fondoImg.setAttribute("src", "../img/fondoazul.png");
        } else if (nivel == "personalizado"){
            fondoImg.setAttribute("src", "../img/fondorosa.png");
        }
    }


    //Datos introducidos en index
    nombreScreen.textContent = "Nombre: " + nombre;
    modoScreen.textContent = "Modo: " + modo;
    nivelScreen.textContent = "Nivel: " + nivel;
    tematicaScreen.textContent = "Tema: " + tema;
    

    
    const grid = document.getElementById('campojuego');
        
   

    let fila, colum;

    if (nivel === "facil") {
        fila = 4; 
        colum = 4;
        grid.style.gridTemplateColumns = `repeat(${colum}, 1fr)`; 


    } else if (nivel === "medio") {
        fila = 5; 
        colum = 4;
        grid.style.gridTemplateColumns = `repeat(${colum}, 1fr)`; 


    } else if (nivel === "dificil") {
        fila = 6; 
        colum = 6;
        grid.style.gridTemplateColumns = `repeat(${colum}, 1fr)`; 


    } else if (nivel === "personalizado") {
      // variables para personalizacion
<<<<<<< Updated upstream
        fila = filas;
        colum = columnas;
=======
        fila = 3;
        colum = 7;
        grid.style.gridTemplateColumns = `repeat(${colum}, 1fr)`; 


>>>>>>> Stashed changes
    } else {
        console.warn("Nivel no reconocido:", nivel);
        return;
    }

    for (let i = 0; i < fila * colum; i++) {
        const celda = document.createElement('div');
        celda.className = 'celda';
        celda.textContent = 'carta'; 
        celda.addEventListener('click', () => {
            //volteo de carta
        });
        grid.appendChild(celda);
    }

    });
