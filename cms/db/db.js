const {sql,sqlConn} =require('../config/conexion');
const { fecha } = require("../extras/fecha");
let date=fecha();



const objetoResultadoSQL = (resultado) => {
    if (resultado.recordsets.length > 1) {
      return { estatus: "OK", datos: resultado.recordsets };
    }
  
    if (!resultado.recordset) {
      return { estatus: "OK", datos: [] };
    }
  
    return { estatus: "OK", datos: resultado.recordset };
  };


const usuario={
    todos_usuario:async(datos) => {
        try{
            const resultado=await sqlConn.request()
            .input(`ID_US`,sql.Int,datos.id)
            .input(`OFfSET`, sql.Int, datos.ofset)
            .input(`POR_PAG`, sql.Int, datos.por_pagina)
            .query(`SELECT * FROM  USUARIO  WHERE NOT ID_US=@ID_US ORDER BY ID_US OFFSET @OFFSET ROWS  FETCH NEXT @POR_PAG ROWS ONLY`)

            const total_productos = await sqlConn
            .request()
            .query(
              `SELECT COUNT(ID_US) AS TOTAL FROM USUARIO`
            );

            return{
                resultado:objetoResultadoSQL(resultado),
                total_productos: objetoResultadoSQL(total_productos), 
            } 
        }catch(err){
            console.log(err)
        }
    },
    puesto: async(datos) => {
        try {
            const resultado = await sqlConn.request()

            .input('ID_US', sql.Int, datos.id)
            .query('SELECT PUESTO FROM USUARIO WHERE ID_US=@ID_US')
        
            return objetoResultadoSQL(resultado);
        } catch (err) {
            throw err
        }
    },
    encontrar_usuario: async(datos) => {
        try{
            const resultado=await sqlConn.request()

            .input('CORREO_US', sql.NVarChar, datos.correo)
            .input('PUESTO', sql.NVarChar, datos.rol)
            .input(`CONTRASEÑA_US`,sql.NVarChar,datos.contraseña)
            .query(`SELECT * FROM USUARIO WHERE CORREO_US=@CORREO_US AND PUESTO=@PUESTO`)

            return objetoResultadoSQL(resultado);
            
        }catch(err){
            console.log(err)
        }
    },
    contraseña_correo_us:async(datos)=>{
        try {
            const resultado=await sqlConn.request()
            .input('CORREO_US', sql.NVarChar, datos.correo)
            .input(`CONTRASEÑA_US`,sql.NVarChar,datos.contraseña)
            .query(`SELECT * FROM USUARIO WHERE CORREO_US=@CORREO_US AND CONTRASEÑA_US=@CONTRASEÑA_US`)

            return objetoResultadoSQL(resultado);
        } catch (error) {
            
        }
    },
    encontrar_con_id: async(datos) => {
        try{
            const resultado=await sqlConn.request()

            .input('ID_US', sql.NVarChar, datos.correo)
            .input('PUESTO', sql.NVarChar, datos.rol)
            .query(`SELECT * FROM USUARIO WHERE ID_US=@ID_US`)

            return objetoResultadoSQL(resultado);
            
        }catch(err){
            console.log(err)
        }
    },

    nuevo_usuario: async(datos) =>{
        try {
            const resultado = await sqlConn.request()

            .input('CORREO_US', sql.NVarChar, datos.correo)
            .input('CONTRASEÑA_US', sql.NVarChar, datos.contraseña)
            .input('ACTIVO_US', sql.Bit, 1)
            .input('PUESTO', sql.NVarChar, datos.puesto)
            .input('DIRECCION',sql.NVarChar,datos.direccion)
            .input('TELEFONO',sql.NVarChar,datos.telefono)
            .input('RFC',sql.NVarChar,datos.rfc)
            .input('NOMBRE_US', sql.NVarChar, datos.nombre)
            .input('FECHA_ALTA_US',sql.NVarChar,date)
            .query('EXEC CONTRASEÑA @FECHA_ALTA_US, @CORREO_US ,@CONTRASEÑA_US, @ACTIVO_US, @PUESTO,@DIRECCION,@TELEFONO,@RFC, @NOMBRE_US')

            return objetoResultadoSQL(resultado)
        
        } catch (err) {

            console.log(err)
        
        }
    },

    eliminar: async(datos) => { 
        try {
            const resultado = await sqlConn.request()

            .input('ID_US', sql.Int, datos.id)
            .query('UPDATE USUARIO SET ACTIVO_US = 0 WHERE ID_US=@ID_US')

            return objetoResultadoSQL(resultado)
        
        } catch (err) {

            console.log(err)
        
        }
    },

    actualizar: async(datos) => {
        try {
            const resultado = await sqlConn.request()

            .input('ID_US', sql.Int, datos.id)
            .input('PUESTO', sql.NVarChar, datos.puesto)
            .query('UPDATE USUARIO SET PUESTO=@PUESTO WHERE ID_US = @ID_US')
            return objetoResultadoSQL(resultado)
        } catch(err){

            throw err;
        }
    },
    datos_us:async(datos)=>{
        try{
            const resultado=await sqlConn.request()
            .input(`ID_US`,sql.Int,datos)
            .query(`SELECT PUESTO,CORREO_US,ID_US FROM USUARIO WHERE ID_US=@ID_US`)

            return objetoResultadoSQL(resultado);
        }catch(err){
            throw err
        }
        


    },
    actualizar_correo_us:async(datos)=>{
        try {
            await sqlConn.request()
            .input(`ID_US`,sql.Int,datos.id)
            .input('CORREO_US',sql.NVarChar,datos.correo_nuevo)
            .query(`UPDATE USUARIO SET CORREO_US=@CORREO_US WHERE ID_US=@ID_US`);
        } catch (error) {
            throw error;
        }
    },
    buscar_datos_us:async(datos)=>{
        try {
            const resultado=await sqlConn.request()
            .input(`ID_US`,sql.Int,datos)
            .query(`SELECT * FROM USUARIO WHERE ID_US=@ID_US`)

            return objetoResultadoSQL(resultado)
        } catch (error) {
            throw error
        }
    },
    codigo_recuperacion: async(datos) => {
        try {
            const resultado = await sqlConn.request()
            .input('CORREO_US', sql.NVarChar, datos.correo)
            .input('CODIGO_US', sql.Int, datos.codigo)
            .query('EXEC VERIFICAR_CODIGO_REC_US @CORREO_US, @CODIGO_US');

            return objetoResultadoSQL(resultado);
        } catch (error) {
            throw error;
        }
    },
    encontrar_con_correo: async(datos) => {
        try {
            const resultado = await sqlConn.request()
            .input('CORREO_US', sql.NVarChar, datos.correo)
            .query('SELECT * FROM USUARIO WHERE CORREO_US = @CORREO_US');

            return objetoResultadoSQL(resultado);
        } catch (error) {
            throw error;
        }
    },
    insertar_codigo_rec: async(datos) => {
        try {
            const resultado = await sqlConn.request()
            .input('CORREO_US', sql.NVarChar, datos.correo)
            .input('CODIGO_US', sql.Int, datos.codigo)
            .query('EXEC INSERTAR_CODIGO @CORREO_US, @CODIGO_US')

            return objetoResultadoSQL(resultado)
        } catch (error) {
            throw error;
        }
    }
}

