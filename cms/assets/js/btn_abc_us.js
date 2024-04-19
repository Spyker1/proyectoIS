const btnBorrar = document.querySelectorAll('#btnEliminarUs');

    
btnBorrar.forEach(button => {

    button.addEventListener('click', async(event) =>{
    const usuarioId = event.target.getAttribute('data-id-us')
    
    await fetch (`/rt-eliminar-us/:${usuarioId}`, {
        method: 'DELETE',
        })
        .then((response)=> response.json())
        .then((data) => {
            Swal.fire({
                icon: 'success',
                title: `${data.message}`
              })
        })
        .catch((error)=>{
            console.log('Error X.X',error)
        })
    })

})

const btn_actualizar_datos_us=document.getElementById('btn_actualizar_datos_us');

btn_actualizar_datos_us.addEventListener('click',async(event)=>{
    const id_us=event.target.getAttribute('data-id-us');

    const data={
        id_us:id_us,
        contraseña:document.getElementById('contraseña_acutal').value,
        correo_nuevo:document.getElementById('nuevo_correo').value
    }
    await fetch('/rt-actualizar-datos-us',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.estatus === 'OK'){
                location.href= '/Usuarios'
                Swal.fire({
                    icon: 'success',
                    title: `${data.message}`
                  })
            }else{
                Swal.fire({
                    icon: 'warning',
                    title: `${data.message}`
                  })
            }
            
        })
        .catch((err) => {
            throw err
        })

})
