const {carrito}=require('../../db/db')

const views_carrito={
    carrito:async(req,res)=>{
        try{
            const id_usuario=req.session.usuario.id;
            const productos=await carrito.todos(id_usuario);
            const usuario=req.session.usuario?true:false;
            const cantidad_productos_datos=await carrito.productos_carrito(id_usuario);
            const cantidad_productos_carrito=cantidad_productos_datos.datos.map(resultado=>resultado.PRODUCTOS_CARRITO)
            const pago_total = productos.datos.map(elemento => {
                const {PAGO_TOT_CARRITO} = elemento
                return PAGO_TOT_CARRITO
              })
            res.render('carrito',{
                productos_carrito:productos.datos,
                PAGO_TOT_CARRITO:pago_total[0],
                usuario,
                CANTIDAD_PRODUCTOS_CARRITO:cantidad_productos_carrito  
            })
        }catch(err){
            console.log('Error',err)
        }
    }
}

module.exports=views_carrito