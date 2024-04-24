const path = require('path');
const nodemailer = require('nodemailer')
const hbs = require("nodemailer-express-handlebars");
const { callbackPromise } = require('nodemailer/lib/shared');

/**
 * Las plantillas de los correos estaran siempre en una carpeta vies y en una carpeta correo 
 */

//Recibiremos el nombre de la plantilla que se mandara
const optionsHbs = {
   
  viewEngine: {
    extname: '.hbs',
    partialsDir: path.join(__dirname,'../views/correo/'),
    defaultLayout: false,
  },
  viewPath: path.join(__dirname, '../views/correo/'),
  extName: '.hbs'
}
//Para enviar correo este se quedara así:
const transporter = nodemailer.createTransport({
  service: 'Hotmail',
  auth: {
    user: 'leonardo.cantulara@hotmail.com',
    pass: 'aguilas1712',
  },
});
// function enviarCorreos(correo = '',copiasCorreos = [], copiasOcultas = [] ,tema='', nombrePlantilla = '', variables ={}){
  const correos ={
    envio: async (data, callback ) => {
      try{  
        transporter.use('compile', hbs(optionsHbs));
        transporter.sendMail({
          from: 'leonardo.cantulara@hotmail.com',
          to: data.to,
          cc: data.cc,
          bcc: data.bcc,
          subject: data.subject,
          template: data.template,
          context: {

            ...data

          }
        }, (err, info) => {
          if (err) {
            console.log('error enviando correo')
            callback({ estado: 0, err })
            return
          }
          console.log('Correo enviado correctamente')
          callback({ estado: 1, info })
      });
        
  }
      catch(err){ 
        console.log('Catch');
        callback({esado: 0, err})
      }
  }
}
/**
 * Se usaria asi.
 * 
  const path = require('path');
  const nodemailer = require('nodemailer')
  const hbs = require("nodemailer-express-handlebars");
  const correo = require('../extras/correos');  
const enviarCorreo = (req = request, res = resp) => {
  
  const { nombreCompleto, correoElectronico, informacion } = req.body;
  
  const data ={
    to: 'alexrdz1221@gmail.com',
    cc: 'bans16060@gmail.com',
    bcc: 'halo52648@gmail.com',
    subject: 'ZD',
    template: 'codigo_verificacion',
    nombreCompleto: nombreCompleto,
    correoElectronico: correoElectronico,
    informacion: informacion
  }
  module.exports ={
  enviarCorreo
}

  correo.envio(data);
}
*/
module.exports = correos;