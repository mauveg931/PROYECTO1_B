document.addEventListener("DOMContentLoaded", () => {
    const nivel = localStorage.getItem("nivel");
    const fondoImg = document.getElementsByClassName("fondo1")[0];
    const temporizador = localStorage.getItem("temporizador");
    const temp = document.getElementById("tiempo");

    if(temporizador === "desactivado"){
        temp.textContent="TEMPORIZADOR DESACTIVADO";
    }

    if (fondoImg) {
        if (nivel == "facil") {
            fondoImg.setAttribute("src", "../img/fondorojo.png");
        } else if (nivel == "medio") {
            fondoImg.setAttribute("src", "../img/fondoverde.png");
        } else if (nivel == "dificil") {
            fondoImg.setAttribute("src", "../img/fondoazul.png");
        } else if (nivel== "personalizado"){
            fondoImg.setAttribute("src", "../img/fondoazul.png");
        }
    }


    
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