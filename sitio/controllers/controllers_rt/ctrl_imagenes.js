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
    }
}

module.exports = imagenes;