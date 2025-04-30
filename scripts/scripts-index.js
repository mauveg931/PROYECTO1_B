document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("insertar");

  btn.addEventListener("click", () => {
    const nivel = document.getElementById("nivel").value;
    const nombre = document.getElementById("usuario").value;
    const modo = document.getElementById("modo").value;
    const tema = document.getElementById("tema").value;
    const temporizador = document.getElementById("temporizador").value;

    if (nivel === "" || nombre === "" || modo === "" || tema === "") {
      alert("Rellena todos los campos");
      return;
    }

    localStorage.setItem("nivel", nivel);
    localStorage.setItem("temporizador", temporizador);
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("modo", modo);
    localStorage.setItem("tema", tema);

    if (nivel === "personalizado") {
      let filas, columnas;

      do {
        filas = prompt("Introduce el número de filas (solo números):");
        if (filas === null) return; 
      } while (!/^\d+$/.test(filas) || parseInt(filas) <= 0);


      do {
        columnas = prompt("Introduce el número de columnas (solo números):");
        if (columnas === null) return; 
      } while (!/^\d+$/.test(columnas) || parseInt(columnas) <= 0);

      localStorage.setItem("filas", filas);
      localStorage.setItem("columnas", columnas);
    }

    window.location.href = "html/tablero.html";
  });
});
