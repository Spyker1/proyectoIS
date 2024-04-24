const mostrarModal = document.querySelectorAll('#mostrarModal');
// const x = document.querySelectorAll('#prueba')
// const miModal = document.querySelectorAll('#miModal');


mostrarModal.forEach(button=>{
    button.addEventListener('click', (event) => {
        const id=event.target.getAttribute('data-id-us');
        const miModal = document.getElementById(`miModal-${id}`);
        const cerrarModal = document.getElementById(`cerrarModal-${id}`);
        
            miModal.style.display = 'block';
            
            
            // cerrarModal.forEach(cerrar=>{
         
                cerrarModal.addEventListener('click', () => {
                    miModal.style.display = 'none';
                });
            // })
          
            
                window.addEventListener('click', (event) => {
                    if (event.target == miModal) {
                        miModal.style.display = 'none';
                    }
                });

                const formulario = document.getElementById(`formulario-${id}`);


        
           formulario.addEventListener('submit', async(event) => {
            //    event.preventDefault();
               
               // Aquí puedes obtener los valores del correo y los roles seleccionados y hacer lo que necesites con ellos.
               let rol;
              
               const general = document.getElementById(`general-${id}`);
               const admin = document.getElementById(`administrador-${id}`);
               
               if(general.checked){
                   rol = general.value
               }else if(admin.checked){
                   rol = admin.value
               }
               const data={rol,id}
               
               await fetch (`/rt-actualizar-us`, {
                   method: 'POST',
                   headers: {
                       'Content-Type': 'application/json',
                   },
                   body:JSON.stringify(data)
               })
                   .then((response)=> response.json())
                   .then((data)=>{
                    Swal.fire({
                        icon: 'success',
                        title: `${data.message}`,
                        timer: 1500
                      })
                           location.href='/Usuarios'
                   }).catch((error)=>{
                           console.log('Error X.X',error)
               })
       });

       })

       })








