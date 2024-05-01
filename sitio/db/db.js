const { sql, sqlConn } = require("../config/conexion");
const { fecha } = require("../extras/fecha");
let date = fecha();

const objetoResultadoSQL = (resultado) => {
  if (resultado.recordsets.length > 1) {
    return { estatus: "OK", datos: resultado.recordsets };
  }

  if (!resultado.recordset) {
    return { estatus: "OK", datos: [] };
  }

  return { estatus: "OK", datos: resultado.recordset };
};

const cliente = {
  agregar: async (datos) => {
    try {
      let resultado = await sqlConn
        .request()
        .input("ACTIVO_CLI", sql.Bit, 1)
        .input("NOMBRE_CLI", sql.NVarChar, datos.nombreCompleto)
        .input("CORREO_CLI", sql.NVarChar, datos.correo)
        .input("CONTRASEÑA_CLI", sql.NVarChar, datos.contraseña)
        .input("DOBLE_AUT_CLI", sql.Bit, datos.dobleAut)
        .input("CODIGO_VERIF_CLI", sql.Int, datos.codigoV) //quite datos.codigo
        .input(`FECHA_ALTA_CLI`,sql.NVarChar,date)
        .input(`CIUDAD`,sql.NVarChar,datos.ciudad)
        .query(
          `INSERT INTO CLIENTE(ACTIVO_CLI,NOMBRE_CLI,CORREO_CLI,CONTRASEÑA_CLI,DOBLE_AUT_CLI,CODIGO_VERIF_CLI, FECHA_ALTA_CLI,CIUDAD) VALUES 
          (@ACTIVO_CLI,@NOMBRE_CLI,@CORREO_CLI,@CONTRASEÑA_CLI,@DOBLE_AUT_CLI,@CODIGO_VERIF_CLI ,@FECHA_ALTA_CLI,@CIUDAD)`
        );

      return objetoResultadoSQL(resultado);
    } catch (err) {
      throw err;
    }
  },
  actualizar: async (datos,id) => {
    try {
      let resultado = await sqlConn
        .request()
        .input("ID_CLI", sql.Int, id)
        .input(`NUEVO_NOMBRE`, sql.NVarChar, datos.nuevoNombre)
        .input(`NUEVO_CORREO`, sql.NVarChar, datos.nuevoCorreo)
        .input(`NUEVA_CONTRASEÑA`, sql.NVarChar, datos.nuevacontraseña)
        .query(
          `UPDATE CLIENTE SET NOMBRE_CLI=@NUEVO_NOMBRE,CORREO_CLI=@NUEVO_CORREO, CONTRASEÑA_CLI=@NUEVA_CONTRASEÑA WHERE ID_CLI=@ID_CLI`
        );

      return objetoResultadoSQL(resultado);
    } catch (err) {
      throw err;
    }
  },
  buscar: async (datos) => {
    try {
      let resultado = await sqlConn
        .request()
        .input("CORREO_CLI", sql.NVarChar, datos.correo)
        .query(`SELECT * FROM CLIENTE WHERE CORREO_CLI=@CORREO_CLI AND ACTIVO_CLI = 1`);

      return objetoResultadoSQL(resultado);
    } catch (err) {
      throw err;
    }
  },
  buscar_correo_contraseña: async (datos) => {
    try {
      let resultado = await sqlConn
        .request()
        .input("CORREO_CLI", sql.NVarChar, datos.correo)
        .input("CONTRASEÑA_CLI", sql.NVarChar, datos.contraseña)
        .query(`SELECT * FROM CLIENTE WHERE CORREO_CLI=@CORREO_CLI AND CONTRASEÑA_CLI = @CONTRASEÑA_CLI AND ACTIVO_CLI = 1`);

      return objetoResultadoSQL(resultado);
    } catch (err) {
      throw err;
    }
  }
  ,
  buscar_id:async(datos)=>{
    try{
      let resultado=await sqlConn.request()
      .input('ID_CLI',sql.Int,datos)
      .query('SELECT * FROM CLIENTE WHERE ID_CLI=@ID_CLI')

      return objetoResultadoSQL(resultado);
    }catch(err){
      throw err;
    }
  },

    buscarCorreo:async(datos)=>{
        try {
            const resultado=await sqlConn.request()
            .input('ACTIVO_CLI',sql.Bit,0)
            .input('NOMBRE_CLI',sql.NVarChar,datos.nombreCompleto)
            .input('CORREO_CLI',sql.NVarChar,datos.correo)
            .input('CONTRASEÑA_CLI',sql.NVarChar,datos.contraseña)
            .input('DOBLE_AUT_CLI',sql.Bit, datos.dobleAut)
            .input('CODIGO_VERIF_CLI',sql.Int, 0) //quite datos.codigo
            .input(`FECHA_ALTA_CLI`,sql.NVarChar,date)
            .query('EXEC BUSCAR_CORREO @ACTIVO_CLI, @NOMBRE_CLI, @CORREO_CLI, @CONTRASEÑA_CLI, @CODIGO_VERIF_CLI,@DOBLE_AUT_CLI ,@FECHA_ALTA_CLI');

            return objetoResultadoSQL(resultado);
        }catch(err){
            throw err;
        }
    },
    insertarCodigoV:async(datos)=>{
        try {
  
          const resultado = await sqlConn.request()
            .input('CORREO_CLI', sql.NVarChar, datos.correo)
            .input('CONTRASEÑA_CLI', sql.NVarChar, datos.contraseña)    
            .input('CODIGO_VERIF_CLI', sql.Int, datos.codigo)
            .query('EXEC INSERTAR_CODIGO_VERIF @CORREO_CLI, @CONTRASEÑA_CLI,  @CODIGO_VERIF_CLI');

            return objetoResultadoSQL(resultado);
          } catch (err) {
            throw err;
        }
    },
    eliminarCodigoV:async(datos)=>{
        try {
            const resultado = await sqlConn.request()
  
            .input('ID_CLI', sql.Int, datos.id)    
            .query('EXEC ELIM_CODIGO_VERIF @ID_CLI')

            return objetoResultadoSQL(resultado)
        } catch (err) {
            throw err;
        }
    },
    codigoRecuperacion: async(datos) =>{
      try {
        
        const resultado = await sqlConn.request()
  
        .input('CORREO_CLI', sql.NVarChar, datos.correo)
        .input('CODIGO_VERIF_CLI', sql.Int, datos.codigo)
        .query('EXEC VERIFICAR_CODIGO_REC @CORREO_CLI, @CODIGO_VERIF_CLI')
  
        return objetoResultadoSQL(resultado);
      } catch (err) {
        throw err;
      }
    },
  borrar:async(datos)=>{
        try{
            let resultado=await sqlConn.request()
            .input('ID_CLI',sql.Int,datos)
            .input('ACTIVO_CLI',sql.Bit,0)
            .query(`UPDATE CLIENTE SET ACTIVO_CLI=@ACTIVO_CLI WHERE ID_CLI=@ID_CLI`);

      return objetoResultadoSQL(resultado);
    } catch (err) {
      throw err;
    }
  },
};

