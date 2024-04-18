document.addEventListener("DOMContentLoaded", () => {
    const buscador = document.getElementById("buscar");
    buscador.addEventListener("keyup",(event) => {
    event.preventDefault();
    const busqueda = buscador.value;
      const data = { busqueda };
      fetch('/rt-buscador', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(async(response) => {
          const sugerencias=document.getElementById('sugerencias')
          if(busqueda.trim()===""){
            sugerencias.innerHTML=''
            return
          }
          sugerencias.innerHTML=''
          const response_json= await response.text();
          
          sugerencias.innerHTML=response_json;
        })
        // .then((data) => {
        //     alert(data.message)
        //   alert("Se mando la peticion");
          
        // })
        .catch((error) => {
          alert("Ocurrió un error al enviar el formulario.");
        });
    });
  }); 

  const btnBusqueda=document.getElementById('search-button')
  btnBusqueda.addEventListener("click",()=>{
    const buscador = document.getElementById("buscar");
    const busqueda=buscador.value
    window.location.href=`/buscador/${busqueda}`
  })

