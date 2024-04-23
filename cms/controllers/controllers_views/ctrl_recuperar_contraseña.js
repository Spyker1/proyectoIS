const recuperar_contra ={
    recuperarContraseña: (req, res) => {
        try{
            res.render('recuperar_contraseña', {
            })
        }catch(err){
            console.log(err)
            res.render('')
        }
    },
    codigoRecuperacion: (req, res) => {
        try {
            res.render('codigo_recuperacion', correo = req.params)
        } catch (error) {
            
        }
    }
}

module.exports = recuperar_contra