const productos = {
  ultimos_diez_productos: async () => {
    try {
      let resultado = await sqlConn.request()
        .query(`SELECT TOP (10) * FROM PRODUCTOS WHERE ACT_PRO=1  ORDER BY ID_PRO DESC `);

      return objetoResultadoSQL(resultado);
    } catch (err) {
      console.log(`Error`, err);
    }
  },
  producto_activo:async(datos)=>{
    try{
      const resultado=await sqlConn.request()
      .input(`ID_PRO`,sql.Int,datos)
      .query(`SELECT ACT_PRO FROM PRODUCTOS WHERE ID_PRO=@ID_PRO`)

      return objetoResultadoSQL(resultado);
    }catch(err){
      console.log(`Error`,err)
    }
  },
  buscar_nombre:async(datos)=>{
    try{
      const resultado=await sqlConn.request()
      .input(`NOM_PRO`,sql.NVarChar,datos)
      .query(`SELECT * FROM PRODUCTOS WHERE NOM_PRO=@NOM_PRO`)

      return objetoResultadoSQL(resultado)
    }catch(err){

    }
  },
  cantidad_existencias_carrito:async(datos)=>{
    try {
      const resultado=await sqlConn.request()
      .input('ID_CLI', sql.Int, datos)
      .query(`SELECT PRODUCTOS.CANT_PRO AS CANTIDAD_EXISTENCIAS,CARRITO.CANT_PRO AS CANTIDAD_EN_CARRITO FROM 
      PRODUCTOS INNER JOIN CARRITO ON PRODUCTOS.ID_PRO=CARRITO.ID_PRO WHERE ID_CLI = @ID_CLI`);

      return objetoResultadoSQL(resultado)
    } catch (error) {
      throw error
    }
  },
  buscar_consola: async (datos) => {
    try {
      const resultado = await sqlConn.request()
        .input(`MARCA_PRO`, sql.NVarChar, datos.param2)
        .input("CONSOLA", sql.NVarChar, datos.param)
        .input(`OFSET`,sql.Int,datos.o)
        .input(`PROD_PAG`,sql.Int,datos.por_p)
        .query(
          `SELECT * FROM PRODUCTOS WHERE MARCA_PRO=@MARCA_PRO AND TIPO_PRO=@CONSOLA AND ACT_PRO=1  ORDER BY ID_PRO OFFSET @OFSET ROWS FETCH NEXT @PROD_PAG ROWS ONLY`
        );

        const total_productos = await sqlConn.request()
        .input(`ACT_PRO`, sql.Bit, 1)
        .input(`MARCA_PRO`, sql.NVarChar, datos.param2)
        .input(`CONSOLA`,sql.NVarChar,datos.param)
        .query(  `SELECT COUNT(ID_PRO) AS TOTAL FROM PRODUCTOS WHERE ACT_PRO=@ACT_PRO AND TIPO_PRO=@CONSOLA AND MARCA_PRO=@MARCA_PRO `);

      return {
        filtro:objetoResultadoSQL(resultado),
        total_productos:objetoResultadoSQL(total_productos)

      }
    } catch (err) {
      console.log("Error", err);
    }
  },
  buscar_accesorio: async (datos) => {
    try {
      const resultado = await sqlConn
        .request()
        .input(`MARCA_PRO`, sql.NVarChar, datos.param2)
        .input(`ACCESORIO`, sql.NVarChar, datos.param)
        .input(`OFSET`,sql.Int,datos.o)
        .input(`PROD_PAG`,sql.Int,datos.por_p)
        .query(
          `SELECT * FROM PRODUCTOS WHERE MARCA_PRO=@MARCA_PRO AND TIPO_PRO=@ACCESORIO AND ACT_PRO=1 ORDER BY ID_PRO OFFSET @OFSET ROWS FETCH NEXT @PROD_PAG ROWS ONLY`
        );

        const total_productos = await sqlConn
        .request()
        .input(`ACT_PRO`, sql.Bit, 1)
        .input(`MARCA_PRO`, sql.NVarChar, datos.param2)
        .input(`ACCESORIO`,sql.NVarChar,datos.param)
        .query(  `SELECT COUNT(ID_PRO) AS TOTAL FROM PRODUCTOS WHERE ACT_PRO=@ACT_PRO AND TIPO_PRO=@ACCESORIO AND MARCA_PRO=@MARCA_PRO `);

      return {
        filtro:objetoResultadoSQL(resultado),
        total_productos:objetoResultadoSQL(total_productos)

      }
    } catch (err) {
      console.log("Error", err);
    }
  },
  buscar_todos_accesorio: async (datos) => {
    try {
      const resultado = await sqlConn
        .request()
        .input(`ACCESORIO`, sql.NVarChar, datos.param)
        .input(`OFSET`,sql.Int,datos.o)
        .input(`PROD_PAG`,sql.Int,datos.por_p)
        .query(`SELECT * FROM PRODUCTOS WHERE TIPO_PRO=@ACCESORIO AND ACT_PRO=1  ORDER BY ID_PRO OFFSET @OFSET ROWS FETCH NEXT @PROD_PAG ROWS ONLY`);

        const total_productos = await sqlConn
        .request()
        .input(`ACT_PRO`, sql.Bit, 1)
        .input(`ACCESORIO`,sql.NVarChar,datos.param)
        .query(  `SELECT COUNT(ID_PRO) AS TOTAL FROM PRODUCTOS WHERE ACT_PRO=@ACT_PRO AND TIPO_PRO=@ACCESORIO `);

      return {
        filtro:objetoResultadoSQL(resultado),
        total_productos:objetoResultadoSQL(total_productos)

      }
    } catch (err) {
      console.log("Error", err);
    }
  },
  buscar_videojuegos_genero: async (datos) => {
    try {
      const resultado = await sqlConn
        .request()
        .input(`GEN_PRO`, sql.NVarChar, datos.param2)
        .input("VIDEOJUEGOS", sql.NVarChar, datos.param)
        .input(`OFSET`,sql.Int,datos.o)
        .input(`PROD_PAG`,sql.Int,datos.por_p)
        .query(`SELECT * FROM PRODUCTOS WHERE GEN_PRO=@GEN_PRO AND TIPO_PRO=@VIDEOJUEGOS AND ACT_PRO=1 ORDER BY ID_PRO OFFSET @OFSET ROWS FETCH NEXT @PROD_PAG ROWS ONLY `);

        const total_productos = await sqlConn
        .request()
        .input(`ACT_PRO`, sql.Bit, 1)
        .input(`GEN_PRO`,sql.NVarChar,datos.param2)
        .input("VIDEOJUEGOS", sql.NVarChar, datos.param)
        .query(  `SELECT COUNT(ID_PRO) AS TOTAL FROM PRODUCTOS WHERE ACT_PRO=@ACT_PRO AND GEN_PRO=@GEN_PRO AND TIPO_PRO=@VIDEOJUEGOS `);



      return {
        filtro:objetoResultadoSQL(resultado),
        total_productos:objetoResultadoSQL(total_productos)

      }
    } catch (err) {
      console.log("Error", err);
    }
  },
  buscar_videojuegos_consola: async (datos) => {
    try {
      let resultado = await sqlConn
        .request()
        .input("VIDEOJUEGOS", sql.NVarChar, datos.param)
        .input(`MARCA_PRO`, sql.NVarChar, datos.param2)
        .input(`OFSET`,sql.Int,datos.o)
        .input(`PROD_PAG`,sql.Int,datos.por_p)
        .query(`SELECT * FROM PRODUCTOS WHERE MARCA_PRO=@MARCA_PRO AND TIPO_PRO=@VIDEOJUEGOS AND ACT_PRO=1  ORDER BY ID_PRO OFFSET @OFSET ROWS FETCH NEXT @PROD_PAG ROWS ONLY`);

        const total_productos = await sqlConn
        .request()
        .input(`ACT_PRO`, sql.Bit, 1)
        .input(`VIDEOJUEGOS`,sql.NVarChar,datos.param)
        .input(`MARCA_PRO`, sql.NVarChar, datos.param2)
        .query(  `SELECT COUNT(ID_PRO) AS TOTAL FROM PRODUCTOS WHERE ACT_PRO=@ACT_PRO AND TIPO_PRO=@VIDEOJUEGOS AND MARCA_PRO=@MARCA_PRO`);

      return {
        filtro:objetoResultadoSQL(resultado),
        total_productos:objetoResultadoSQL(total_productos)

      }
    } catch (err) {
      console.log("Error", err);
    }
  },
  buscar_todos_videojuegos: async (datos) => {
    try {
      let resultado = await sqlConn
        .request()
        .input("VIDEOJUEGOS", sql.NVarChar, datos.param)
        .input(`OFSET`,sql.Int,datos.o)
        .input(`PROD_PAG`,sql.Int,datos.por_p)
        .query(`SELECT * FROM PRODUCTOS WHERE TIPO_PRO=@VIDEOJUEGOS AND ACT_PRO=1 ORDER BY ID_PRO OFFSET @OFSET ROWS FETCH NEXT @PROD_PAG ROWS ONLY`);

        const total_productos = await sqlConn
        .request()
        .input(`ACT_PRO`, sql.Bit, 1)
        .input(`VIDEOJUEGOS`,sql.NVarChar,datos.param)
        .query(  `SELECT COUNT(ID_PRO) AS TOTAL FROM PRODUCTOS WHERE ACT_PRO=@ACT_PRO AND TIPO_PRO=@VIDEOJUEGOS`);

      return {
        filtro:objetoResultadoSQL(resultado),
        total_productos:objetoResultadoSQL(total_productos)

      }
    } catch (err) {
      console.log("Error", err);
    }
  },
  cantidad_productos:async(datos)=>{
    try{
      const resultado=await sqlConn.request()
      .input(`ID_PRO`,sql.Int,datos)
      .query(`SELECT CANT_PRO FROM PRODUCTOS WHERE ID_PRO=@ID_PRO`)

      return objetoResultadoSQL(resultado)
    }catch(err){
      throw err
    }
  },
  producto_carrito_activo:async(datos)=>{
    try {
      const resultado=await sqlConn.request()
      .input('ID_CLI', sql.Int, datos)
      .query(`SELECT PRODUCTOS.ACT_PRO FROM PRODUCTOS INNER JOIN CARRITO ON CARRITO.ID_PRO=PRODUCTOS.ID_PRO WHERE ID_CLI = @ID_CLI`)

      return objetoResultadoSQL(resultado)
    } catch (err) {
      throw err;
    }
  },
  agregar_imagen: async(datos) => {
    try {
      const resultado = await sqlConn.request()
      .input('ID_PRO', sql.Int, datos.id)
      .input('PT_IMG', sql.NVarChar, datos.imagen)

      .query('UPDATE PRODUCTOS SET PT_IMG = @PT_IMG WHERE ID_PRO = @ID_PRO')
      return objetoResultadoSQL(resultado);
      
    } catch (error) {
      throw error;
    }
  },
  productoId:async(datos)=>{
    try {
      const resultado=await sqlConn.request()
      .input('ID_PRO',sql.Int,datos)
      .query('SELECT * FROM PRODUCTOS WHERE ID_PRO=@ID_PRO')

      return objetoResultadoSQL(resultado)
    } catch (error) {
      throw error
    }
  }
};

