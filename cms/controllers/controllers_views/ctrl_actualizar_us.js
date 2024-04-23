const actualizarUs = () =>{
    try {
        res.render('actualizar_usuario')
    } catch (err) {
        res.redirect('/pagina-no-encontrada')
    }
}

module.exports = actualizarUs;