const btnInicio = document.querySelector(".btnCa");

btnInicio.addEventListener('click', regresarInicio);

function regresarInicio(){
  
  window.history.back()
  
}