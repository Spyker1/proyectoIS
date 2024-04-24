 const btn_carrito=document.querySelectorAll('#agregar_carrito');
 btn_carrito.forEach(button=>{
  button.addEventListener('click',async(event)=>{
    const productId=event.target.getAttribute('data-product-id');
    
    await fetch (`/rt-carrito-agregar/${productId}`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
    })
    .then((response)=> response.json())
    .then((data)=>{
      if(data.estatus==='CUENTA'){
        Swal.fire({
          icon: 'error',
          title: 'Necesitas iniciar sesión',
          footer: '<a href="/iniciar-sesion">Iniciar sesion</a>'
        })
      }else if(data.estatus==='AGR_C'){
        Swal.fire({
          title: `${data.nombre_producto}`,
          text: 'Producto agregado al carrito',
          imageUrl: `http://localhost:3000/producto/${data.ID_PRO}/${data.PT_IMG}`,
          imageWidth: 400,
          imageHeight: 200,
        }).then(()=>{
          location.reload()
        }
        )
      }else if(data.estatus==='INS'){
        Swal.fire({
          icon:'warning',
          title:'Productos insuficientes'
        })
      }
      else{
        Swal.fire('No hay productos en existencias')
      }
    }).catch((error)=>{
    })
  });
})
    
