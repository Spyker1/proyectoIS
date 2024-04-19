const { doble_aut } = require("../../db/db")


const doble_autenticacion={
    rtActivar:async(req,res)=>{
        try{
            const data = {id: req.session.usuario.id}
            await doble_aut.activar(data)

            return res.json({message:'DOBLE AUTENTICACION ACTIVADA'})
        }catch(err){
            throw err;
        }
    },
    rtDesactivar:async(req,res)=>{
        try{
            const data = {id: req.session.usuario.id}
            await doble_aut.desactivar(data)

            return res.json({message:'DOBLE AUTENTICACION DESACTIVADA'})
        }catch(err){
            throw err;
        }
    }
}

module.exports={
    doble_autenticacion
}