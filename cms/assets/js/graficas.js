//DECLARACION DE VARIABLES
var productos_vendidos = document.getElementById('productosVendidos').getContext('2d');
var pedidosHechosSemana=document.getElementById('peidosHechosSemana').getContext('2d');
var ventasTotalesSemana_v=document.getElementById("ventasTotalesSemana").getContext('2d');
var ventasTotalesAño_v=document.getElementById('ventasTotales').getContext('2d');
var pedidosHechosAño_v=document.getElementById("peidosHechos").getContext('2d');
// var pedidosHechosMes_v=document.getElementById("pedidosHechosMes").getContext('2d');
// var ventasTotalesMes_v=document.getElementById("ventasTotalesMes").getContext('2d')


//FUNCIONES PARA CATEGORIAS MES/AÑO/DIA







//FUNCIONES QUE ACTUALIZAN LAS GRAFICAS AL RECARGAR LA PAGINA








function obtenerDatosProductosVendidos() {
    return fetch('/productosVendidos')
        .then(response => response.json());
}
//FUNCIONES QUE CREAN LAS GRAFICAS
function productosVendidos() {
    obtenerDatosProductosVendidos().then(data => {
        var config = {
            type: 'bar',
            data: {
                labels: data.label,
                datasets: [{
                    label: 'Prodctuos vendidos',
                    data: data.ventas,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            }
        };
        var miGrafico = new Chart(productos_vendidos, config);
    });
}
productosVendidos();

function graficasSemana(){
    return fetch('/graficasSemana')
    .then(response=>response.json())
}

function pedidosHechosFecha(){
    graficasSemana().then(data=>{
        var configuracion={
            type:'doughnut',
            data:{
                labels:data.dias,
                datasets:[{
                    label:'Pedidos Hechos por dia',
                    data: data.cantidad_dia,
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(195, 155, 211)',
                        'rgb(186, 74, 0 )',
                        'rgb(241, 148, 138)',
                        'rgb(212, 172, 13)'
                      ],
                      hoverOffset: 4
                }]
            }
        }
        var graficoPedidos = new Chart(pedidosHechosSemana, configuracion);
    })
}
pedidosHechosFecha();

function ventasTotalesFecha(){
    graficasSemana().then(data=>{
        var configuracionLineaSemana={
            type:'line',
            data:{
                labels:data.dias,
                datasets:[{
                    label:'Ventas Totales por dia',
                    data: data.ventasTotales,
                    backgroundColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            }
        }
        var graficoVentasTotalesSemana = new Chart(ventasTotalesSemana_v, configuracionLineaSemana);
    })
}
ventasTotalesFecha();

function graficasAño(){
    return fetch('/graficas')
    .then(response=>response.json())
}

function ventasTotalesAño(){
    graficasAño().then(data=>{
        var configuracionLineaAño={
            type:'line',
            data:{
                labels:data.mes,
                datasets:[{
                    label:'Ventas Totales por mes',
                    data: data.ventasTotales,
                    backgroundColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            }
        }
        var graficoVentasTotalesAño = new Chart(ventasTotalesAño_v, configuracionLineaAño);
    })
}
ventasTotalesAño();

function pedidosHechos_fecha(){
    graficasAño().then(data=>{
        var configuracionDonaAño={
            type:'doughnut',
            data:{
                labels:data.mes,
                datasets:[{
                    label:'Pedidos hechos por mes',
                    data: data.cantidadVentas,
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(195, 155, 211)',
                        'rgb(186, 74, 0 )',
                        'rgb(241, 148, 138)',
                        'rgb(212, 172, 13)'
                      ],
                      hoverOffset: 4
                }]
            }
        }
        var graficoVentasTotalesAño = new Chart(pedidosHechosAño_v, configuracionDonaAño);
    })
}
pedidosHechos_fecha();

// function graficasMes(){
//     return fetch('/graficasMes')
//     .then(response=>response.json())
// }


// function pedidosHechos_Mes(){
//     graficasMes().then(data=>{
//         var configuracionDonaMes={
//             type:'doughnut',
//             data:{
//                 labels:data.semananas,
//                 datasets:[{
//                     label:'Pedidos hechos por mes',
//                     data: data.cantidad,
//                     backgroundColor: [
//                         'rgb(255, 99, 132)',
//                         'rgb(54, 162, 235)',
//                         'rgb(255, 205, 86)',
//                         'rgb(195, 155, 211)',
//                         'rgb(186, 74, 0 )',
//                         'rgb(241, 148, 138)',
//                         'rgb(212, 172, 13)'
//                       ],
//                       hoverOffset: 4
//                 }]
//             }
//         }
//         var graficoPedidosHechossMes = new Chart(pedidosHechosMes_v, configuracionDonaMes);
//     })
// }

// pedidosHechos_Mes();

// function ventasTotalesMes(){
//     graficasMes().then(data=>{
//         var configuracionLineaMes={
//             type:'line',
//             data:{
//                 labels:data.semananas,
//                 datasets:[{
//                     label:'Ventas Totales por semana',
//                     data: data.ventasTotales,
//                     backgroundColor: 'rgb(75, 192, 192)',
//                     tension: 0.1
//                 }]
//             }
//         }
//         var graficoVentasTotalesMes = new Chart(ventasTotalesMes_v, configuracionLineaMes);
//     })
// }

// ventasTotalesMes();
