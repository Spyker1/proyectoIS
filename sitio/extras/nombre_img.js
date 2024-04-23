const nombreArchivo = (nombre='') => {
    let element='' 
    if (nombre.length) {
        for (let i = nombre.length-1; i >= 0; i--) {
            if (nombre[i] !== '.') {
                element = element.concat(nombre[i]);
            }else{
                i = -1;
            }
        }
        return element.concat('.').split('').reverse().join('');
    } else {
        return 'No tiene caracteres';
    }
}

module.exports= nombreArchivo;

