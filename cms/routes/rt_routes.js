const express = require('express');
const iniciarSesion = require('../controllers/controllers_rt/ctrl_iniciar_sesion');
const usuarioABC = require('../controllers/controllers_rt/ctrl_usuario');
const nuevaC = require('../controllers/controllers_rt/ctr_cantidadN');
const nuevop = require('../controllers/controllers_rt/ctrl_agregarP');
const envios = require('../controllers/controllers_rt/ctrl_pedidos');
const contraseña = require('../controllers/controllers_rt/ctrl_recuperar_contraseña');
const router = express.Router();

//Inicio de sesionn de los usuarios
router.post('/rt-iniciar-sesion',  iniciarSesion.rtIniciarSesion)

//Recuperar contraseña
router.post('/rt-recuperar-contrasena', contraseña.rtEnviarCodigo);
router.post('/rt-verificar-codigo', contraseña.rtVerificarCodigo);
router.post('/rt-reenviar-codigo', contraseña.rtReenviarCodigo)

//Agregar usuarios (Solo podra hacerlo alguien con puesto de administrador)
router.post('/rt-agregar-usuario', usuarioABC.rtAgregar)

router.post('/rt-actualizar-us', usuarioABC.rtActualizar)

router.post('/rt-actualizar-datos-us',usuarioABC.rtActualizarDatos)
router.delete('/rt-eliminar-us/:usuarioId', usuarioABC.rtEliminar)

// router.post('/rt-agregar-producto', nuevop.rtAgregarP)
router.post('/rt-agregar-producto', nuevop.rtAgregarP)

// Agrega cantidad nueva a los productos
router.post('/rt-eliminar-pro/:id_pro',nuevop.eliminar_pro)
router.put('/rt-cantidadN/:id/:cantidad', nuevaC.rtNuevac)

router.post('/rt-actulizar-datos-producto',nuevop.actualizar_datos_producto)
// router.post('/rt-agregar-cant-pro/:inp_agregar_cant/:id_pro',nuevop.rt_agregar_cant_pro)

router.post('/imagenes/:id_pro', nuevop.imagen)
//correo envios
router.post('/rt-reenviar-correo-pedidos/:id_ped',envios.rtReenviarCorreo);


module.exports= router;