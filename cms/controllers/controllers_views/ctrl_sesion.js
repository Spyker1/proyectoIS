const sesion = (req, res) => {
    try {
        res.json(req.session)

    } catch (error) {
        
        console.log('Alert')
        res.redirect('/pagina-no-encontrada')
    
    }
}

module.exports = sesion