document.getElementById("descargarBtn").addEventListener("click", exportarTabla);

function exportarTabla() {
    const tabla = document.getElementById("miTabla");

    // Clonar la tabla para no alterar la original
    const tablaClonada = tabla.cloneNode(true);

    // Obtener todas las filas de la tabla clonada
    const filas = tablaClonada.querySelectorAll("tr");

    // Iterar sobre cada fila y eliminar la celda de la tercera columna (índice 2)
    filas.forEach(function(fila) {
        fila.deleteCell(6)
        fila.deleteCell(5); // Eliminar la tercera celda (índice 2)
        fila.deleteCell(4)
        fila.deleteCell(1)

    });

    // Convertir la tabla modificada a HTML
    const tablaHTML = tablaClonada.outerHTML;

    // Crear el blob y el enlace de descarga
    const blob = new Blob([tablaHTML], { type: 'application/vnd.ms-excel' });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    const date = new Date().toLocaleDateString()
    const fechaFormat=date.replaceAll('/','-')
    a.download = `Pedidos ${fechaFormat}.xls`; // Nombre del archivo Excel
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}