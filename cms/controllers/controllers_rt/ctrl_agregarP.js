const { Decimal, Numeric } = require('mssql');
const {producto} = require('../../db/db');
const imagenes = require('../../../sitio/controllers/controllers_rt/ctrl_imagenes');

const nuevop = {
    rtAgregarP: async(req, res) =>{
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



    eliminar_pro:async(req,res)=>{
        try{
            const id_pro=req.params.id_pro;
            console.log(id_pro);

            await producto.borrar(id_pro)
            return res.json({message:`MENSAJE ${id_pro} ELIMINADO`});
        }catch(error){
            console.log(error)
            return res.json({message:`ERROR AL ELIMINAR`});
         
        }
    },

    actualizar_datos_producto:async(req,res)=>{
        try {
            const{nombre_producto,descripcion_pro,nom_pro}=req.body;
            if(nombre_producto===''||descripcion_pro===''){
                return res.json({estatus:'ERR',message:'TIENES QUE LLENAR TODOS LOS DATOS O DEAJARLOS POR DEFECTO'});
            }else{
                const data={
                    nombre_producto,descripcion_pro,nom_pro
                }
                
                await producto.actualizar_datos_pro(data)
                return res.json({estatus:'OK',message:'MENSAJE ACTUALIZADO CORRECTAMENTE'});

            }


        } catch (error) {
            console.log(error);
            return res.json({estatus:'ERR',message:`ERROR AL ACTUALIZAR`})
        }
    },
    imagen:async(req,res)=>{
        try {
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
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = nuevop