const agregarUsuario = ( req, res ) =>{
    try {
        res.render('agregar_Usuario')
        
    } catch (error) {
        console.log('err CtrlInicio')
        res.redirect('/pagina-no-encontrada')
    }
}

module.exports = {
    agregarUsuario
}