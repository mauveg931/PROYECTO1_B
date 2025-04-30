document.addEventListener("DOMContentLoaded", () => {
    const nivel = localStorage.getItem("nivel");
    const fondoImg = document.getElementsByClassName("fondo1")[0];

    if (fondoImg) {
        if (nivel == "facil") {
            fondoImg.setAttribute("src", "../img/fondorojo.png");
        } else if (nivel == "medio") {
            fondoImg.setAttribute("src", "../img/fondoverde.png");
        } else if (nivel == "dificil") {
            fondoImg.setAttribute("src", "../img/fondoazul.png");
        }
    }

    
    const grid = document.getElementById('campojuego');
    let fila = 4;
    let colum = 4;

    for (let i = 0; i < fila * colum; i++) {
        const celda = document.createElement('div');
        celda.className = 'celda';
        celda.textContent = i + 1; //fotos cartas
        celda.addEventListener('click', () => {
            alert(`Volteo`); //dar la vuelta cartas
        });
        grid.appendChild(celda);
    }
});