const { producto} = require("../../db/db");

const productos={
    rtActualizarProducto:async(req,res)=>{
        try {
            const nom_pro=req.params.nom_pro;
            procesado=nom_pro.split("%20").join("");
    
            const resultado=await producto.buscar_nom(procesado);
            
            
            res.render('actualizarP',{
                procesado,
                producto:resultado.datos
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=productos