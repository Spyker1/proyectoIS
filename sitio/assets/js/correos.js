const btnInicio = document.querySelector(".btnCasa");

btnInicio.addEventListener('click', regresarInicio);

document.addEventListener("DOMContentLoaded", () => {
  const formu = document.querySelector("form");
  formu.addEventListener("submit", (event) => {
    event.preventDefault();
    const correoLlegada = document.getElementById("correoDestino").value;
    const data = { correoLlegada };

    fetch("/olvidarContraseña", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        Swal.fire({
          icon: 'success',
          title: `${data.message}`,
        }).then(()=>{
          formu.reset();

        })
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un error al enviar el formulario',
        })
      });
  });
});  
  
  
  function regresarInicio(){
    
    location.href = '/';
    
  }
