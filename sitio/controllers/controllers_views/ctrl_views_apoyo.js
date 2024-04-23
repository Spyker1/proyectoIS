const {carrito,cliente}=require('../../db/db')

const apoyo={
    enviarOpinion:async(req,res)=>{
        try{
        
            res.render('enviarOpinion', {
                
            })
        }catch(err){
            console.log(err)
            res.render('')
        }
    },
    recuperarContraseña:async(req,res)=>{
        try{
            res.render('recuperar_contraseña', {
            })
        }catch(err){
            console.log(err)
            res.render('')
        }
    },
    codigoRecuperacion:async(req,res)=>{
        try {
            res.render('codigo_recuperacion', correo = req.params)
        } catch (error) {
            console.log(error)
            res.render('')
        }
    },
    codigoVerificacion:async(req,res)=>{
        try{
        
            res.render('codigo_verificacion', {
    
            })
        }catch(err){
            console.log(err)
            res.render('')
        }
    },
    miCuenta:async(req,res)=>{
        try{
            const id_usuario=req.session.usuario.id;
            const usuario=req.session.usuario?true:false;   
            const cuenta=await cliente.buscar_id(id_usuario);
            const cantidad_productos_datos=await carrito.productos_carrito(id_usuario);
            
            const cantidad_productos_carrito=cantidad_productos_datos.datos.map(resultado=>resultado.PRODUCTOS_CARRITO)
            
            res.render('micuenta', {
                cliente_cuenta:cuenta.datos,
                usuario,
                CANTIDAD_PRODUCTOS_CARRITO:cantidad_productos_carrito
            })
        }catch(err){
            console.log(err)
            res.render('')
        }
    }
}

module.exports=apoyo