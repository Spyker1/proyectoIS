const verifCorreo = (correo) => { 
      
    const arreglo = correo.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

    if(arreglo) return true
    
    return false
}

document.addEventListener('DOMContentLoaded',() => {
    
    const btn = document.getElementById('boton');
    btn.addEventListener('click', (event)  =>{
            event.preventDefault();           
            const data = {
                correo: verifCorreo(document.getElementById('correo').value) ? document.getElementById('correo').value : '',
                contraseña: document.getElementById('contraseñaUsuario').value

            }
            fetch('/rt-iniciar-sesion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            } )
            .then((response) => response.json())
            .then((data) => {
                if(data.estatus == 'OK'){
                    
                          location.href = '/';
                }
                else if(data.estatus == '2'){
                    location.href = '/codigo-verificacion';
                }else if(data.estatus == '3'){
                    Swal.fire({
                        icon: 'error',
                        title: `${data.message}`
                      })
                }
                else{
                    Swal.fire({
                        icon: 'error',
                        title: `${data.message}`
                      })
                }
            } )
            .catch((error) =>{
            } );
               
        } );

    } );
