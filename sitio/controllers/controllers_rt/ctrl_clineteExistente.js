//En esta parte van todos los controladores de usuario Existente

const { cliente } = require("../../db/db");

const init = require("../../config/sesion_seq");

const aleatorio = require("../../extras/numerosAleatorios");

const correos = require("../../extras/correos");

const clienteEx = {
  rtClienteExistente: async (req, res) => {
    try {
      const codiV = aleatorio();

      const body = req.body;

      const { correo, contraseña } = body;

      const resultado = await cliente.buscar_correo_contraseña(body);
      console.log(resultado)
      const verifUsuario = resultado.datos.map(async (elemento) => {
        if (elemento.CORREO_CLI === correo && elemento.CONTRASEÑA_CLI === contraseña) {
          init;
          
          if (!elemento.ACTIVO_CLI) {
            return res.json({ estatus: "3", message: "El correo no existe" });
          }

          if (elemento.DOBLE_AUT_CLI) {
            const data = {
              to: correo,
              bcc: "basn160603@gmail.com",
              subject: "Codigo de autenticación",
              template: "cod_ver",
              nombreCompleto: elemento.NOMBRE_CLI,
              codigo: codiV,
            };

            await cliente.insertarCodigoV({
             correo: correo,
             contraseña: contraseña,
             codigo: codiV,
            });
            
            req.session.usuario = {
              id: elemento.ID_CLI,
            };
            

            correos.envio(data);

            return res.json({ estatus: "2" });
          }

          req.session.usuario = {
            id: elemento.ID_CLI,
          };

          console.log("Usuario existe y correcto ╰(*°▽°*)╯");

          return res.json({ estatus: "OK", message: "BIENVENIDO ^_^" });
        }
      });

      //----------------------------------------------------------------------------------------------------//

      if (resultado.datos.length > 0) {
        verifUsuario;
      } else {
        return res.json({
          estatus: "ERR",
          message: "Correo o contraseña incorrectos",
        });
      }
    } catch (err) {
      return res.json({ estatus: "ERR" });
    }
  }
};

module.exports = clienteEx;
