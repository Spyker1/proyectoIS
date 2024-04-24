const btnInicio = document.querySelector(".btnCasa");

btnInicio.addEventListener('click', regresarInicio);

function regresarInicio(){
  
  window.history.back()
  
}