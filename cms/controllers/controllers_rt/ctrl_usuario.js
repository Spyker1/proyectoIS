const {usuario} = require('../../db/db');
const contraseñaRand = require('../../extras/contraseña');
const correos = require('../../extras/correos');

const usuarioABC = {
    rtAgregar: async(req, res) =>{
        try {
            const body = req.body;
            const {correo, rol,direccion,telefono,rfc, nombre} = body;
            
            console.log(`Correo: ${correo}\nRol: ${rol}`)
            if(!correo.length){
                return res.json({estatus: 2, message: 'Correo no permitido.'})
            }
            const antiRepeticion = await usuario.encontrar_usuario({
                correo,
                rol,
            })
            console.log (antiRepeticion)
            if(correo===''||rfc===''||rol===''){
                return res.json({estatus:2,message:'Tienes que llenar los datos obligatorios'})
            }else{
                if(!antiRepeticion.datos.length){
                   const contraseña= contraseñaRand()
                    usuario.nuevo_usuario({
                        correo: correo,
                        contraseña,
                        puesto: rol,
                        direccion,
                        telefono,
                        rfc,
                        nombre
                    });
                     const data = {
                        to: correo,
                        bcc: 'alexrdz1221@gmail.com',
                        subject: 'Contraseña',
                        template: 'usarioNuevoC',
                        contraseña: contraseña
                    }
                    correos.envio(data)
                    return res.json({estatus: 'OK', message: 'Correo aceptado'})
                }

                else{
                    return res.json({estatus: 2, message: 'Ese correo ya esta registrado.'})
                } 
                
            }
        } catch (error) {
            console.log('Catch en rtAgregar')
            return res.json({estatus: 'ERR', message: 'ERROR'})
        }
    },

    rtEliminar: async(req, res) => {
        try {
            console.log('Try eliminar')
            const idUsuario = req.params.usuarioId;
            const id = idUsuario.split(':').join("")
            
            console.log(id)
            const data = {id}

            await usuario.eliminar(data)

            return res.json({estatus:'OK', message: 'SE ELIMINO BIEN'})

        } catch (err) {
            console.log('Catch en eliminar');
            return res.json({estatus: 'ERR', message: 'ERROR'})
        }
    },
    
    rtActualizar: async(req, res) => {
        try {
            const{rol,id}=req.body;
            const data = {
                id:id,
                puesto:rol
            }
            await usuario.actualizar(data);

            return res.json({message:`ROL ACTUALIZADO CORRECTAMENTE DEL USUARIO ${id}`});
            
        } catch (err) {
            console.log('Catch en rtActualizar')
        }
    },
    rtActualizarDatos:async(req,res)=>{
        try {
            const body=req.body
            
            const{id_us,contraseña,correo_nuevo}=body;
   
            const resultado=await usuario.buscar_datos_us(id_us);

            const verificar_contraseña=resultado.datos.map(async(elemento)=>{
                if(elemento.CONTRASEÑA_US===contraseña){
                    const data={
                        id:id_us,
                        correo_nuevo:correo_nuevo
                    }
                    await usuario.actualizar_correo_us(data)
                    return res.json({estatus:'OK',message:`DATOS ACTUALIZADOS CORRECTAMENTE`})
                }else{
                    return res.json({estatus:'ERR',message:`CONTRASEÑA INCORRECTA`})
                }
            })

            verificar_contraseña
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = usuarioABC