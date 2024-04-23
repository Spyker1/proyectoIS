const { detalles_pedidos } = require("../../db/db");


const pedidos={
    rtDetallesPedido:async(req,res)=>{
        try {
            const id_ped=req.params.id_ped;
            const resultado=await detalles_pedidos.mostrar_todos(id_ped);
            console.log(resultado)

            const direccion=resultado.datos.map(elemento=>{
                const {DIRECCION}=elemento;
                return DIRECCION
            })

            const ciudad=resultado.datos.map(elemento=>{
                const{CIUDAD}=elemento
                return CIUDAD
            }) 

            const estado=resultado.datos.map(elemento=>{
                const {ESTADO}=elemento
                return ESTADO
            });

            const cod_postal=resultado.datos.map(elemento=>{
                const {COD_POSTAL}=elemento
                return COD_POSTAL
            })

            const pago_tot=resultado.datos.map(elemento=>{
                const{PAGO_TOT}=elemento
                return PAGO_TOT
            })
            console.log(`${direccion[0]} , ${ciudad[0]} , ${estado[0]} , ${cod_postal[0]} , ${pago_tot[0]}`)
            res.render('detallesPed',{
                detalles_pedido:resultado.datos,
                direccion:direccion[0],
                ciudad:ciudad[0],
                estado:estado[0],
                cod_postal:cod_postal[0],
                pago_tot:pago_tot[0]
            })

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=pedidos