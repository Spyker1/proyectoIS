const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const from = 'Empresa <correo>'

 const optionsHbs = {
    viewEngine: {
        extname: '.hbs',
        layoutsDir: 'views/mailing/',
        defaultLayout: 'mailing_default',
        partialsDir: 'views/mailing/',
        helpers: require('../extras/helpers_mailing')
    },
    viewPath: 'views/mailing',
    extName: '.hbs',
};

 

const optionsCorreo = {
    service: 'Gmail',
    auth: {
    }
}

 let transporterEnvio = nodemailer.createTransport(optionsCorreo);

const correos = {
    envio: async (data, callback) => {
        try{
            transporterEnvio.use('compile', hbs(optionsHbs));
            transporterEnvio.sendMail({
                from: from,
                to: data.to? data.to: [],
                cc: data.cc? data.cc: [],
                bcc: data.bcc? data.bcc: [],
                subject: data.titulo? data.titulo: '',
                template: data.plantilla? data.plantilla: 'mailing_default',
                context: {
                    layout: '',
                    ...data
                },
            }, (err, info) => {
                if (err) {
                    callback({ estado: 0, err })
                    return
                }
                callback({ estado: 1, info })
            });
        }catch(err){
            callback({ estado: 0, err })
        }
    }
}

module.exports = correos