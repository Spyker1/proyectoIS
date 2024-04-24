$(document).ready(function() {
    // Agregar un controlador de evento para el botón "Guardar Producto"
    $("#guardarProducto").click(function() {
        // Obtener los valores de los campos
        var nombreProducto = $("#nombreProducto").val();
        var descrip = $("#descrip").val();

        // Crear una lista para almacenar los nombres de los campos obligatorios que faltan por llenar
        var camposFaltantes = [];

        // Verificar si los campos obligatorios están vacíos y agregarlos a la lista si es necesario
        if (nombreProducto === "") {
            camposFaltantes.push("Nombre");
            $("#nombreProducto").css("border-color", "red");
        } else {
            $("#nombreProducto").css("border-color", ""); // Restablecer el borde
        }
        // if (cantidad === "") {
        //     camposFaltantes.push("Cantidad");
        //     $("#cantidad").css("border-color", "red");
        // } else {
        //     $("#cantidad").css("border-color", ""); // Restablecer el borde
        // }
        // if (precio === "") {
        //     camposFaltantes.push("Precio");
        //     $("#precio").css("border-color", "red");
        // } else {
        //     $("#precio").css("border-color", ""); // Restablecer el borde
        // }
        if (descrip === "") {
            camposFaltantes.push("Descripción");
            $("#descrip").css("border-color", "red");
        } else {
            $("#descrip").css("border-color", ""); // Restablecer el borde
        }
        // if (marca === "") {
        //     camposFaltantes.push("Marca");
        //     $("#marca").css("border-color", "red");
        // } else {
        //     $("#marca").css("border-color", ""); // Restablecer el borde
        // }
        // if (tipo === "") {
        //     camposFaltantes.push("Tipo");
        //     $("#tipo").css("border-color", "red");
        // } else {
        //     $("#tipo").css("border-color", ""); // Restablecer el borde
        // }

        // Verificar si hay campos faltantes y mostrar una alerta con SweetAlert
        // if (camposFaltantes.length > 0) {
        //     var mensajeError = "Por favor, complete los siguientes campos obligatorios:\n";
            
        //     // Mostrar la alerta de SweetAlert
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Campos Obligatorios Faltantes',
        //         text: mensajeError
        //     });
        // } else {
        //     Swal.fire({
        //         icon: 'success',
        //         title: 'Producto Guardado',
        //         text: 'El producto se ha guardado exitosamente.'
        //     });
        // }
    });
});


