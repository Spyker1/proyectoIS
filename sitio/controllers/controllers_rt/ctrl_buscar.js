const {busqueda}=require('../../db/db')

const buscador={
    rtBusqueda:async(req,res)=> {
        try{
           const texto=req.body;
            const resultado=await busqueda.busquedaPro(texto);
            
            res.render('partials/sugerencias_busqueda',{
                sugerencias_busqueda:resultado.datos
            })
            
        }catch(err){
            console.log(err)
        }
    },
  }

  module.exports={
    buscador
}