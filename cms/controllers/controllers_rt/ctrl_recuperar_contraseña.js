const { usuario } = require('../../db/db');
const { envio } = require('../../extras/correos');
const aleatorio = require('../../extras/numero_aleatorio');


const contraseña ={
    rtEnviarCodigo: async (req, res) => {
        try {
            const body = req.body;
            const {correo} = body;

            if (correo.length) {
                const datoIngresado = await usuario. encontrar_con_correo({correo});
                const datoUsuario = datoIngresado.datos.map((element) => element)
                
                if(datoUsuario.length){
                    const codigo = aleatorio();
                    console.log('Existe en la bd');
                    await usuario.insertar_codigo_rec({correo:datoUsuario[0].CORREO_US, codigo: codigo}) 
                    
                    const datoCorreo = {
                        to: datoUsuario[0].CORREO_US,
                        cc: '',
                        bcc: 'alexrdz1221@gmail.com',
                        subject: 'Código de recuperación',
                        template: 'codigo_recuperacion',
                        nombreCompleto: datoUsuario[0].CORREO_US,
                        codNuevo: codigo
                    }
                  
                    envio(datoCorreo);
                    return res.json({estatus: 'OK', info: datoUsuario[0].CORREO_US});
                }else{
                    console.log('No existe en la bd')
                    return res.json({estatus: 'Err', message: 'Correo incorrecto o inexistente favor de verificar'})
                }
            }else {
                return res.json({estatus: 'Err', message: 'Favor de escribir su correo'})
            }
        }catch (error) {
            console.log('contraseña EnviarCodigo')
        }
    },

    rtVerificarCodigo: async (req, res) => {
        try {
            const body = req.body;
            const {codigo, correo} = body;
            const verificar = await usuario.codigo_recuperacion({correo, codigo});

            if(verificar.datos.map((element) => element.RESULTADO)[0] === 'CORRECTO'){
                const datosUs = await usuario.encontrar_con_correo({correo});
                const usuarioDatos = datosUs.datos.map((element) => element)
                console.log(usuarioDatos)
                
                const datos = {
                    to: correo,
                    cc: 'bans16060@gmail.com',
                    bcc: 'halo52648@gmail.com',
                    subject: 'Recuperación contraseña',
                    template: 'correo_cons',
                    nombreCompleto: usuarioDatos[0].CORREO_US,
                    contrasena: usuarioDatos[0].CONTRASEÑA_US,
                
                }
                console.log(datos)

                envio(datos)
                
                return res.json({estatus:'OK', message: 'Correcto se enviara un correo con su contraseña ^.^'});
            }else{
                return res.json({estatus: 'ERR', message: 'Código incorrecto favor de verificar'});
            }

        } catch (error) {
            console.log('Error en verificar codigo')
        }
    },

    rtReenviarCodigo: async (req, res) => {
        try {
            const body = req.body;
            const {correo} = body;
            const datosUs = await  usuario.encontrar_con_correo({correo});
            const codigoUs = datosUs.datos.map((element) => element);
            
            const datoCorreo = {
                to: correo,
                cc: '',
                bcc: 'alexrdz1221@gmail.com',
                subject: 'Código de recuperación',
                template: 'codigo_recuperacion',
                nombreCompleto: codigoUs[0].CORREO_US,
                codNuevo: codigoUs[0].CODIGO_US
            }

            envio(datoCorreo)

            return res.json({estatus: 'OK', message: 'Verifique su correo se envio el código de recuperación'})
        } catch (error) {
            console.log('Error en reenviar correo')
        }
    }
    
};

module.exports = contraseña;