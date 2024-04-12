const express = require('express');
const {iniciar_sesion} = require('../controllers/controllers_views/ctrl_iniciar_sesion');
const { candidatos } = require('../controllers/controllers_views/ctrl_candidatos');
const { vacantes } = require('../controllers/controllers_views/ctrl_vacantes');
const empresas = require('../controllers/controllers_views/ctrl_empresa');
const { mdwRtSesion } = require('../extras/mdw_sesiones');
const {recuperar_con} = require('../controllers/controllers_views/crtl_recuperar_contrasena');
const router = express.Router();

//Link que se borrara antes de enviar a servidor si lo ven cuando nos toque subirlo BORRENLO PLIS
router.get('/sesion', (req, res) => {
    res.send(req.session);
})

//Iniciar sesion
router.get('/',iniciar_sesion.iniciar_sesionCANACO)

router.get('/codigo-validacion/:url',iniciar_sesion.codigoVerif)

//Recuperar contraseña
router.get('/codigo-validacion',recuperar_con.codigoVerif)
//Alta empresas
router.get('/nueva-empresa', empresas.rtAgregarEmpresa)

//Alta vacantes
router.get('/nueva-vacante', vacantes.rtFormularioVacantes)

router.get('/prueba',(req,res)=>{
    res.render('prueba')
})

router.get('/vacantes/ver', (req, res) => {
    res.render('panel/vacantes/verVacantes')
})

router.get('/vacantes/canaco-tampico', (req, res) => {
    res.render('panel/publico/verVacantes')
})

router.get('/vacantes/:id/canaco-tampico/', (req, res) => {
    res.render('panel/publico/verDetallesVacante')
})

router.get('/vacantes/:id/postulacion/canaco-tampico/', (req, res) => {
    res.render('panel/publico/postulacionVacante')
})

module.exports= router;