const inicio = ( req, res ) =>{
    try {
        res.render('login')
        
    } catch (error) {
        console.log(error)
        res.redirect('/pagina-no-encontrada')
    }
}

module.exports = {
    inicio
}