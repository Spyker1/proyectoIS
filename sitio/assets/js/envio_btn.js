const btn_pedido = document.getElementById("btn_formulario_envio");

btn_pedido.addEventListener("click", toogleFormulario);
const form_envio = document.getElementById("envio_pedido");

function toogleFormulario() {
  form_envio.classList.toggle("inactive");
}

document.addEventListener("DOMContentLoaded", () => {
  const enviar_formulario = document.querySelector("#boton_envio");
  enviar_formulario.addEventListener("click", async(e) => {
    e.preventDefault()
    const direccion = document.getElementById("direccion").value;
    const estado = document.getElementById("estado").value;
    const ciudad = document.getElementById("ciudad").value;
    const codigo_postal = document.getElementById("codigo_postal").value;
    const telefono = document.getElementById("telefono").value;

    const data = { direccion, estado, ciudad, codigo_postal, telefono };

   await fetch(`/rt-hacer-envio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json(), console.log('estoy'))
    .then((data) => {
       
        if (data.estatus==='OK'){
          Swal.fire({
            title: 'Pedido hecho correctamente',
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff url(/images/trees.png)',
            backdrop: `
              rgba(0,0,123,0.4)
              url("https://i.gifer.com/JOP.gif")
              left top
              no-repeat
            `
          }).then(()=>{
            location.reload()
          })
          
        
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `${data.message}`,
          })
        }
      })
      .catch((error) => {
        console.log("Error X.X", error);
      });
  });
});
