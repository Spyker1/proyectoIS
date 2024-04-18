const {cliente}=require('../../db/db')


const cliente_hecho={
    rtActualizarCliente:async(req,res)=>{
        try{
            const datos=req.body;
            const {nuevoNombre,nuevoCorreo,nuevacontraseña,contraseñaActual}=datos;
            const id_usuario=req.session.usuario.id;
            
            const resultado=await cliente.buscar_id(id_usuario);

            const verificar_contraseña=resultado.datos.map(async(elemento)=>{
                if(elemento.CONTRASEÑA_CLI===contraseñaActual){
                if(nuevoNombre==''||nuevacontraseña==''||nuevoCorreo==''){
                    return res.json({message:`TIENES QUE LLENAR TODOS LOS CAMPOS PRIMERO`})
                }else{
                    await cliente.actualizar(datos,id_usuario);
                    return res.json({message:`DATOS CAMBIADOS CORRECTAMENTE`})
                }
            }else{
                return res.json({message:`CONTRASEÑA INCORRECTA`})
            }
            })

           verificar_contraseña;
           
        }catch(err){
            throw err;
        }
    },
    rtBorrarCliente:async(req,res)=>{
        try{
            const id_usuario=req.session.usuario.id;

            await cliente.borrar(id_usuario);
            req.session.destroy()
            return res.json({message:'CUENTA BORRADA CON EXITO'})
        }catch(err){

           return res.json({message:`Hubo un error al borrar la cuenta `})
        }
    }
}

module.exports={cliente_hecho}