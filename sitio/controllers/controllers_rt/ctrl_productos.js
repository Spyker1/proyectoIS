const {productos,carrito}=require('../../db/db')

const todos_productos= {
    rtAgregarProductos:async(req,res)=>{
        try{
            const datos=req.body;
            await productos.agregar(datos);

            
            res.json({estatus:'OK'});
        }catch(err){
            console.log("No se pudo agregar el producto");
            res.json({estatus:'Error'});
        }
    },
    rtActualizarProductos:async(req,res)=>{
        try{
            const datos=req.body;
            await productos.actualizar(datos);

            
            res.json({estatus:'OK'});
        }catch(err){
            console.log("No se pudo actualizar el producto");
            res.json({estatus:'Error'})
        }
    },
    rtBuscarProductos:async(req,res)=>{
        try{
        const datos=req.body;
        const resultado=await productos.buscar(datos);

        
        res.json({estatus:'OK'});
    }catch(err){
        console.log('No se pudo encontrar al producto');
        res.json({estatus:'Error'});
    }   

},
rtBorrarProductos:async(req,res)=>{
    try{
        const datos=req.body;
        const resultado=await productos.borrar(datos);

        console.log(resultado);
        res.json({estatus:'OK'});

    }catch(err){
        console.log('No se pudo borrar el producto')
    }
},
rtUltimosDiezProductos:async(req,res)=>{
    try{
        const usuario=req.session.usuario?true:false;    
        const resultado=await productos.ultimos_diez_productos();
        if(usuario){
            const id_usuario=req.session.usuario.id;
            const cantidad_productos_datos=await carrito.productos_carrito(id_usuario);
            
            const cantidad_productos_carrito=cantidad_productos_datos.datos.map(resultado=>resultado.PRODUCTOS_CARRITO)

            res.render('index',{
                catalogo:resultado.datos,
                usuario,
                CANTIDAD_PRODUCTOS_CARRITO:cantidad_productos_carrito
            })
        }else{
            res.render('index',{
                catalogo:resultado.datos,
                usuario
            })

        }
    
    }catch(err){
        console.log(err)
        res.render('index',{});
    }

}
}

module.exports={
    todos_productos
}