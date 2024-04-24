const nodemailer = require('nodemailer')
const { response, request } = require('express');

const contra = ( req = request, res = response) =>{
    res.render('olvidarContraseña');
  }
  
  const trans = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'netoilluminati258@gmail.com',
      pass: 'gnavdkfqtkaovggq',
    },
  });
  
  const olvidarContraseña = (req = request, res = resp) => {
  
    const { correoLlegada } = req.body;
    console.log('hola')
  
    const optCorreo = {
      from: 'netoilluminati258@gmail.com',
      to: correoLlegada,
      subject: 'GameCave',
      text: 'Este es el contenido del correo.',
    };
  
    // Enviar el correo electrónico
    trans.sendMail(optCorreo, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send('Hubo un error al enviar el correo.');
      } else {
        console.log('Correo enviado: ' + info.response);
        res.send('Correo enviado exitosamente.');
      }
    });
  };

  module.exports = {
    contra,
    olvidarContraseña
  }