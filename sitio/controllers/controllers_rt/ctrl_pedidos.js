const { pedidos, carrito, productos } = require("../../db/db");
const correos = require("../../extras/correos");
const formatoNumeros = require("../../extras/formato_precios");


const envios_hechos = {
  rtAgregarEnvio: async (req, res) => {
    try {
      const id_usuario = req.session.usuario.id;
      const body = req.body;
      const {direccion, estado, ciudad, codigo_postal, telefono }=body;
      const resultado = await carrito.carrito_personal(id_usuario);
      const ultimo_ped=await pedidos.id_pedido();
      let ultimo_pedido_antes=ultimo_ped.datos.map(elemento=>{
        const{ULTIMO_PED}=elemento;
        return ULTIMO_PED;
      })
      
      let ultimo_ped2=ultimo_pedido_antes[0]===null?0:ultimo_pedido_antes[0];
      const pedido_id=ultimo_ped2+1;
      const pago_total_usuario=await carrito.pago_total(id_usuario);
      const pago_total_carrito=pago_total_usuario.datos.map(elemento=>{
        const{PAGO_TOT_CARRITO }=elemento;
        return PAGO_TOT_CARRITO ;
      })
      const pago_total=pago_total_carrito[0];
      
      
      if (resultado.datos.length !== 0) {
        if (direccion === "" ||estado === "" ||ciudad === "" ||codigo_postal === "" ||telefono === "") {
            return res.json({estatus:'ERR',message:"PRIMERO TIENES QUE LLENAR TODOS LOS CAMPOS DEL FORMULARIO"});
        }else{
          const actividad_productos_carrito= await productos.producto_carrito_activo(id_usuario);
          let actividad_producto=actividad_productos_carrito.datos.map((elemento)=>{
          
            if(elemento.ACT_PRO===true){
              
             return true;
              
            }else{
              return false
             
            }
          })

          const cantidad_productos_carrito=await productos.cantidad_existencias_carrito(id_usuario)
          let cantidad_menor_existencias=cantidad_productos_carrito.datos.map((elemento)=>{
            if(elemento.CANTIDAD_EN_CARRITO<=elemento.CANTIDAD_EXISTENCIAS){
              return true;
            }else{
              return false;
            }
          })
          const res_actividad_producto=actividad_producto.some(e=>e===false);
          const res_cantidad_producto=cantidad_menor_existencias.some(e=>e===false)
         if(res_actividad_producto===false && res_cantidad_producto===false){
              const data={
                pedido_id:pedido_id,
                pago_tot:pago_total,
                direccion:direccion,
                estado:estado,
                ciudad:ciudad,
                codigo_postal:codigo_postal,
                telefono:telefono,
                id_cliente:id_usuario
              }
              await pedidos.agregar(data);
              
              const pedido_hecho=await pedidos.pedido_hecho(pedido_id);
              const prodPedido = pedido_hecho.datos.map((elemento)=> elemento)
              console.log('Los productos fueron: ', prodPedido)
              
              const datoCorreo = {
                to: pedido_hecho.datos[0].CORREO_CLI,
                cc: 'alexrdz1221@gmail.com',
                bcc: '',
                subject: 'Pedidos',
                template: 'correo_pedidos',
                nombreCompleto: pedido_hecho.datos[0].NOMBRE_CLI,
                direccion: String(`${pedido_hecho.datos[0].DIRECCION}, ${pedido_hecho.datos[0].COD_POSTAL}, ${pedido_hecho.datos[0].ESTADO}, ${pedido_hecho.datos[0].CIUDAD}`),
                pago_tot: formatoNumeros(pedido_hecho.datos[0].PAGO_TOT),
                producto: prodPedido,

              }

              correos.envio(datoCorreo)
              return res.json({estatus:'OK',message:`PEDIDO HECHO CORRECTAMENTE`})

              
          }else{
            
            return res.json({estatus:'ERR',message:`YA NO HAY ARTICULOS DE ALGUN PRODUCTO`})
          }
        }
        
       

      }else{
        
          return res.json({estatus:'ERR',
            message: "PRIMERO TIENES QUE INGRESAR PRODUCTOS AL CARRITO",
          });
      }


      
    } catch (err) {
      console.log(err);
      return res.json({ message: "OCURRIO UN ERROR AL ENVIAR EL PEDIDO" });
    }
  },
};

module.exports = {
  envios_hechos,
};