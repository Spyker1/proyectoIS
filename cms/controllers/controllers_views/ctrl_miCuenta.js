const {usuario} = require('../../db/db')
const micuenta = async(req, res) => {
    try {
        const datos=await usuario.datos_us(req.session.usuario.id)
        res.render('micuenta', {datos_usuario:datos.datos});

    } catch (err) {
        res.redirect('/pagina-no-encontrada')
    }
}
const cerrarSesion=async(req,res)=>{
    try {
        req.session.destroy();
        res.redirect('/');
    } catch (error) {
        
    }
}

module.exports = {micuenta,cerrarSesion}