document.addEventListener('DOMContentLoaded', function () {
    
    const colorSelect = document.getElementById('color');
    const colorOtroInput = document.getElementById('colorOtro');
    const marcaSelect = document.getElementById('marca');
    const marcaOtroInput = document.getElementById('marcaOtro');
    const genSelect = document.getElementById('gen');
    const genOtroInput = document.getElementById('genOtro');
    const tipoSelect = document.getElementById('tipo');
    const tipoOtroInput = document.getElementById('tipoOtro');

    // Función para habilitar o deshabilitar el campo "Otro" en función de la selección
    function toggleOtroInput(selectElement, otroInputElement) {
        if (selectElement.value === 'Otro') {
            otroInputElement.style.display = 'inline-block';
            otroInputElement.disabled = false;
        } else {
            otroInputElement.style.display = 'none';
            otroInputElement.disabled = true;
        }
    }

    // Agregar eventos a los select para controlar el campo "Otro"
    colorSelect.addEventListener('change', () => {
        toggleOtroInput(colorSelect, colorOtroInput);
    });

    marcaSelect.addEventListener('change', () => {
        toggleOtroInput(marcaSelect, marcaOtroInput);
    });

    genSelect.addEventListener('change', () => {
        toggleOtroInput(genSelect, genOtroInput);
    });

    tipoSelect.addEventListener('change', () => {
        toggleOtroInput(tipoSelect, tipoOtroInput);
    });
});
