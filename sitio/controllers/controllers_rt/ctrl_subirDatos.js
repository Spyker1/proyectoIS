const { cliente } = require("../../db/db")
const { correosArchivos } = require("../../extras/correos")

const archivos = {
    archivo:async(req, res)=>{
        try {
            const {id} = req.session.usuario
            const {documento} = req.files
            const datos = (await cliente.clienteXid({id})).datos[0]

            let tipo = {subject: '', nombreArchivo: ''}
            switch (req.headers.tipo) {
                case 'acta nacimiento': tipo= {subject: 'Acta de nacimiento', nombreArchivo:`${datos.NOMBRE.replace(' ','_')}_acta_nacimiento.pdf`}; break;
                case 'comprobante domicilio': tipo= {subject: 'Comprobante de domicilio', nombreArchivo:`${datos.NOMBRE.replace(' ','_')}_comprobante_domicilio.pdf`}; break;
                case 'comp-estudios': tipo= {subject: 'Comprobante grado máximo de estudios', nombreArchivo:`${datos.NOMBRE.replace(' ','_')}_comprobante_estudios.pdf`}; break;
                case 'curp': tipo= {subject: 'CURP', nombreArchivo:`${datos.NOMBRE.replace(' ','_')}_curp.pdf`}; break;
                case 'fotos': tipo= {subject: 'Fotos', nombreArchivo:`${datos.NOMBRE.replace(' ','_')}_fotos.pdf`}; break;
                default: break;
            }

            if (documento.mimetype === 'application/pdf') {
                correosArchivos.envio({
                    to: ['alexrdz1221@gmail.com'],
                    bcc: 'netoilluminati258@gmail.com',
                    subject: tipo.subject,
                    template: 'documento',
                    nombreArchivo: tipo.nombreArchivo,
                    info: documento.data,
                    nombreCompleto: datos.NOMBRE
                })
                return res.json({estatus: 'OK', title: 'Archivo enviado correctamente',message: 'El archivo fue aceptado y enviado correctamente', icon: 'success'})
            } 
            return res.json({estatus: 'ERR', title:'Archivo no aceptado', message: 'El tipo de archivo no es valido.', icon: 'error'})
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    comprobante_domiclio:async(req, res)=>{
        try {
            
        } catch (error) {
            throw error
        }
    }
}

module.exports = {archivos}