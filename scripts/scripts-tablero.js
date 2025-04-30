document.addEventListener("DOMContentLoaded", () => {

    //variables tomadas de index
    const nivel = localStorage.getItem("nivel");
    const temporizador = localStorage.getItem("temporizador");
    const nombre = localStorage.getItem("nombre");
    const modo = localStorage.getItem("modo");
    const tema = localStorage.getItem("tema");
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
    let fila = 4; //cambiar las variables para cambiar las cartas del tablero
    let colum = 4;

    for (let i = 0; i < fila * colum; i++) {
        const celda = document.createElement('div');
        celda.className = 'celda';
        celda.textContent = 'carta'; //fotos cartas
        celda.addEventListener('click', () => {
            //dar vuelta a la carta
        });
        grid.appendChild(celda);
    }
});