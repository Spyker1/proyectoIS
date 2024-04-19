const {cliente} = require('../../db/db');
const { envio } = require('../../extras/correos');
const generarJWT = require('../../extras/generar_jwt');
const aleatorio = require('../../extras/numerosAleatorios');

const contraseña ={
    rtEnviarCodigo: async (req, res) => {
        try {
            const body = req.body;
            const {correo} = body;

            if (correo.length) {
                const datoIngresado = await cliente.buscar({correo});
                const datoUsuario = datoIngresado.datos.map((element) => element)
                
                if(datoUsuario.length){
                    const codigo = aleatorio();
                    console.log('Existe en la bd');
                    await cliente.insertarCodigoV({correo:datoUsuario[0].CORREO_CLI, contraseña: datoUsuario[0].CONTRASEÑA_CLI, codigo: codigo})
                    
                    const datoCorreo = {
                        to: datoUsuario[0].CORREO_CLI,
                        cc: '',
                        bcc: 'alexrdz1221@gmail.com',
                        subject: 'Código de recuperación',
                        template: 'codigo_recuperacion',
                        nombreCompleto: datoUsuario[0].NOMBRE_CLI,
                        codNuevo: codigo
                    }
                  
                    generarJWT({correo: datoUsuario[0].CORREO_CLI});
                    envio(datoCorreo);
                    return res.json({estatus: 'OK', info: datoUsuario[0].CORREO_CLI});
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
            const verificar = await cliente.codigoRecuperacion({correo, codigo});

            if(verificar.datos.map((element) => element.RESULTADO)[0] === 'CORRECTO'){
                const datosCli = await cliente.buscar({correo});
                const clienteDatos = datosCli.datos.map((element) => element)
                console.log(clienteDatos)
                
                const datos = {
                    to: correo,
                    cc: 'bans16060@gmail.com',
                    bcc: 'halo52648@gmail.com',
                    subject: 'Recuperación contraseña',
                    template: 'correo_cons',
                    nombreCompleto: clienteDatos[0].NOMBRE_CLI,
                    contrasena: clienteDatos[0].CONTRASEÑA_CLI,
                
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
            const datosCli = await cliente.buscar({correo});
            const codigoCli = datosCli.datos.map((element) => element);
            
            const datoCorreo = {
                to: correo,
                cc: '',
                bcc: 'alexrdz1221@gmail.com',
                subject: 'Código de recuperación',
                template: 'codigo_recuperacion',
                nombreCompleto: codigoCli[0].NOMBRE_CLI,
                codNuevo: codigoCli[0].CODIGO_VERIF_CLI
            }

            envio(datoCorreo)

            return res.json({estatus: 'OK', message: 'Verifique su correo se envio el código de recuperación'})
        } catch (error) {
            console.log('Error en reenviar correo')
        }
    }
    
};

module.exports = contraseña;