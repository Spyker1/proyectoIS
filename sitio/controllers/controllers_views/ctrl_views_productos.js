const {productos,busqueda,paginacion_productos,carrito}=require('../../db/db');


async function  filtro_pagina (req,res,filtro,total_productos,filtro_p,filtro_f){
    const por_pagina=10;
    const usuario=req.session.usuario?true:false;  
    const TOTAL=total_productos.datos.map(elemento=>{
        const {TOTAL} =elemento
        return TOTAL
      })     
      const total_tienda=Math.ceil(TOTAL/por_pagina);   
       let prueba={
        datos:[]
       };    
       for(let i=1;i<=total_tienda;i++){
        let json={
            id:i,
            filtro_f:filtro_f,
            filtro_p:filtro_p
        }
        prueba.datos.push(json);
    }
    if(usuario){
        const id_usuario=req.session.usuario.id;
        const cantidad_productos_datos=await carrito.productos_carrito(id_usuario);
        
        const cantidad_productos_carrito=cantidad_productos_datos.datos.map(resultado=>resultado.PRODUCTOS_CARRITO)
      res.render('filtro',{
          filtro:filtro.datos,
          prueba:prueba.datos,
          usuario,
          CANTIDAD_PRODUCTOS_CARRITO:cantidad_productos_carrito
      })
    }else{
        res.render('filtro',{
            filtro:filtro.datos,
            prueba:prueba.datos,
            usuario,
        })
    }
}


const vistas_productos={
    plantillaProducto:async(req,res)=>{
        try{
            const nombre=req.params.nombre;
            const procesado=nombre.split("%20").join(" ");
            const usuario=req.session.usuario?true:false; 
            const resultado=await productos.buscar_nombre(procesado)
            if(usuario){
                const id_usuario=req.session.usuario.id;
                const cantidad_productos_datos=await carrito.productos_carrito(id_usuario);
                
                const cantidad_productos_carrito=cantidad_productos_datos.datos.map(resultado=>resultado.PRODUCTOS_CARRITO)

                res.render("producto",{
                    producto:resultado.datos,
                    usuario,
                    CANTIDAD_PRODUCTOS_CARRITO:cantidad_productos_carrito
                })
            }else{
                res.render("producto",{
                    producto:resultado.datos,
                    usuario,
                    
                })
            }
    
        //     const arr_img=resultado.datos.map(elemento=>{
        //         const {ARR_PT_IMG}=elemento
        //         return ARR_PT_IMG;
        //     })
        //    const arreglo=arr_img[0].split(',')
    
            
        }catch(err){
            console.log(err)
        }
    },
    filtro:async(req,res)=>{
        try{
            const filtro_p=req.params.filtro_p;
            const filtro_f=req.params.filtro_f;
            const pagina=req.query.pagina||1;
            const por_pagina=10;
            const ofset=(pagina-1)*10
            const data={por_p:por_pagina,o:ofset,param:filtro_p,param2:filtro_f};

            if(filtro_p==='Accesorio'){
                if(filtro_f==='Todos'){
                    const {filtro,total_productos}=await productos.buscar_todos_accesorio(data);
                    filtro_pagina(req,res,filtro,total_productos,filtro_p,filtro_f)
                }else{
                    const{filtro,total_productos}=await productos.buscar_accesorio(data);
                    filtro_pagina(req,res,filtro,total_productos,filtro_p,filtro_f)
                }
            }else if(filtro_p==='consola'){
                const{filtro,total_productos}=await productos.buscar_consola(data);
                filtro_pagina(req,res,filtro,total_productos,filtro_p,filtro_f)
            }else{
                if(filtro_f==='Todos'){
                    const {filtro,total_productos}=await productos.buscar_todos_videojuegos(data);
                    filtro_pagina(req,res,filtro,total_productos,filtro_p,filtro_f)
                }else if(filtro_f==='Xbox'||filtro_f==="Nintendo"||filtro_f==='Playstation'){
                    const{filtro,total_productos}=await productos.buscar_videojuegos_consola(data);
                    filtro_pagina(req,res,filtro,total_productos,filtro_p,filtro_f)
                }else{
                    const{filtro,total_productos}=await productos.buscar_videojuegos_genero(data)
                    filtro_pagina(req,res,filtro,total_productos,filtro_p,filtro_f)
                }
            }
        }catch(err){
            console.log(err);
            res.render('Error')
        }
    },
    buscador:async(req,res)=>{
        try{
            const parametro_busqueda=req.params.buscador;
            const usuario=req.session.usuario?true:false; 
            const resultado=await busqueda.busquedaSug(parametro_busqueda);
    
            if(usuario){
                const id_usuario=req.session.usuario.id;
                const cantidad_productos_datos=await carrito.productos_carrito(id_usuario);
                
                const cantidad_productos_carrito=cantidad_productos_datos.datos.map(resultado=>resultado.PRODUCTOS_CARRITO)
                res.render('Sugerencias',{
                    sugerencias:resultado.datos,
                    usuario,
                    CANTIDAD_PRODUCTOS_CARRITO:cantidad_productos_carrito
                })
            }else{
                res.render('Sugerencias',{
                    sugerencias:resultado.datos,
                    usuario
    
                })
            }
        }catch(err){
            console.log(err);
            res.render('Error');
        }
    },
    catalogo:async(req,res)=>{
        try{
            const pagina=req.query.pagina||1;
            const por_pagina=10;
            const ofset=(pagina-1)*10
            const usuario=req.session.usuario?true:false; 
            const data=[
                por_pagina,
                ofset
            ];
            const {paginas,total_productos}=await paginacion_productos.paginas_de_productos(data);
              const TOTAL=total_productos.datos.map(elemento=>{
                const {TOTAL} =elemento
                return TOTAL
              })
             const total_tienda=Math.ceil(TOTAL/por_pagina);
              const pag_pro=[];
              for(let i=1;i<=total_tienda;i++){
                pag_pro.push(i);
              }
              if(usuario){
                const id_usuario=req.session.usuario.id;
                const cantidad_productos_datos=await carrito.productos_carrito(id_usuario);
                
                const cantidad_productos_carrito=cantidad_productos_datos.datos.map(resultado=>resultado.PRODUCTOS_CARRITO)
                res.render('paginacion',{
                    paginas:paginas.datos,
                    pag_pro,
                    usuario,
                    CANTIDAD_PRODUCTOS_CARRITO:cantidad_productos_carrito
                })
              }else{
                  res.render('paginacion',{
                      paginas:paginas.datos,
                      pag_pro,
                      usuario
                  })
              } 
        }catch(err){
            console.log(err);
        }
    }
}

module.exports=vistas_productos