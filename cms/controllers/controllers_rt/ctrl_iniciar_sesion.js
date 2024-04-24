const init = require('connect-session-sequelize');
const {usuario} = require('../../db/db');

const iniciarSesion = {
    rtIniciarSesion: async(req, res) => {
        try {
            
            const body = req.body;
            const {correo, contraseña} = body;
        
            const resultado = await usuario.contraseña_correo_us({correo,contraseña});
            console.log(resultado);
            const verifUsuario = resultado.datos.map((elemento) => {
                
                if (elemento.CORREO_US === correo && elemento.CONTRASEÑA_US === contraseña) {                    
                  console.log("Usuario existe y correcto ╰(*°▽°*)╯");
                  init;
                  req.session.usuario = {
                    id: (resultado.datos.map((elemento) => elemento.ID_US))[0]
                  }

                  if(elemento.PUESTO === 'Administrador'){

                    return res.json({ estatus: "OK", message: "BIENVENIDO ^_^" , datos: 'Administrador'});
                  }
                  return res.json({estatus: "OK", message: "BIENVENIDO ^_^" , datos: 'General'})

                } 
              });
        
              //----------------------------------------------------------------------------------------------------//
        
              if ( resultado.datos.length > 0 ) {
                verifUsuario;
              }else if(correo === '' && contraseña === ''){
                return res.json({estatus: "2", message: "Favor de llenar todos los campos"})
              }else if(correo === '' && contraseña !== ''){
                return res.json({estatus: "2", message: "Favor de llenar todos los campos"})
              }else {
                return res.json({estatus: "ERR", message: "Correo o contraseña incorrectos",});
              }
        } catch (error) {

            console.log('Error ctrlIniciar')
            return res.json({estatus: 'ERR'})
        }

    }
}

module.exports = iniciarSesion;