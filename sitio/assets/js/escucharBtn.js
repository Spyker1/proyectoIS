const contra = document.getElementById('contraseñaUsuario');
const ver = document.getElementById('checkbox');
const label = document.getElementById('label')

ver.addEventListener('click', () =>{
        if (contra.type === 'password'){
            contra.type = 'text';
            label.textContent = 'Ocultar contraseña'
         
        }else{
            
            contra.type = 'password';
            label.textContent = 'Mostrar contraseña'

        }
});

