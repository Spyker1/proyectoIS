const fs = require('fs');
const path = require('path');

// Función para obtener la lista de imágenes de todos los productos
function obtenerTodasLasImagenes(rutaDeCarpeta) {
  const imagenes = [];

  // Obtener la lista de carpetas numeradas
  const carpetasNumeradas = fs.readdirSync(path.join(__dirname,'./imgs'));

  // Iterar a través de las carpetas numeradas
  for (const carpetaNumerada of carpetasNumeradas) {
    const carpetaPath = path.join(_dirname,'./imgs', carpetaNumerada);

    // Verificar si es una carpeta
    if (fs.statSync(carpetaPath).isDirectory()) {
      // Obtener la lista de archivos de imágenes dentro de la carpeta
      const archivosDeImagen = fs.readdirSync(carpetaPath).filter((archivo) => archivo.endsWith('.png'));

      // Agregar cada imagen a la lista de imágenes
      for (const archivoDeImagen of archivosDeImagen) {
        imagenes.push(path.join(carpetaNumerada, archivoDeImagen));
      }
    }
  }

  return imagenes;
}

module.exports = {
  obtenerTodasLasImagenes,
};
