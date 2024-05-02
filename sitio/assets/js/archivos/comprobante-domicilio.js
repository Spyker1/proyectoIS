document.addEventListener('DOMContentLoaded', ()  => {
    const guardarProductoBtn = document.getElementById('guardarProducto');
    
    // Agregar un manejador de eventos al botón "Guardar Producto"
    guardarProductoBtn.addEventListener('click', function () {
        var formData=new FormData(document.getElementById("form-actaNacimiento"));
        
        for (const [key, value] of formData) {
            if(value.name.length !== 0){
                fetch('/subir-acta-nacimiento', {
                    method: 'POST',
                    body: formData, 
                }).then(response => response.json())
                .then(data => {
                    if (data.estatus === 'OK') {
                        Swal.fire(data.title, data.message, data.icon)
                    }else{
                        Swal.fire(data.title, data.message, data.icon)
                    }
                })
            }else{
                console.log('No hay archivo');
            }
            
        }
        

    
    });
})
