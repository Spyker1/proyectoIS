
const {cliente} = require('../../db/db');
const correos = require('../../extras/correos');
const aleatorio = require("../../extras/numerosAleatorios");

const clientes= {

  rtClientesNuevo: async(req, res)=> {
    try{

      const body = req.body;
      const {nombreCompleto, correo, contraseña, dobleAut,ciudad} = body;
      const correoCl = await cliente.buscar({ correo, contraseña })
      const codiV = aleatorio();

      console.log(correoCl);

      const data={
        to: correo,
        bcc: 'netoilluminati258@gmail.com',
        subject: 'BIENVENIDO',
        template: 'bienvenida',
        nombreCompleto: nombreCompleto,
        codigo: codiV,
      };

      const estado = correoCl.datos.map((element) => element);
      
      if(estado.length){
        return res.json({estatus: 'ERR', message: 'Correo existente U_U'});
      }else{
        correos.envio(data);
      
        req.session.sesionInactiva = {
          nombreCompleto,
          correo,
          contraseña,
          dobleAut,
          codigo: codiV,
          ciudad
        }
        return res.json({estatus: 'OK', message: 'Correo Valido'});
      }
    }catch(err){
      console.log('Error en agregar ctrl_cn',err);
      
      return res.json({estatus: 'ERR'});
    }
  }
}

  module.exports = clientes;