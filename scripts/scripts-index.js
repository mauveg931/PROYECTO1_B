document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("insertar");
    
    btn.addEventListener("click", () => {
      const nivel = document.getElementById("nivel").value;
  
      localStorage.setItem("nivel", nivel);
  
      window.location.href = "html/tablero.html";
    });
  });
  