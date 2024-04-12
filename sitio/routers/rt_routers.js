const express = require('express');
const { enviarCorreos } = require('../controllers/controllers_rt/ctrl_opinion');
const ctrlVacantes = require('../controllers/controllers_rt/ctrl_vacantes');
// const usuarioEx = require('../controllers/controllers_rt/ctrl_usuario_existente');
const codigoVerif = require('../controllers/controllers_rt/ctrl_cod_verif');
const { doble_autenticacion } = require('../controllers/controllers_rt/ctrl_dobleaut');
const ctrlCANACO = require('../controllers/controllers_rt/ctrl_canaco');
const { ctrlEmpresa } = require('../controllers/controllers_rt/ctrl_empresa');
const { iniciar_sesion } = require('../controllers/controllers_views/ctrl_iniciar_sesion');
// const contraseña = require('../controllers/controllers_rt/ctrl_recuperar_contraseña');
const reenviar = require('../controllers/controllers_rt/ctrl_reenviar_contraseña');
const router = express.Router();

//Inicio de sesion
router.post('/rt-canaco-inicio-sesion', ctrlCANACO.rtIniciarSesion);

// Vacantes
router.post('/rt-agregar-vacante',ctrlVacantes.rtAgregarVacantes)

//Empresas
router.post('/rt-alta-empresa', ctrlEmpresa.altaEmpresa)
//correo
router.post('/enviar-correo', enviarCorreos);

//Cuentas existentes
// router.post('/rt-iniciar-sesion',usuarioEx.rtUsuarioExistente);
router.post('/rt-codigo-verif', codigoVerif.rtCodigoVerif);
router.post('/rt-prueba-correo',iniciar_sesion.codigoVerif);
//Empresa
router.post('/rt-buscador-empresa',ctrlEmpresa.rtNombreEmpresa)

//doble autenticacion
router.post('/rt-activar-doble-autenticacion',doble_autenticacion.rtActivar);
router.post('/rt-desactivar-doble-autenticacion',doble_autenticacion.rtDesactivar);

//Recuperacion de contraseñas:
router.post('/rt-reenviar-contrasena', reenviar.rtEnviarContraseña);
// router.post('/rt-recuperar-contrasena',reenviar.rtEnviarCodigo );
router.post('/rt-verificar-codigo', reenviar.rtVerificarCodigo);
router.post('/rt-reenviar-codigo', reenviar.rtReenviarCodigo)

module.exports= router;