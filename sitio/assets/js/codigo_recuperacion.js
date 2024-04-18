document.addEventListener('DOMContentLoaded', () => {
    // boton de verificar codig = verifCod

    const btnVerifCod = document.getElementById('verifCod');
    const btnReenviar = document.getElementById('botonRc');

    btnVerifCod.addEventListener('click', (event) => {
        event.preventDefault();
        const data = {
            codigo: document.getElementById('codigoRecuperacion').value > 999  ? document.getElementById('codigoRecuperacion').value : 'Código no valido',
            correo: document.getElementById('correo').textContent
        }

        fetch('/rt-verificar-codigo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response)=>response.json())
        .then((data) => {
            if(data.estatus === 'OK'){
                Swal.fire({
                    icon: 'success',
                    title: 'Código Correcto',
                    text: data.message,
                })
                  .then(function(result){
                    result.isConfirmed ? location.href = '/iniciar-sesion' : console.log('No click'
                    )})

            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Código Incorrecto',
                    text: 'Verifique si su código esta bien escrito ',
                  })
            }
        })
    })

    btnReenviar.addEventListener('click', () => {
         const data = {
            correo: document.getElementById('correo').textContent
        }
        fetch('/rt-reenviar-codigo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response)=>response.json())
        .then((data) => {
            if(data.estatus === 'OK'){
                Swal.fire({
                    icon: 'success',
                    title: 'Correo reenviado',
                    text: data.message,
                  })
            }
        })
    })
})