const cliente={
    todos_clientes:async(datos)=>{
        try{
            const resultado=await sqlConn.request()
            .input(`OFfSET`, sql.Int, datos.ofset)
            .input(`POR_PAG`, sql.Int, datos.por_pagina)
            .input(`CIUDAD`,sql.NVarChar,datos.ciudad)
            .query(`SELECT CIUDAD,NOMBRE_CLI,FORMAT(FECHA_ALTA_CLI,'dd/MM/yy hh:mm:ss') AS FECHA_ALTA_CLI,ACTIVO_CLI,CORREO_CLI FROM CLIENTE WHERE CIUDAD=@CIUDAD
            ORDER BY ID_CLI OFFSET @OFFSET ROWS  FETCH NEXT @POR_PAG ROWS ONLY `)

            const total_productos = await sqlConn
            .request()
            .query(
              `SELECT COUNT(ID_CLI) AS TOTAL FROM CLIENTE`
            );
            
            return {
                resultado:objetoResultadoSQL(resultado),
                total_productos: objetoResultadoSQL(total_productos),    
            }
        }catch(err){
            console.log(err);
        }
    }
}

const producto={
    todos_productos:async(data)=>{
        try{
            const resultado= await sqlConn
            .request()
            .input(`OFSET`, sql.Int, data.ofset)
            .input(`PROD_PAG`, sql.Int, data.por_pagina)
            .query(`SELECT * FROM PRODUCTOS ORDER BY ID_PRO OFFSET @OFSET ROWS FETCH NEXT @PROD_PAG ROWS ONLY`)

            const total_productos = await sqlConn
        .request()
        .query(
          `SELECT COUNT(ID_PRO) AS TOTAL FROM PRODUCTOS`
        );

            return {
                resultado:objetoResultadoSQL(resultado),
                total_productos: objetoResultadoSQL(total_productos),    
            }
        }catch(err){
            console.log(err);
        }
    },
    top10: async() =>{
        try {
            const resultado = await sqlConn.request()
            .query(`SELECT TOP (10) ID_PRO, SUM(CANTIDAD_PRO)AS CantidadLista FROM DETALLES_PEDIDOS GROUP BY ID_PRO ORDER BY CantidadLista DESC`)
             
            return objetoResultadoSQL(resultado);
        } catch (error) {
            console.log(error)
        }
    },
    agregar_producto:async(datos)=>{
        try{
            const resultado=await sqlConn.request()
            .input(`NOM_PRO`,sql.NVarChar,datos.nombre_producto)
            .input(`FECHA_ALTA_PRO`,sql.DateTime,date)
            .input(`CANT_PRO`,sql.Int,datos.cant_producto)
            .input(`DESC_PRO`,sql.NVarChar,datos.descripcion)
            .input(`PRECIO_PRO`,sql.Int,datos.precio_pro)
            .input(`COLOR_PRO`,sql.NVarChar,datos.color)
            .input(`MARCA_PRO`,sql.NVarChar,datos.marca)
            .input(`ACT_PRO`,sql.Bit,1)
            .input(`GEN_PRO`,sql.NVarChar,datos.genero)
            .input(`PT_IMG`,sql.NVarChar,datos.ubicacion_imagen)
            .input(`TIPO_PRO`,sql.NVarChar,datos.tipo_pro)
            .query(`INSERT INTO PRODUCTOS(NOM_PRO,FECHA_ALTA_PRO,CANT_PRO,DESC_PRO,PRECIO_PRO,COLOR_PRO,MARCA_PRO,ACT_PRO,GEN_PRO,PT_IMG,
                TIPO_PRO) VALUES(@NOM_PRO,@FECHA_ALTA_PRO,@CANT_PRO,@DESC_PRO,@PRECIO_PRO,@COLOR_PRO,@MARCA_PRO,@ACT_PRO,@GEN_PRO,@PT_IMG,
                @TIPO_PRO)`)

                return objetoResultadoSQL(resultado);
        }catch(err){
            console.log(err);
        }
    },
    actualizar:async(datos)=>{
        try{
            let resultado=await sqlConn.request()
            .input('NUE_NOM_PRO',sql.NVarChar,datos.nombre_producto)
            .input('NUE_CANT_PRO',sql.NVarChar,datos.nuevo_cantidad)
            .input(`NUE_DESC_PRO`,sql.NVarChar,datos.nuevo_descripcion)
            .input('NUE_PRECIO_PRO',sql.Int,datos.nuevo_precio)
            .input('NUE_COLOR_PRO',sql.NVarChar,datos.nuevo_color)
            .input('NUE_MARCA_PRO',sql.NVarChar,datos.nuevo_marca)
            .input(`NUE_GEN_PRO`,sql.NVarChar,datos.nuevo_genero)
            .input(`NUE_TIPO_PRO`,sql.NVarChar,datos.nuevo_tipo_pro)
            .query(`UPDATE PRODUCTOS SET NOMBRE_PRO=@,CANT_PRO=@CANT_PRO,@DESC_PRO=@DESC_PRO,PRECIO_PRO=@PRECIO_PRO,COLOR_PRO=@COLOR_PRO,
            MARCA_PRO=@MARCA_PRO,GEN_PRO=@GEN_PRO,TIPO_PRO=@TIPO_PRO WHERE 
            `)

            return objetoResultadoSQL(resultado);
        }catch(err){
            throw err;
        }
    },
    id_pro:async()=>{
        try {
            const resultado=await sqlConn.request()
            .query('SELECT MAX(ID_PRO) AS ID_PRO FROM PRODUCTOS')

            return objetoResultadoSQL(resultado)
        } catch (error) {
            throw error
        }
    },
    nuevac:async(datos)=>{
        try{
            let resultado=await sqlConn.request()
            .input('NUECANT_PRO',sql.NVarChar,datos.cant)
            .input('ID_PRO', sql.Int, datos.id)
            .query(`UPDATE PRODUCTOS SET CANT_PRO=@NUECANT_PRO + CANT_PRO,ACT_PRO=1 WHERE ID_PRO = @ID_PRO `)

            return objetoResultadoSQL(resultado);
        }catch(err){
            throw err;
        }
    },
    borrar:async(datos)=>{
        try{
            await sqlConn.request()
            .input('ID_PRO',sql.Int,datos)
            .input('ACT_PRO',sql.Bit,0)
            .query('UPDATE PRODUCTOS SET ACT_PRO=@ACT_PRO WHERE ID_PRO=@ID_PRO')
        }catch(err){
            throw err;
        }
    },
    buscar:async(datos)=>{
        try{
            let resultado=await sqlConn.request()
            .input('NOM_PRO',sql.NVarChar,datos.nombre_producto)
            .query(`SELECT NOM_PRO AS BUSQUEDA FROM PRODUCTOS WHERE NOM_PRO LIKE '%'+@NOM_PRO+'%'`)
            return objetoResultadoSQL(resultado);
        }catch(err){
            throw err;
        }
    },
    buscar_nom:async(datos)=>{
        try {
            const resultado=await sqlConn.request()
            .input(`NOM_PRO`,sql.NVarChar,datos)
            .query(`SELECT * FROM PRODUCTOS WHERE NOM_PRO=@NOM_PRO`)
            return objetoResultadoSQL(resultado)
        } catch (error) {
            throw error;
        }
    },
    actualizar_datos_pro:async(datos)=>{
        try {
            await sqlConn.request()
            .input(`NUEV_NOM_PRO`,sql.NVarChar,datos.nombre_producto)
            .input(`NUEV_DESC_PRO`,sql.NVarChar,datos.descripcion_pro)
            .input(`NUEV_PREC_PRO`,sql.NVarChar,datos.precio_pro)
            .input(`NUEV_COLOR_PRO`,sql.NVarChar,datos.color_pro)
            .input(`NOM_PRO`,sql.NVarChar,datos.nom_pro)
            .query(`UPDATE PRODUCTOS SET NOM_PRO=@NUEV_NOM_PRO,DESC_PRO=@NUEV_DESC_PRO,PRECIO_PRO=@NUEV_PREC_PRO,COLOR_PRO=@NUEV_COLOR_PRO
            WHERE NOM_PRO=@NOM_PRO
            `)
        } catch (error) {
            throw error;
        }
    }
    
}

