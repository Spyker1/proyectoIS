const verifCorreo = (correo) => { 
    const arreglo = correo.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    if(arreglo) return true
    
    return false
}

document.addEventListener('DOMContentLoaded', ()  => {
    const aggUsuario = document.getElementById('agregarUsuario');

    aggUsuario.addEventListener('click', (event) => {
        event.preventDefault();

        const data = {

            correo: verifCorreo(document.getElementById('correoUs').value) ? document.getElementById('correoUs').value : '',
            rol: document.getElementById('rolOpciones').value,
            direccion:document.getElementById('direccion').value,
            telefono:document.getElementById('telefono').value,
            rfc:document.getElementById('rfc').value,
            nombre: document.getElementById('nombreUs').value
        }

        console.log(`Correo: ${data.correo}\nRol: ${data.rol }`)

        fetch('/rt-agregar-usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        } )
        .then((response) => response.json())
        .then((data) => {
            if(data.estatus === 'OK'){
                Swal.fire({
                    icon: 'success',
                    title: `${data.message}`
                  })
                window.location.href= '/Usuarios'
            }else{
                Swal.fire({
                    icon: 'error',
                    title: `${data.message}`
                  })
            }
            
        })
        .catch((err) => {
            throw err
        })
    })
    

})