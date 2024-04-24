const miCuentaButton = document.getElementById('miCuentaButton');
const miCuentaMenu = document.getElementById('miCuentaMenu');
const cerrarSesionLink = document.getElementById('cerrarSesionLink');

miCuentaButton.addEventListener('click', () => {
    miCuentaMenu.classList.toggle('hidden');
});

// Cierra el menú si se hace clic fuera de él
document.addEventListener('click', (event) => {
    if (!miCuentaButton.contains(event.target) && !miCuentaMenu.contains(event.target)) {
        miCuentaMenu.classList.add('hidden');
    }
});

cerrarSesionLink.addEventListener('click', () => {
    // Mostrar un alert llamativo
    mostrarAlertaLlamativa();

    // Redirigir a otra página después de 3 segundos
    setTimeout(() => {
        window.location.href = '/cerrar-sesion';
    }, 3000); // 3000 milisegundos (3 segundos)
});

function mostrarAlertaLlamativa() {
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert-llamativo');
    alertDiv.innerHTML = '<h2>Cerrando Sesion.</h2>';
    document.body.appendChild(alertDiv);

    // Eliminar el alert después de 3 segundos
    setTimeout(() => {
        document.body.removeChild(alertDiv);
    }, 3000);
}