const agregarProductos = (req, res) => {
    try {

        res.render('agregarP');

    } catch (err) {
        res.redirect('/pagina-no-encontrada')
    }
}

module.exports = agregarProductos