document.addEventListener('DOMContentLoaded', ()  => {
    const guardarProductoBtn = document.getElementById('guardarProducto');
    
    // Agregar un manejador de eventos al botón "Guardar Producto"
    guardarProductoBtn.addEventListener('click', function () {
        var formData=new FormData(document.getElementById("form"));
        let tipoMovimiento = document.getElementById("form").name
       
        console.log(tipoMovimiento);

        for (const [key, value] of formData) {
            if(value.name.length !== 0){
                fetch('/subir-archivo', {
                    method: 'POST',
                    headers: {'tipo': tipoMovimiento},
                    body: formData, 
                })
                .then(response => response.json())
                .then(data => {
                    if (data.estatus === 'OK') {
                        Swal.fire(data.title, data.message, data.icon)
                    }else{
                        Swal.fire(data.title, data.message, data.icon)
                    }
                })
            }else{
                Swal.fire('Favor de poner un archivo', 'No puede dejar el espacion en blanco', 'error')
            }            
        }
    });
})
