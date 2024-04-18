const btnInicio = document.querySelector(".tacha");

btnInicio.addEventListener('click', regresarAnterior);

function regresarAnterior(){
  
  window.history.back()
  
}