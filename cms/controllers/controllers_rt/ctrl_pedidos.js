const { pedido } = require("../../db/db");
const correos = require("../../extras/correos");
const formatoNumeros = require("../../extras/formato_precios");

const envios={
    rtReenviarCorreo:async(req,res)=>{
        const pedido_id=req.params.id_ped;
        console.log(pedido_id)
        const pedido_hecho=await pedido.pedido_hecho(pedido_id);
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
        return res.json({estatus:'OK',message:`CORREO ENVIADO CORRECTAMENTE`})

    }
}

module.exports=envios;