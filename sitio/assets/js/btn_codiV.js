document.addEventListener('DOMContentLoaded', ()=>{

    const btn = document.getElementById('boton');

    btn.addEventListener('click', (event) =>{
        event.preventDefault();

        const data = {
            codiV: document.getElementById('codiV').value,
        }

        fetch('/rt-codigo-verif', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),

        } )
        .then((response) => response.json())
        .then((data) => {
            if(data.estatus === 'OK'){
                Swal.fire({
                    icon: 'success',
                    title: 'Código de verificación correcto',
                  }).then(()=>{
                      location.href = '/';

                  })
            }else if(data.estatus === 'OK INACTIVE'){
                location.href = '/iniciar-sesion'
            }else{
                Swal.fire({
                    icon: 'error',
                    title: `${data.message}`,
                  })
            }
        })
        .catch((error) =>{
        })
    } );

} );

