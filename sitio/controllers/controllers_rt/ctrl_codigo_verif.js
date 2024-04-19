
const {cliente} = require('../../db/db');

const comparar = (codigo, codigoComparado) => {
    return codigo == codigoComparado ? true : false;
}

const codigoVerif = {

    rtCodigoVerif: async(req, res) => {
        try {
            const body = req.body;
            const { codiV } =body
            
            if(req.session.usuario){
                const { id } = req.session.usuario;

                const usuario = await cliente.buscar_id(id)
                const codigoUsuario = usuario.datos.map((elemento) => elemento.CODIGO_VERIF_CLI);

                if(comparar(codiV, codigoUsuario[0])){
                    cliente.eliminarCodigoV({id})
                    return res.json({estatus: 'OK', message: 'BIENVENIDO A GAMECAVE ^0^'})
                }
            }else if(req.session.sesionInactiva){
                const {nombreCompleto, correo, contraseña, dobleAut,codigo} = req.session.sesionInactiva
                console.log(codigo)

                if(comparar(codiV, codigo)){
                    
                    console.log('Codigo correcto')
                    cliente.agregar({nombreCompleto, correo, contraseña, dobleAut, codigoV: 0})
                    
                    req.session.destroy()
                    
                    return res.json ({estatus: 'OK INACTIVE'});
                }
                
            }

            return res.json({estatus: 'ERR', message: 'Codigo de verificacion incorrecto itentalo otra vez'});
        } catch (error) {
            console.log('Err en ctrCodV')
        }
    }
}

module.exports = codigoVerif;