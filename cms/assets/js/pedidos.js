const btn_reenviar_correo_pedido=document.querySelectorAll('#btn_reenviar_correo_pedidos');

btn_reenviar_correo_pedido.forEach(btn_envio=>{
    btn_envio.addEventListener('click',async(event)=>{
        const pedido_id=event.target.getAttribute('data-id-pedidos');

        await fetch(`/rt-reenviar-correo-pedidos/${pedido_id}`,{
            method:'POST',
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