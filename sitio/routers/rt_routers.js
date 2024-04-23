const { enviarCorreos } = require('../controllers/controllers_rt/accionesRutas');
const { Router } = require ( 'express' );
const {buscador}=require('../controllers/controllers_rt/ctrl_buscar');
const clienteEx = require('../controllers/controllers_rt/ctrl_clienteExistentes');
const clientes = require('../controllers/controllers_rt/ctrl_clienteNuevo')
const {carrito_productos } = require('../controllers/controllers_rt/ctrl_carrito');
const { todos_productos } = require('../controllers/controllers_rt/ctrl_productos');
const { envios_hechos } = require('../controllers/controllers_rt/ctrl_pedidos');
const { cliente_hecho } = require('../controllers/controllers_rt/ctrl_actualizar_datos');
const { doble_autenticacion } = require('../controllers/controllers_rt/ctrl_doble_autenticacion');
const  codigoVerif = require('../controllers/controllers_rt/ctrl_codigo_verif');
const contraseña = require('../controllers/controllers_rt/ctrl_recuperar_contra');
const imagenes = require('../controllers/controllers_rt/ctrl_imagenes');

const router = Router();

//buscador
router.post('/rt-buscador',buscador.rtBusqueda)
//correo
router.post('/enviar-correo', enviarCorreos);
//cuentas nuevas
router.post('/rt-crear-sesion', clientes.rtClientesNuevo);
//Cuentas existentes
router.post('/rt-iniciar-sesion',clienteEx.rtClienteExistente);
router.post('/rt-codigo-verif', codigoVerif.rtCodigoVerif )
//Recuperacion de contraseñas:
router.post('/rt-recuperar-contrasena',contraseña.rtEnviarCodigo );
router.post('/rt-verificar-codigo', contraseña.rtVerificarCodigo);
router.post('/rt-reenviar-codigo', contraseña.rtReenviarCodigo)
//productos
router.post('/agregar-producto',todos_productos.rtAgregarProductos);
router.post('/actualizar-producto',todos_productos.rtActualizarProductos);
router.post('/buscar-producto',todos_productos.rtBuscarProductos);
router.post('/borrar-producto',todos_productos.rtBorrarProductos);
//carrito
router.post('/rt-carrito-agregar/:productId',carrito_productos.rtAgregarCarrito);
router.delete('/rt-carrito-eliminar/:productId',carrito_productos.rtEliminarCarrito);
router.post('/rt-carrito-plantilla-agregar/:productId/:cantidad',carrito_productos.rtAgregarPlantillaCarrito)
//Envio
router.post('/rt-hacer-envio',envios_hechos.rtAgregarEnvio)
//Actualizar datos
router.post('/rt-actualizar',cliente_hecho.rtActualizarCliente)
//cliente
router.post('/rt-eliminar-cuenta',cliente_hecho.rtBorrarCliente)
//doble autenticacion
router.post('/rt-activar-doble-autenticacion',doble_autenticacion.rtActivar)
router.post('/rt-desactivar-doble-autenticacion',doble_autenticacion.rtDesactivar)

//imagenes
router.post('/imagenes/:id_pro', imagenes.agregar)

module.exports = router