const pedido ={
    mostrar_todos: async(data)=> {
        try {
            
            let resultado = await sqlConn.request()
            .input(`OFSET`, sql.Int, data.ofset)
            .input(`PROD_PAG`, sql.Int, data.por_pagina)
            .query(`(SELECT DISTINCT PEDIDOS.ID_PED,CLIENTE.NOMBRE_CLI,CLIENTE.CORREO_CLI,
            FORMAT(PEDIDOS.FECHA_PED,'dd/MM/yy hh:mm:ss ') AS FECHA_PED,
            PEDIDOS.PAGO_TOT FROM PEDIDOS INNER JOIN DETALLES_PEDIDOS ON PEDIDOS.ID_PED=DETALLES_PEDIDOS.PEDIDO_ID 
            INNER JOIN CLIENTE ON PEDIDOS.CLIENTE_ID=CLIENTE.ID_CLI)ORDER BY PEDIDOS.ID_PED OFFSET 1 ROWS FETCH NEXT 10 ROWS ONLY`)
            
            const total_productos = await sqlConn
        .request()
        .query(
          `SELECT COUNT(ID_PED) AS TOTAL FROM PEDIDOS`
        );

            return {
                resultado:objetoResultadoSQL(resultado),
                total_productos: objetoResultadoSQL(total_productos),
      
            }
        } catch (err) {
            throw err
        }
    },
    pedido_hecho:async(datos)=>{
        try {
          const resultado=await sqlConn
          .request()
          .input(`ID_PED`,sql.Int,datos)
          .query(`EXEC PEDIDO_HECHO @ID_PED`);
        
          return objetoResultadoSQL(resultado)
        } catch (error) {
          throw error
        }
          }
    
}

