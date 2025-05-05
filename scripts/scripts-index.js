document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("insertar");

  // Reemplaza selects por estilos personalizados
  const selects = document.querySelectorAll(".custom-select");
  selects.forEach((select) => {
    const wrapper = document.createElement("div");
    wrapper.className = "select-wrapper";

    const selected = document.createElement("div");
    selected.className = "selected-option";
    selected.textContent = select.options[select.selectedIndex]?.textContent || "Seleccione una opción";

    const optionList = document.createElement("div");
    optionList.className = "option-list hide-options";

    Array.from(select.options).forEach((option) => {
      const item = document.createElement("div");
      item.className = "option-item";
      item.textContent = option.textContent;
      item.dataset.value = option.value;

      item.addEventListener("click", () => {
        if (option.disabled) return; // Evita seleccionar opciones deshabilitadas
        selected.textContent = item.textContent;
        select.value = item.dataset.value;
        optionList.classList.add("hide-options");
      });

      optionList.appendChild(item);
    });

    selected.addEventListener("click", () => {
      optionList.classList.toggle("hide-options");
    });

    select.style.display = "none";
    select.parentNode.insertBefore(wrapper, select);
    wrapper.appendChild(select);
    wrapper.appendChild(selected);
    wrapper.appendChild(optionList);
  });

  // Cierra todos al hacer clic fuera
  document.addEventListener("click", function (e) {
    document.querySelectorAll(".option-list").forEach((list) => {
      if (!list.parentNode.contains(e.target)) {
        list.classList.add("hide-options");
      }
    });
  });

  // Lógica del botón
  btn.addEventListener("click", () => {
    const nivel = document.getElementById("nivel").value;
    const nombre = document.getElementById("usuario").value;
    const modo = document.getElementById("modo").value;
    const tema = document.getElementById("tema").value;
    const temporizador = document.getElementById("temporizador").value;

    // Validación para evitar seleccionar opciones deshabilitadas
    if (!nivel || !nombre || !modo || !tema || nivel === "" || modo === "" || tema === "") {
      alert("Rellena todos los campos correctamente.");
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

      filas = parseInt(filas);
      columnas = parseInt(columnas);

      const total = filas * columnas;

      if (total % 2 !== 0 || total > 28) {
        alert("El número total de cartas debe ser par y menor o igual a 28.");
        return;
      }

      localStorage.setItem("filas", filas);
      localStorage.setItem("columnas", columnas);
    }

    window.location.href = "html/tablero.html";
  });
});