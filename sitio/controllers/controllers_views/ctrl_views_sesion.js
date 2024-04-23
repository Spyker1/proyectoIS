

const sesiones={
    sesion:async(req,res)=>{
        try{
            res.json(req.session)
        }catch(err){
            console.log(err)
        }
    },
    crearSesion:async(req,res)=>{
        try{
        
            res.render('crearSesion', {
                
            })
        }catch(err){
            console.log(err)
            res.render('')
        }
        
    },
    iniciarSesion:async(req,res)=>{
        try{
        
            res.render('iniciarSesion', {
    
            })
        }catch(err){
            console.log(err)
            res.render('')
        }
    },
    cerrarSesion:async(req,res)=>{
        try{
            req.session.destroy();
    
            return res.redirect('/');
            
        }catch(err){
            alert('No tiene una sesión activa');
        }
    }
}

module.exports=sesiones