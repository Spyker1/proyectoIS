
const btn_actualizar_pro=document.getElementById('actualizar-pro');

btn_actualizar_pro.addEventListener('click',async(event)=>{
    event.preventDefault()
    const nom_pro=event.target.getAttribute('data-nom-pro');
    
    const data={
        nombre_producto:document.getElementById('nom_pro').value,
        descripcion_pro:document.getElementById('desc_pro').value,
        nom_pro
    }
    await fetch('/rt-actulizar-datos-producto',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.estatus === 'OK'){
                location.href= '/Productos'
                Swal.fire({
                    icon: 'success',
                    title: `${data.message}`
                  })
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