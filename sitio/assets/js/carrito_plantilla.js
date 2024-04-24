const boton_plantilla_carrito=document.querySelector('.boton-F');

boton_plantilla_carrito.addEventListener('click',async(event)=>{
    const productId=event.target.getAttribute('data-product-plantilla-id');
                const cantidad=document.querySelector('.block_quantity__number').value;

                await fetch(`/rt-carrito-plantilla-agregar/${productId}/${cantidad}`,{
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
                          }else if(data.estatus==='OK'){
                            Swal.fire({
                              title: `${data.nombre_producto}`,
                              text: 'Producto agregado al carrito',
                              imageUrl: `http://localhost:3000/producto/${data.ID_PRO}/${data.PT_IMG}`,
                              imageWidth: 400,
                              imageHeight: 200,
                            }).then(()=>{
                              location.reload()
                            })
                            
                          } else if(data.estatus==='INS'){
                            Swal.fire({
                              icon:'warning',
                              title:'Productos insuficientes'
                            })
                          }
                            else{
                            Swal.fire({
                              icon: 'error',
                              title: 'Hubo un error al agregar al carrito',
                              text: `${data.message}`,
                            })
                          }
                    }).catch((error)=>{
                    })
                
})