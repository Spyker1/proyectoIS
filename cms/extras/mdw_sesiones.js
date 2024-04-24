const mdwSesion = (req, res, next) => {
    
}

const mdwRtSesion = (req, res, next) => {

    if(req.session.usuario){
        next();
    }else{
        res.redirect('/')
    }

}

module.exports = {
    mdwSesion,
    mdwRtSesion
}