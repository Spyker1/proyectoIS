const fs = require('fs');
const path = require('path');
const nombreArchivo = require('../../extras/nombre_img');
const { productos } = require('../../db/db');

const imagenes ={
    agregar: (req,res)=>{
        try{
            const folderID=req.params.id_pro;
            
            const folderPath= path.join('Productos',folderID);

            if(!fs.existsSync(folderPath)){
                fs.mkdirSync(folderPath,{recursive:true})
            }
            const uploadFile=req.files.images;
            
            var name = '';
            let check = true;
            let i = 1;
            while (check) {
                if(!fs.existsSync(path.join(folderPath, folderID, folderID,'-',String(i)))){
                    check = false;
                    name = String(req.params.id_pro+'-'+i);
                }
                i++    
            }

            console.log(req.files)
            uploadFile.mv(path.join(folderPath, name=name.concat(nombreArchivo(uploadFile.name))),(err)=>{
                if(err){
                    return res.status(500).send(err);
                }

                console.log(uploadFile.data)
                productos.agregar_imagen({id: folderID, imagen: name})
                return res.json({estatus: 'OK', message:'Imagen cargada con exito'})
            })  
        }catch(err){
            console.log(err);
        }
    },
    cms:async(req,res)=>{
        try {
            const body = req.body;
            const {nombreProducto, des} = body;

            const data = {
                nombre_producto: nombreProducto,
                descripcion: des,
                
            }
            if(nombreProducto.length<=0||des.length<=0){
                let campos=(nombre_producto,descripcion)=>{
                    let texto='';
                    if(nombre_producto.length<=0){texto=texto.concat("<br>Nombre")}
                    if(descripcion.length<=0){texto=texto.concat("<br>Descripcion")}
                    return texto
                }
                return res.json({estatus:3,message:`${campos(nombreProducto,des)}`})
            }else{
                const antiRepeticion = await producto.buscar_nom(nombreProducto)
                // console.log (antiRepeticion)
                if(!antiRepeticion.datos.length){
                   producto.agregar_producto(
                         data);
                         const id_pro= await producto.id_pro()
                         const resultado=id_pro.datos.map(resultado=>resultado.ID_PRO)
                         
                        return res.json({id_pro:resultado[0]})
                    // return res.json({estatus: 'OK', message: 'Producto agregado correctamente'})
                }
                else{
                    return res.json({estatus: 2, message: 'Este Mensaje ya esta puesto.'})
                } 
            }
        } catch (error) {
            console.log('Catch en rtAgregarP')
            console.log(error)
            return res.json({estatus: 'ERR', message: 'ERROR'})
        }
    },
    }


module.exports = imagenes;