const detalles_pedidos ={
    mostrar_todos: async(datos)=> {
        try {
            
            let resultado = await sqlConn.request()
            .input(`ID_PED`,sql.Int,datos)
            .query('EXEC DETALLES_PEDIDO @ID_PED');
            return objetoResultadoSQL(resultado)
        } catch (err) {
            throw err
        }
    },
}

const graficas_db={
    productosVendidos:async()=>{
        try {
            const resultado=await sqlConn.request()
            .query(`SELECT TOP (10) PRODUCTOS.NOM_PRO, SUM(CANTIDAD_PRO)AS CantidadLista     
            FROM DETALLES_PEDIDOS INNER JOIN PRODUCTOS ON DETALLES_PEDIDOS.ID_PRO=PRODUCTOS.ID_PRO 
            GROUP BY PRODUCTOS.NOM_PRO 
            ORDER BY CantidadLista DESC`)

            return objetoResultadoSQL(resultado)
        } catch (error) {
            throw error;
        }
    },
    pedidosHechos_año:async()=>{
        try {
            const resultado=await sqlConn.request()
            .input(`FECHA`,sql.DateTime,date)
            .query(`EXEC CICLO_AÑO @FECHA`)

            return objetoResultadoSQL(resultado)
        } catch (error) {
            throw error;
        }
    },
    pedido_hecho_dia:async()=>{
        try {
            const resultado=await sqlConn.request()
            .input(`FECHA`,sql.DateTime,date)
            .query(`EXEC CICLO @FECHA`)

            return objetoResultadoSQL(resultado)
        } catch (error) {
            throw error
        }
    },
    ventasTotales_año:async()=>{
        try {
            const resultado=await sqlConn.request()
            .input(`FECHA`,sql.DateTime,date)
            .query(`EXEC CICLO_AÑO @FECHA`)

            return objetoResultadoSQL(resultado)
        } catch (error) {
            throw error;
        }
    },
    pedidosHechosMes:async()=>{
        try {
            const resultado=await sqlConn.request()
            .input(`FECHA`,sql.DateTime,date)
            .query(`EXEC CICLO_MES @FECHA`)

            return objetoResultadoSQL(resultado)
        } catch (error) {
            throw error;
        }
    }
}

module.exports={
    usuario,
    cliente,
    producto,
    pedido,
    detalles_pedidos,
    graficas_db
}