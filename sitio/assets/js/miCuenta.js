$(document).ready(function() {
  // Manejar el clic en los botones
  $(".boton").click(function() {
    $(".boton").removeClass("btnAct");
    // Obtener el ID del elemento objetivo
    var targetId = $(this).data("target");

    // Obtener el elemento correspondiente al botón clicado
    var elemento = $("#" + targetId);

    // Ocultar todos los elementos con clase "contenido" excepto el elemento clicado
    $(".contenido").not(elemento).hide();

    // Mostrar u ocultar el elemento clicado
    $(this).addClass("btnAct");
    elemento.toggle();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const borrarCuentaCon = document.getElementById("botonCon");
 borrarCuentaCon.addEventListener('click',confirmarBorrado);
});

  
  function mostrarActualizacionDatos() {

    const a = document.getElementById('ActualizacionDatos');

    a.classList.toggle('inactive')
  }
  
  function mostrarDobleAutenticacion() {
    const q = document.getElementById('DobleAtenticacion');

    q.classList.toggle('inactive')

  }
  
  function manejarDobleAutenticacion() {
    const activarCheckbox = document.getElementById('activarDobleAutenticacion')
    const desactivarCheckbox = document.getElementById('desactivarDobleAutenticacion')
  
     if (activarCheckbox.checked) {
      fetch("/rt-activar-doble-autenticacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response)=> response.json())
        .then((data) => {
          Swal.fire({
            icon: 'success',
            title: `${data.message}`,
          })
          
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un error al enviar el formulario',
          })
        });

    } else if (desactivarCheckbox.checked) {
      fetch("/rt-desactivar-doble-autenticacion", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              }).then((response)=> response.json())
                .then((data) => {
                  Swal.fire({
                    icon: 'success',
                    title: `${data.message}`,
                  })
                  
                  
                })
                .catch((error) => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Ocurrio un error al enviar el formulario',
                  })
                });
    }
  }
  
  function mostrarBorrarCuenta() {
    const w = document.getElementById('BorrarCuenta');

    const borrarCuentaDiv = w.classList.contains('inactive')

    // if (!borrarCuentaDiv) {
    //   dobleA.add('inactive');
    //   datos.add('inactive');
    //   actualizacion.add('inactive');
    // }

    w.classList.toggle('inactive')
   
  }
  
function confirmarBorrado() {
  
      fetch("/rt-eliminar-cuenta", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              }).then((response)=> response.json())
                .then((data) => {
                  Swal.fire({
                    icon: 'success',
                    title: `${data.message}`,
                  }).then(()=>{

                    location.href = '/';
                  })
                  
                })
                .catch((error) => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Ocurrio un error al enviar el formulario',
                  })
                });
    
  }
  
  function cancelarBorrado() {
    const w = document.getElementById('BorrarCuenta');
  }

document.addEventListener("DOMContentLoaded", () => {
  const actualizar = document.getElementById("botonC");
  actualizar.addEventListener("click", (event) => {
    
    const contraseñaActual=document.querySelector('#contraseñaActual').value;
    const nuevoNombre = document.querySelector("#nuevoNombre").value;
    const nuevoCorreo = document.querySelector("#nuevoCorreo").value;
    const nuevacontraseña = document.querySelector("#nuevaContrasena").value;

    const data = { nuevoNombre, nuevoCorreo, nuevacontraseña,contraseñaActual };

    fetch("/rt-actualizar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((response)=>response.json())
      .then((data) => {
        Swal.fire({
          icon: 'success',
          title: `${data.message}`,
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
