//Para usar este extra AGREGAR ESTO al html <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>

function alertaPro(object) {
    Swal.fire({
        title: object.titulo,
        text: object.mensaje,
        icon: 'success',
        confirmButtonColor: '#007BFF',
        customClass: {
            popup: 'my-custom-popup-class',
            title: 'my-custom-title-class',
            content: 'my-custom-content-class',
        }
    });
}

module.exports = alertaPro