const pedidos = {
  agregar: async (datos) => {
    try {
        await sqlConn
        .request()
        .input(`PEDIDO_ID`,sql.Int,datos.pedido_id)
        .input(`PAGO_TOT`,sql.Decimal,datos.pago_tot)
        .input(`DIRECCION`,sql.NVarChar,datos.direccion)
        .input(`ESTADO`,sql.NVarChar,datos.estado)
        .input(`CIUDAD`,sql.NVarChar,datos.ciudad)
        .input(`COD_POSTAL`,sql.NVarChar,datos.codigo_postal)
        .input(`TELEFONO`,sql.NVarChar,datos.telefono)
        .input(`ID_CLI`,sql.Int,datos.id_cliente)
        .input(`FECHA_PED`,sql.NVarChar,date)
        .query(`EXEC AGREGAR_PEDIDOS @PEDIDO_ID,@PAGO_TOT,@DIRECCION,@ESTADO,@CIUDAD,@COD_POSTAL,@TELEFONO,@ID_CLI,@FECHA_PED`)
    } catch (err) {
      throw err;
    }
  },
  id_pedido:async()=>{
    try {
      const resultado=await sqlConn
      .request()
      .query(`SELECT MAX(ID_PED) AS ULTIMO_PED FROM PEDIDOS`)

      return objetoResultadoSQL(resultado)
    } catch (error) {
      throw error
    }
  },
  buscar: async (datos) => {
    try {
      let resultado = await sqlConn
        .request()
        .input("ID_PED", sql.NVarChar, datos.id_ped)
        .query(`SELECT * FROM PEDIDOS WHERE ID_PED=@ID_PED`);

      return objetoResultadoSQL(resultado);
    } catch (err) {
      throw err;
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
  },
  borrar: async (datos) => {
    try {
      let resultado = await sqlConn
        .request()
        .input("ID_PED", sql.Int, datos.id_ped)
        .input("ACT_PED", sql.Bit, 0)
        .query(`UPDATE PEDIDOS SET ACT_PED=@ACT_PED WHERE ID_PED=@ID_PED `);

        return objetoResultadoSQL(resultado)
    } catch (err) {
      throw err;
    }
  },
};

const busqueda = {
  busquedaPro: async (datos) => {
    try {
      const resultado = await sqlConn
        .request()
        .input("BUSQUEDA", sql.NVarChar, datos.busqueda)
        .query(
          `SELECT TOP(5) NOM_PRO AS BUSQUEDA FROM PRODUCTOS WHERE NOM_PRO LIKE '%'+@BUSQUEDA+'%'`
        );

      return objetoResultadoSQL(resultado);
    } catch (err) {
      throw err;
    }
  },
  busquedaSug: async (datos) => {
    try {
      const resultado = await sqlConn
        .request()
        .input("BUSQUEDA", sql.NVarChar, datos)
        .query(`SELECT * FROM PRODUCTOS WHERE NOM_PRO LIKE '%'+@BUSQUEDA+'%'`);

      return objetoResultadoSQL(resultado);
    } catch (err) {
      throw err;
    }
  },
};

const carrito = {
  agregar: async (datos) => {
    try {
      const resultado=await sqlConn
        .request()
        .input(`ID_PRO`, sql.Int, datos.id_pro)
        .input(`ID_CLI`, sql.Int, datos.id_usuario)
        .query(`EXEC BUSCAR_PRODUCTO @ID_CLI,@ID_PRO`);
      return objetoResultadoSQL(resultado)
        
    } catch (err) {
      throw err;
    }
  },
  pago_total:async(datos)=>{
    try {
      const resultado=await sqlConn
      .request()
      .input(`ID_CLI`,sql.Int,datos)
      .query(`SELECT SUM(PAGO_TOT*CANT_PRO) AS PAGO_TOT_CARRITO   FROM CARRITO WHERE ID_CLI=@ID_CLI`)

      return objetoResultadoSQL(resultado)
    } catch (error) {
        throw error;
    }
  },
  todos: async (datos) => {
    try {
      const resultado = await sqlConn
        .request()
        .input(`ID_CLI`, sql.Int, datos)
        .query(`EXEC ACTUALIZAR_CARRITO @ID_CLI`);

      return objetoResultadoSQL(resultado);
    } catch (err) {
      throw err;
    }
  },
  carrito_personal: async (datos) => {
    try {
      const resultado = await sqlConn
        .request()
        .input(`ID_CLI`, sql.Int, datos)
        .query(`SELECT * FROM CARRITO WHERE ID_CLI=@ID_CLI`);

      return objetoResultadoSQL(resultado);
    } catch (err) {
      throw err;
    }
  },
  eliminar: async (datos) => {
    try {
      const resultado = await sqlConn
        .request()
        .input(`ID_PRO`, sql.Int, datos.id_pro)
        .input(`ID_CLI`, sql.Int, datos.id)
        .query(`DELETE FROM CARRITO WHERE ID_PRO=@ID_PRO AND ID_CLI=@ID_CLI`);

      return objetoResultadoSQL(resultado);
    } catch (err) {
      throw err;
    }
  },
  cantidad_de_productos_carrito: async () => {
    try {
      const resultado = await sqlConn
        .request()
        .input(`ID_CLI`, sql.Int, 1)
        .query(`SELECT SUM(CANT_PRO) FROM CARRITO WHERE ID_CLI=@ID_CLI`);

      return objetoResultadoSQL(resultado);
    } catch (err) {
      throw err;
    }
  },
  agregar_plantilla:async(datos)=>{
    try{
      const resultado=await sqlConn
      .request()
      .input(`ID_CLI`,sql.Int,datos.id_usuario)
      .input(`ID_PRO`,sql.Int,datos.id_pro)
      .input(`CANT_PRO`,sql.Int,datos.cantidad)
      .query( `EXEC BUSCAR_PRODUCTO_PLANTILLA @ID_CLI,@ID_PRO,@CANT_PRO`)

      return objetoResultadoSQL(resultado);
    }catch(err){
      throw err;
    }
  },
  productos_carrito:async(datos)=>{
    try {
      const resultado=await sqlConn.request()
      .input(`ID_CLI`,sql.Int,datos)
      .query(`SELECT SUM(CANT_PRO) AS PRODUCTOS_CARRITO FROM CARRITO WHERE ID_CLI=@ID_CLI`)

      return objetoResultadoSQL(resultado)
    } catch (error) {
      throw error;
    }
  }
};

const paginacion_productos = {
  paginas_de_productos: async (data) => {
    try {
      const paginas = await sqlConn
        .request()
        .input(`OFSET`, sql.Int, data[1])
        .input(`PROD_PAG`, sql.Int, data[0])
        .query(
          `SELECT * FROM PRODUCTOS ORDER BY ID_PRO OFFSET @OFSET ROWS FETCH NEXT @PROD_PAG ROWS ONLY`
        );

      const total_productos = await sqlConn
        .request()
        .input(`ACT_PRO`, sql.Bit, 1)
        .query(
          `SELECT COUNT(ID_PRO) AS TOTAL FROM PRODUCTOS WHERE ACT_PRO=@ACT_PRO`
        );

      return {
        paginas: objetoResultadoSQL(paginas),
        total_productos: objetoResultadoSQL(total_productos),
      };
    } catch (err) {
      throw err;
    }
  },
};

const doble_aut={

  activar:async(data)=>{
    try{
      await sqlConn.request()
    .input(`DOBLE_AUT_CLI`,  sql.Bit,1)
    .input(`ID_CLI`,sql.Int,data.id)
    .query(`UPDATE CLIENTE SET DOBLE_AUT_CLI=@DOBLE_AUT_CLI WHERE ID_CLI=@ID_CLI`)

    }catch(err){
      throw err;
    }
  },

  desactivar:async(data)=>{
    try{
      await sqlConn.request()
      .input(`DOBLE_AUT_CLI`,sql.Bit,0)
      .input(`ID_CLI`,sql.Int,data.id)
      .query(`UPDATE CLIENTE SET DOBLE_AUT_CLI=@DOBLE_AUT_CLI WHERE ID_CLI=@ID_CLI`)
    }catch(err){
      throw err;
    }
  }
}

module.exports = {
  cliente,
  productos,
  pedidos,
  busqueda,
  carrito,
  paginacion_productos,
  doble_aut
};
