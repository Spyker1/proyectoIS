const express = require('express');
const router = express.Router()
const { mdwRtSesion, mdwRtSesionInactiva, isAuth } = require('../extras/mdw_sesiones');
const { todos_productos } = require('../controllers/controllers_rt/ctrl_productos');
const vistas_productos = require('../controllers/controllers_views/ctrl_views_productos');
const sesiones = require('../controllers/controllers_views/ctrl_views_sesion');
const apoyo = require('../controllers/controllers_views/ctrl_views_apoyo');
const views_carrito = require('../controllers/controllers_views/ctrl_views_carrito');

router.get('/',todos_productos.rtUltimosDiezProductos);
router.get('/producto/:nombre',vistas_productos.plantillaProducto)
router.get('/sesion', sesiones.sesion)
router.get('/crear-sesion', [mdwRtSesionInactiva],sesiones.crearSesion);
router.get('/iniciar-sesion', [mdwRtSesionInactiva],sesiones.iniciarSesion);
router.get('/cerrar-sesion',[mdwRtSesion], sesiones.cerrarSesion)
router.get('/enviar-opinion', apoyo.enviarOpinion);
router.get('/recuperar-contrasena',apoyo.recuperarContraseña);
router.get('/codigo-recuperacion/:correo', [],apoyo.codigoRecuperacion)
router.get('/carrito',[mdwRtSesion, mdwRtSesionInactiva], views_carrito.carrito)
router.get('/codigo-verificacion', apoyo.codigoVerificacion)
router.get('/mi-cuenta',[mdwRtSesion, mdwRtSesionInactiva],apoyo.miCuenta);
router.get('/acta-nacimineto',[mdwRtSesion, mdwRtSesionInactiva],apoyo.actaNacimiento);
router.get('/com-domici',[mdwRtSesion, mdwRtSesionInactiva],apoyo.comDomici);
router.get('/fotos',[mdwRtSesion, mdwRtSesionInactiva],apoyo.Fotos);
router.get('/com-estudios',[mdwRtSesion, mdwRtSesionInactiva],apoyo.comEstudios);
router.get('/curp',[mdwRtSesion, mdwRtSesionInactiva],apoyo.curP);
router.get('/filtro/:filtro_p/:filtro_f',vistas_productos.filtro)
router.get('/buscador/:buscador',vistas_productos.buscador)
router.get('/catalogo-productos',vistas_productos.catalogo);
router.get('*',(req,res)=>{
    res.render("paginaNoEncontrada")
})
module.exports = router;

