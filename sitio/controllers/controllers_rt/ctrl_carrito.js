const {carrito, productos}=require('../../db/db')

const carrito_productos={
    rtAgregarCarrito:async(req,res)=>{
        
        try{
            const id_pro = req.params.productId;
            
            const usuario=req.session.usuario?true:false; 
            const resultado=await productos.producto_activo(id_pro)


            const act_pro=resultado.datos.map(elemento=>{
                const {ACT_PRO}=elemento
                return ACT_PRO;
            })
            if(usuario){
                const id_usuario=req.session.usuario.id;
                if(act_pro[0]===true){
                    const data={id_pro,id_usuario}
                    const producto=await productos.productoId(id_pro)
                    const resultado=(await carrito.agregar(data)).datos
                    const mensaje=resultado.map(elemento=>elemento.MENSAJE)
                    if(mensaje=='OK'){
                        return res.json({estatus:'AGR_C',message:'SE AGREGO CORRECTAMENTE AL CARRITO',nombre_producto:producto.datos[0].NOM_PRO,
                        ID_PRO:producto.datos[0].ID_PRO,PT_IMG:producto.datos[0].PT_IMG})
                    }else{
                        return res.json({estatus:'INS'})
                    }
    
                }else{
                    return res.json({message:`NO HAY EXISTENCIAS DEL PRODUCTO`})
                }
            }else{
                return res.json({estatus:'CUENTA',message:'NECESITAS INICIAR SESIÓN'});
            }

            
        }catch(err){    
            console.log(err)
            res.render('carrito',{})
        }
},
rtEliminarCarrito:async(req,res)=>{
    try{
        let id_pro_carrito=req.params.productId;
        const id_usuario=req.session.usuario.id;
        procesado_id_pro=id_pro_carrito.split(":").join("");
        const data={id_pro:procesado_id_pro,id:id_usuario}
               
       await carrito.eliminar(data);
        

    }catch(err){
        console.log('Error',err)
    }
},
rtAgregarPlantillaCarrito:async(req,res)=>{
    try{
        const id_pro = req.params.productId;
            const usuario=req.session.usuario?true:false; 
            const param=req.params.cantidad;
            const cantidad=parseInt(param)

            const resultado=await productos.producto_activo(id_pro)
            

            const act_pro=resultado.datos.map(elemento=>{
                const {ACT_PRO}=elemento
                return ACT_PRO;
            })

            const cantidad_base=await productos.cantidad_productos(id_pro)
            const cantidad_pro=cantidad_base.datos.map(elemento=>{
                const {CANT_PRO}=elemento
                return CANT_PRO;
            })
            
            if(usuario){
                const id_usuario=req.session.usuario.id;
                const data={
                    id_pro:id_pro,
                    id_usuario:id_usuario,
                    cantidad:cantidad
                };
            if(act_pro[0]===true){
            if(cantidad_pro[0]<cantidad){
                return res.json({estatus:'ERR',message:`CANTIDAD DE PRODUCTOS INSUFICIENTES`})
            }else{
                const producto=await productos.productoId(id_pro)
                const resultado=(await carrito.agregar_plantilla(data)).datos
                const mensaje=resultado.map(elemento=>elemento.MENSAJE)
                if(mensaje=='OK'){

                    return res.json({estatus:'OK',message:`AGREGADO AL CARRITO`,nombre_producto:producto.datos[0].NOM_PRO,
                    ID_PRO:producto.datos[0].ID_PRO,PT_IMG:producto.datos[0].PT_IMG})
                }else{
                    return res.json({estatus:'INS'})
                }

            }
        }else{
            return res.json({estatus:'ERR',message:`NO HAY EXISTENCIAS DEL PRODUCTO`})
        }
    }else{
        return res.json({estatus:'CUENTA',message:'NECESITAS INICIAR SESIÓN'});
        }  

    }catch(err){
        console.log(err)
        return res.json({message:`Error${err}`})
    }
}
}

module.exports={
    carrito_productos
}


  