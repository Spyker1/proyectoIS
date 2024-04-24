const btn_eliminar_pro=document.querySelectorAll('#eliminar-pro')

btn_eliminar_pro.forEach(btn_eliminar=>{
    btn_eliminar.addEventListener('click',async(event)=>{
        const id_pro=event.target.getAttribute('data-id-pro');

        await fetch (`/rt-eliminar-pro/${id_pro}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response)=> response.json())
            .then((data)=>{
                Swal.fire({
                    icon: 'success',
                    title: `${data.message}`
                  })
                    location.href='/Productos'
            }).catch((error)=>{
                    console.log('Error X.X',error)
        })
    })
})

const btn_agregar_cantidad = document.querySelectorAll('#agregar-cant-pro');

btn_agregar_cantidad.forEach(button => {
    button.addEventListener('click', async(event) =>{
    const id = event.target.getAttribute('data-id-pro');

    const cantidad=document.getElementById(`input-agregar-cantidad-${id}`).value;
    
    await fetch (`/rt-cantidadN/${id}/${cantidad}`, {
        method: 'PUT',
        })
        .then((response)=> response.json())
        .then((data) => {
            Swal.fire({
                icon: 'success',
                title: `${data.message}`
              }).then(()=>{
                location.reload()
              }
              )
        })
        .catch((error)=>{
            console.log('Error X.X',error)
        })
    })

})


    


