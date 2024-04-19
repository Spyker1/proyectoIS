
// Función para cambiar la vista y actualizar la URL
function cambiarVista(vista,id) {
    // Obtener todas las vistas
    var vistas = document.querySelector('.section-content');
    // Ocultar todas las vistas
    for (var i = 0; i < vistas.length; i++) {
      vistas[i].style.display = 'none';
    }
    vista.style.display='block';

    // Mostrar la vista seleccionada
    // var vistaSeleccionada = document.getElementById(vista);
    // vistaSeleccionada.style.display='block';
    
    // Cambiar la URL en el navegador sin recargar la página
    var url = `/${id.value}`;
    window.history.pushState({vista: 'Hola'}, `Titulo de la pagina`, url);
  }
  
  // Evento para manejar los cambios en el historial del navegador
  window.onpopstate = function(event) {
    // Verificar el estado y cambiar la vista en consecuencia
    if (event.state) {
      cambiarVista(event.state.vista);
    } else {
      // Si no hay estado, mostrar la vista de inicio por defecto
      cambiarVista('section1');
    }
  };
