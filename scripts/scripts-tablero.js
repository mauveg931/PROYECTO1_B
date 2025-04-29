document.addEventListener("DOMContentLoaded", () => {
    const nivel = localStorage.getItem("nivel");
    const fondoImg = document.getElementsByClassName("fondo1")[0];

    if (!fondoImg) return;

    if (nivel == "facil") {
        fondoImg.setAttribute("src", "../img/fondorojo.png");
    } else if (nivel == "medio") {
        fondoImg.setAttribute("src", "../img/fondoverde.png");
    } else if (nivel == "dificil") {
        fondoImg.setAttribute("src", "../img/fondoazul.png");
    }
});
