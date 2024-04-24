function validarNumero(input) {
    // Remover cualquier carácter no numérico o negativo
    input.value = input.value.replace(/[^0-9.]/g, '');

    // Verificar si el número es positivo
    const numero = parseFloat(input.value);

}

function validarNum(input) {
    // Remover cualquier carácter no numérico o negativo
    input.value = input.value.replace(/[^0-9]/g, '');

    // Verificar si el número es positivo
    const numero = parseFloat(input.value);
 
}