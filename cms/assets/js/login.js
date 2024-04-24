const verifCorreo = (correo) => { 
    const arreglo = correo.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    if(arreglo) return true
    
    return false
}

document.addEventListener("DOMContentLoaded", () => {

    const loginButton = document.getElementById("login-button");
    loginButton.addEventListener("click", (event) => {
        event.preventDefault();

        const data = {

            correo: verifCorreo(document.getElementById('correo').value) ? document.getElementById('correo').value : '',
            contraseña: document.getElementById('contraseña').value

        }

        fetch('/rt-iniciar-sesion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        } )
        
        .then((response) => response.json())
        .then((data) =>{
            if(data.estatus === 'OK'){
                // Swal.fire({
                //     icon: 'success',
                //     title: `${data.message}`
                //   })
                window.location.href = '/Productos'

            }else if(data.estatus === '2'){
                Swal.fire({
                    icon: 'warning',
                    title: `${data.message}`
                  })
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: `${data.message}`
                  })
            }
        })
        .catch((error) =>{
            console.log('Error IS');
            console.log(error)
        })
    });
});