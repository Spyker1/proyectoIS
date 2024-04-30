const express = require('express');
const actualizarUs = require('../controllers/controllers_views/ctrl_actualizar_us');
const { agregarUsuario } = require('../controllers/controllers_views/ctrl_agregar_us');
const { cmsInicio } = require('../controllers/controllers_views/ctrl_cms_inicio');
const { inicio } = require('../controllers/controllers_views/ctrl_inicio');
const paginaError = require('../controllers/controllers_views/ctrl_pagina_error');
const agregarproducto = require('../controllers/controllers_views/ctrl_agregarP')
const sesion = require('../controllers/controllers_views/ctrl_sesion');
const agregarProductos = require('../controllers/controllers_views/ctrl_agregarPro')
const { mdwRtSesion } = require('../extras/mdw_sesiones');

const pedidos = require('../controllers/controllers_views/ctrl_det_ped');
const graficas = require('../controllers/controllers_views/ctrl_graficas');
const {micuenta,cerrarSesion} = require('../controllers/controllers_views/ctrl_miCuenta');
const productos = require('../controllers/controllers_views/ctrl_productos');
const { recuperarContraseña, codigoRecuperacion } = require('../controllers/controllers_views/ctrl_recuperar_contraseña');
const router = express.Router();

router.get('/', inicio);
router.get('/session', sesion)
router.get('/cms-inicio',/*[mdwRtSesion],*/cmsInicio.inicio)
router.get('/Pedidos', /*[mdwRtSesion] ,*/cmsInicio.pedidos)
router.get('/Estadisticas',[mdwRtSesion],cmsInicio.estadisticas)
router.get('/Clientes',[mdwRtSesion],cmsInicio.clientes)
router.get('/Productos',[mdwRtSesion],cmsInicio.productos)
router.get('/Usuarios',[mdwRtSesion],cmsInicio.usuarios)
router.get('/mi-cuenta',[mdwRtSesion], micuenta)
router.get('/cerrar-sesion',[mdwRtSesion],cerrarSesion)
//Recuperar contraseña
router.get('/recuperar-contrasena', recuperarContraseña);
router.get('/codigo-recuperacion/:correo', codigoRecuperacion)
router.get('/agregar-usuario', [mdwRtSesion], agregarUsuario)
router.get('/rt-actualiza-us/:usuarioId', actualizarUs)
router.get('/agregar-productos',[mdwRtSesion], agregarProductos)
router.get('/cerrar-sesion', cerrarSesion)
router.get('/agregar-producto', [mdwRtSesion], agregarproducto)
router.get('/pagina-no-encontrada',paginaError);
router.get('/actualizar-producto/:nom_pro',[mdwRtSesion],productos.rtActualizarProducto)
router.get('/detalles-pedido/:id_ped',[mdwRtSesion],pedidos.rtDetallesPedido)

router.get('/prueba',(req,res)=>{
    res.render('tabla_main')
})
//Graficas NO TOCAR
router.get('/productosVendidos',graficas.rtProductosVendidos)
router.get('/graficasSemana',graficas.rtPedidosHechos)
router.get('/graficas',graficas.rtPedidosHechosAño)
router.get('/graficasMes',graficas.rtPedidosHechosMes)

router.get('*',(req,res)=>{
    res.render('paginaNoEncontrada')
})
module.exports= router;