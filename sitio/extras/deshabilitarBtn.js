/*
 Los datos deben contener:
 El nombre del id.
 Tiempo de deshabilitación en milisegundos
 El mensaje de espera.
 El mensaje del boton
*/

const deshabilitar = (datos) => {
    console.log('Deshabilitando boton con id: ', datos.id)
    const button = document.getElementById(datos.id);
    button.disabled = true;
    button.innerText = datos.mensaje1;
    setTimeout(() => {
      button.disabled = false;
      button.innerText = datos.mensaje2;
    }, datos.tiempo);
}
