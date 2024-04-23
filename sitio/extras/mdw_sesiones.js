const { cliente } = require("../db/db")
const jwt = require('jsonwebtoken');

const mdwSesion = (req, res, next) => {

}

const mdwRtSesion = async(req, res, next) => {

if (req.session.usuario){

    const resultado= await cliente.buscar_id(req.session.usuario.id)

    if(resultado.datos.map((element)=>element.ACTIVO_CLI)[0]) next()
}else{
        res.redirect('/iniciar-sesion')
    }
    
}

const mdwRtSesionInactiva = (req, res, next) => {

    if (!req.session.sesionInactiva){
        next()
    }else{
            res.redirect('/codigo-verificacion')
        }
        
    }

    const isAuth = (req, res, next) =>{
        if(!req.headers.authorization){
            
        }
        next()
    }

module.exports = {
    mdwSesion,
    mdwRtSesion,
    mdwRtSesionInactiva,
    isAuth
}