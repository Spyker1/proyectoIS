const datosPersonalesTitulo = document.getElementById('datosPersonalesTitulo');
const actualizarDatosTitulo = document.getElementById('actualizarDatosTitulo');
const datosPersonalesContenido = document.getElementById('datosPersonalesContenido');
const actualizarDatosContenido = document.getElementById('actualizarDatosContenido');

function cerrarSecciones() {
    datosPersonalesContenido.style.display = 'none';
    actualizarDatosContenido.style.display = 'none';
}

datosPersonalesTitulo.addEventListener('click', (event) => {
    event.stopPropagation(); // Evita que el clic se propague al contenido
    cerrarSecciones();
    datosPersonalesContenido.style.display = 'block';
});

actualizarDatosTitulo.addEventListener('click', (event) => {
    event.stopPropagation(); // Evita que el clic se propague al contenido
    cerrarSecciones();
    actualizarDatosContenido.style.display = 'block';
});

document.addEventListener('click', () => {
    cerrarSecciones();
});

datosPersonalesContenido.addEventListener('click', (event) => {
    event.stopPropagation(); // Evita que el clic se propague fuera del contenido
});

actualizarDatosContenido.addEventListener('click', (event) => {
    event.stopPropagation(); // Evita que el clic se propague fuera del contenido
});