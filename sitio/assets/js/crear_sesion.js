const autenticacion = document.getElementById("DA");

const verifCorreo = (correo) => {
  const arreglo = correo.match(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  if (arreglo) return true;

  return false;
};

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("boton");
  btn.addEventListener("click", (event) => {
    event.preventDefault();

    const data = {
      nombreCompleto:
        document.getElementById("usuarioNombre").value +
        " " +
        document.getElementById("usuarioApellido").value,
      correo: verifCorreo(document.getElementById("usuarioCorreo").value)
        ? document.getElementById("usuarioCorreo").value
        : "",
      contraseña: document.getElementById("contraseñaUsuario").value,
      dobleAut: 0,
    };

    if (data.correo === "") return alert("Correo no valido ❌");

    fetch("/rt-crear-sesion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.estatus === "OK") {
          Swal.fire({
            icon: "success",
            title: `${data.message}`,
          }).then(() => {
            location.href = "/codigo-verificacion";
            formulario.reset();
          });
        } else {
          Swal.fire({
            icon: "error",
            title: `${data.message}`,
          });
        }
      })
      .catch((err) => {});
  });
});
