const verifCorreo = (correo) => { 
    const arreglo = correo.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    if(arreglo) return true
    
    return false
}

document.addEventListener('DOMContentLoaded', ()=>{

    const enviarContraseña = document.getElementById('boton');

    enviarContraseña.addEventListener('click', (event)=>{

        event.preventDefault();

        const data = {
            correo: verifCorreo(document.getElementById('correoDestino').value) ? document.getElementById('correoDestino').value : 'No permitido' 
        }
        console.log(data.correo)
        fetch('/rt-recuperar-contrasena', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response)=>response.json())
        .then((data) => {
                if(data.estatus === 'OK'){
                    console.log('ok')
                    setTimeout(() => {
                    location.href = `/codigo-recuperacion/${data.info}`;
                    }, 3 * 1000)
                    
                    let timerInterval
                    Swal.fire({
                        title: 'Verifica que tu correo sea el correcto',
                        html: `Se envio un código al correo <b></b>`,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                            const b = Swal.getHtmlContainer().querySelector('b')
                            b.textContent = data.info
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                            console.log('I was closed by the timer')
                        }
                    })
                }else{
                    let timerInterval
                    Swal.fire({
                        title: 'Verifica que tu correo sea el correcto',
                        html: 'Correo no permitido intenta con otro ~_~ ',
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                            const b = Swal.getHtmlContainer().querySelector('b')
                            timerInterval = setInterval(() => {
                                b.textContent = Swal.getTimerLeft()
                            }, 100)
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                            console.log('I was closed by the timer')
                        }
                    })
                }
        })
        .catch((err) => {
            console.log(err)
        })
    })
})