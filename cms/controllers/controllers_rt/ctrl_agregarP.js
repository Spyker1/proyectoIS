const { Decimal, Numeric } = require('mssql');
const {producto} = require('../../db/db');

const nuevop = {
    rtAgregarP: async(req, res) =>{
        try {
            const body = req.body;
            const {cantidad, precio, nombreProducto, des, color, marca, genero, tipo} = body;

            const data = {
                cant_producto: cantidad,
                precio_pro: precio,
                nombre_producto: nombreProducto,
                descripcion: des,
                color: color,
                marca: marca,
                genero: genero,
                tipo_pro: tipo
            }
            if(nombreProducto.length<=0||cantidad<=0||precio.length<=0||des.length<=0||marca.length<=0||tipo.length<=0){
                let campos=(nombre_producto,cant_producto,precio_pro,descripcion,marca,tipo_pro)=>{
                    let texto='';
                    if(nombre_producto.length<=0){texto=texto.concat("<br>Nombre")}
                    if(cant_producto.length<=0){texto=texto.concat("<br>Cantidad")}
                    if(precio_pro.length<=0){texto=texto.concat("<br>Precio")}
                    if(descripcion.length<=0){texto=texto.concat("<br>Descripcion")}
                    if(marca.length<=0){texto=texto.concat("<br>Marca")}
                    if(tipo_pro.length<=0){texto=texto.concat("<br>Tipo")}
                    return texto
                }
                return res.json({estatus:3,message:`${campos(nombreProducto,cantidad,precio,des,marca,tipo)}`})
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
                    return res.json({estatus: 2, message: 'Este producto ya esta registrado.'})
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
            return res.json({message:`PRODUCTO ${id_pro} ELIMINADO`});
        }catch(error){
            console.log(error)
            return res.json({message:`ERROR AL ELIMINAR`});
         
        }
    },

    actualizar_datos_producto:async(req,res)=>{
        try {
            const{nombre_producto,descripcion_pro,precio_pro,color_pro,nom_pro}=req.body;
            if(nombre_producto===''||descripcion_pro===''||precio_pro===''||color_pro===''){
                return res.json({estatus:'ERR',message:'TIENES QUE LLENAR TODOS LOS DATOS O DEAJARLOS POR DEFECTO'});
            }else{
                const data={
                    nombre_producto,descripcion_pro,precio_pro,color_pro,nom_pro
                }
                
                await producto.actualizar_datos_pro(data)
                return res.json({estatus:'OK',message:'PRODUCTO ACTUALIZADO CORRECTAMENTE'});

            }


        } catch (error) {
            console.log(error);
            return res.json({estatus:'ERR',message:`ERROR AL ACTUALIZAR`})
        }
    },

    rt_agregar_cant_pro:async(req,res)=>{
        try {
            const agregar_cant_pro=req.params.inp_agregar_cant;
            console.log(agregar_cant_pro)
            console.log('1')
        } catch (error) {
            console.log(error)
            return res.json({message:`ERROR AL AGREGAR CANTIDAD`})
        }
    }
}

module.exports = nuevop