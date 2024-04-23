const {usuario, cliente, producto, pedido} = require('../../db/db');

const cmsInicio ={
    estadisticas:async(req,res)=>{
        try{
            const resulPuesto = await usuario.puesto({id: req.session.usuario.id});
            res.render('estadisticas',{
                puesto: resulPuesto.datos[0].PUESTO
            });
        }catch(error){
            
        }
    },
    usuarios:async(req,res)=>{
        try {
            const pagina=req.query.pagina||1;
            const por_pagina=10;
            const ofset=(pagina-1)*10
        
            
            const data={
                por_pagina:por_pagina,
                ofset:ofset,
                id:req.session.usuario.id
            }
            const {resultado,total_productos}=await usuario.todos_usuario(data);
            const TOTAL=total_productos.datos.map(elemento=>{
                const {TOTAL} =elemento
                return TOTAL
              })
           
    
             const total_tienda=Math.ceil(TOTAL/por_pagina);
              const pag_pro=[];
              for(let i=1;i<=total_tienda;i++){
                pag_pro.push(i);
              }

            
            const resulPuesto = await usuario.puesto({id: req.session.usuario.id});
            res.render('usuarios',{
                usuarios:resultado.datos,
                pag_pro,puesto: resulPuesto.datos[0].PUESTO
            })
        } catch (error) {
            console.log(error)
        }
    },
    clientes:async(req,res)=>{
        try {
            const pagina=req.query.pagina||1;
            const por_pagina=10;
            const ofset=(pagina-1)*10
        
            
            const data={
                por_pagina:por_pagina,
                ofset:ofset
            }
            const {resultado,total_productos}=await cliente.todos_clientes(data);
            const TOTAL=total_productos.datos.map(elemento=>{
                const {TOTAL} =elemento
                return TOTAL
              })
           
    
             const total_tienda=Math.ceil(TOTAL/por_pagina);
              const pag_pro=[];
              for(let i=1;i<=total_tienda;i++){
                pag_pro.push(i);
              }

          
            const resulPuesto = await usuario.puesto({id: req.session.usuario.id});
            res.render('Clientes',{clientes:  resultado.datos,
                pag_pro,puesto: resulPuesto.datos[0].PUESTO})
        } catch (error) {
            console.log(error)
        }
    },
    productos:async(req,res)=>{
        try{
            const pagina=req.query.pagina||1;
            const por_pagina=10;
            const ofset=(pagina-1)*10
            
            
            const data={
                por_pagina:por_pagina,
                ofset:ofset

            }
            const {resultado,total_productos}=await producto.todos_productos(data);
            const TOTAL=total_productos.datos.map(elemento=>{
                const {TOTAL} =elemento
                return TOTAL
              })
           
    
             const total_tienda=Math.ceil(TOTAL/por_pagina);
              const pag_pro=[];
              for(let i=1;i<=total_tienda;i++){
                pag_pro.push(i);
              }
            
            const resulPuesto = await usuario.puesto ({id: req.session.usuario.id});
            res.render('productos',{productos:resultado.datos,
                pag_pro,puesto: resulPuesto.datos[0].PUESTO})
        }catch(error){
            console.log(error)
        }
    },
    pedidos:async(req,res)=>{
        try {
            const pagina=req.query.pagina||1;
        const por_pagina=10;
        const ofset=(pagina-1)*10
    
        
        const data={
            por_pagina:por_pagina,
            ofset:ofset

        }
        const {resultado,total_productos}=await pedido.mostrar_todos(data);
        const TOTAL=total_productos.datos.map(elemento=>{
            const {TOTAL} =elemento
            return TOTAL
          })
       

         const total_tienda=Math.ceil(TOTAL/por_pagina);
          const pag_pro=[];
          for(let i=1;i<=total_tienda;i++){
            pag_pro.push(i);
          }

           
            const resulPuesto = await usuario.puesto({id: req.session.usuario.id});
            res.render('pedidos',{ pedidos:resultado.datos,
                pag_pro, puesto: resulPuesto.datos[0].PUESTO})
        } catch (error) {
            console.log(error)
        }
    },
    inicio:async(req,res)=>{
        try {
            res.render('inicioSuper',{productos:resultado.datos,
                pag_pro,puesto: resulPuesto.datos[0].PUESTO})
            
        } catch (error) {
            console.log(error)
            res.redirect('/pagina-no-encontrada')
    }
   
}
}

module.exports = {
    cmsInicio
}