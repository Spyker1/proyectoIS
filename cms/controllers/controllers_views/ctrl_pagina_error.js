const paginaError = (req, res) => {
    try {
        res.render('paginaNoEncontrada');
    } catch (error) {

        console.log('Alert');
        
    }
}

module.exports = paginaError;