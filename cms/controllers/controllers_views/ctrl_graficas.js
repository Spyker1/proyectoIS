const { graficas_db } = require("../../db/db");


const graficas={
    rtProductosVendidos:async(req,res)=>{
        try {
            const resultado=await graficas_db.productosVendidos()
            const label=resultado.datos.map(resultado=>resultado.NOM_PRO);
            const ventas=resultado.datos.map(resultado=>resultado.CantidadLista);

            res.json({label,ventas})
        } catch (error) {
            console.log(error)
        }
    },
    rtPedidosHechos:async(req,res)=>{
        try {
            const resultado=await graficas_db.pedido_hecho_dia()
            const dias=['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
            const cantidad_dia=resultado.datos.map(resultado=>resultado.CANTIDAD)
            const ventasTotales=resultado.datos.map(resultado=>resultado.VENTAS_TOTALES)
            res.json({cantidad_dia,dias,ventasTotales})

        } catch (error) {
            console.log(error)
        }
    },
    rtPedidosHechosAño:async(req,res)=>{
        try {
            const resultado=await graficas_db.ventasTotales_año()
            const mes=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
            const cantidadVentas=resultado.datos.map(resultado=>resultado.CANTIDAD)
            const ventasTotales=resultado.datos.map(resultado=>resultado.VENTAS_TOTALES)
            res.json({mes,cantidadVentas,ventasTotales})
        } catch (error) {
            console.log(error)
        }
    },
    rtPedidosHechosMes:async(req,res)=>{
    try {
        const resultado=await graficas_db.pedidosHechosMes()
        const semananas=['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22',
        '23','24','25','26','27','28','29','29','30','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50',
        '51','52','53','54']
        
        const ventasTotales=resultado.datos.map(resultado=>resultado.VENTAS_TOTALES)
        const cantidad=resultado.datos.map(resultado=>resultado.CANTIDAD)
        res.json({ventasTotales,cantidad,semananas})
    } catch (error) {
        console.log(error)
    }

    }
}

module.exports=graficas