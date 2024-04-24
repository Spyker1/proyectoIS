document.addEventListener('DOMContentLoaded', ()  => {
const guardarProductoBtn = document.getElementById('guardarProducto');

// Agregar un manejador de eventos al botón "Guardar Producto"
guardarProductoBtn.addEventListener('click', function () {
    var formData=new FormData();

    const fileInput=document.getElementById('i2');
        formData.append('images',fileInput.files[0])
        console.log(fileInput.files);


    const data = {
    nombreProducto: document.getElementById('nombreProducto').value,
    cantidad: document.getElementById('cantidad').value,
    precio: document.getElementById('precio').value,
    des: document.getElementById('descrip').value,
    color: document.getElementById('color').value,
    marca: document.getElementById('marca').value,
    genero: document.getElementById('gen').value,
    tipo: document.getElementById('tipo').value
    }
    fetch('/rt-agregar-producto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
    })
    .then(response => response.json())
    .then((data) => {
        if(data.estatus==3){
            Swal.fire("Campos faltantes",data.message)
        }
        else if(data.estatus===2){
            alert(data.message)
        }else{

            fetch(`http://localhost:3000/imagenes/${data.id_pro}`,{
                method:'POST',
                body: formData
            })
            .then(response=>response.json())
            .then(data=>{
               location.reload()
            }).catch(err=>{
                console.log(err)
            })
        }
    
    })
    
    .catch(err => {
        console.log(err)
    });

});
})