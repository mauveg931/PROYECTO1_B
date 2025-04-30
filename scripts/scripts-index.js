document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("insertar");
    
    
    btn.addEventListener("click", () => {
      const nivel = document.getElementById("nivel").value;
      const nombre = document.getElementById("usuario").value;
      const modo = document.getElementById("modo").value;
      const tema = document.getElementById("tema").value;
      const temporizador = document.getElementById("temporizador").value;

        if(nivel === ""|| nombre === null || modo === "" || tema === "" || temporizador === ""){
          alert("Rellena todos los campos");
        }else{
          localStorage.setItem("nivel", nivel);
          localStorage.setItem("tiempo", temporizador);
          window.location.href = "html/tablero.html";
        }
    });
  });
  