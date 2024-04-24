const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'netoilluminati258@gmail.com',
    pass: 'gnavdkfqtkaovggq', // Acceder a la contraseña desde las variables de entorno
  },
});

const enviarCorreos = (req = request, res = resp) => {
  // Obtener los datos del formulario del cliente
  const { nombreCompleto, correoElectronico, informacion } = req.body;
console.log('hola')
  // Configurar el objeto de correo
  const mailOptions = {
    from: 'netoilluminati258@gmail.com',
    to: 'alexrdz1221@gmail.com',
    cc: 'basn160603@gmail.com, leonardo.cantulara@hotmail.com',
    bcc: 'armandi.cantu@gmail.com',
    subject: 'Formulario de contacto - GameCave',
    html: `<h2>Nombre completo: ${nombreCompleto}\nCorreo electrónico: ${correoElectronico}\nInformación: ${informacion}</h2>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Ocurrió un error al enviar el correo.' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.json({ message: 'El correo se envió correctamente.' });
      
      }
    });
}


module.exports = { enviarCorreos }