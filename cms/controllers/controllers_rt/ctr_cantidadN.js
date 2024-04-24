const { producto } = require("../../db/db");


const nuevaC = {
    rtNuevac:async(req,res)=>{
        try {
            const cant = req.params.cantidad;
            const id=req.params.id;

            const data = {id,cant}

            await producto.nuevac(data)

            return res.json({estatus:'OK', message: 'SE ACTUALIZO BIEN'})

        } catch (err) {
            console.log('Catch en eliminar');
            console.log(err)
            return res.json({estatus: 'ERR', message: 'ERROR'})
        }
}
}

module.exports = nuevaC


