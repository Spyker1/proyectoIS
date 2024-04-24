const path = require('path')
const hbs = require('hbs')

hbs.registerHelper('controlVista', (puesto) =>{
    return puesto === 'Administrador' ? true : false
});

hbs.registerHelper('formatoNumero', (num) => {
    if(!isNaN(num)){
        let n = 1
        let numeroString = String(num)
        let numeroNuevo = ''
        if(numeroString.length<=3){
            return numeroString.includes('.')? numeroNuevo = '$' + numeroString : numeroNuevo = '$' + numeroString.concat('.00');
        }else{
            if(numeroString.includes('.')){
                for (let i = numeroString.length-1; i >= 0; i--, n++) {
                    if(n>=3 && i > 0){
                        numeroString[i] != '.' ? numeroNuevo = numeroNuevo.concat(numeroString[i] + ',') : numeroNuevo = numeroNuevo.concat('.');
                        n=0;
                    }else if(numeroString[i] === '.' && n!==3){
                        let num = numeroNuevo.concat('.');
                        numeroNuevo = 0+num;
                        n=0;
                    }else{
                        numeroNuevo = numeroNuevo.concat(numeroString[i])
                    } 
            }
            return numeroNuevo.concat('$').split('').reverse().join('');
        }else{
                for (let i = numeroString.length-1; i >= 0; i--, n++) {
                    if(n>=3 && i > 0) { 
                        numeroNuevo = numeroNuevo.concat(numeroString[i] + ',') 
                        n=0
                    }else{
                        numeroNuevo = numeroNuevo.concat(numeroString[i])
                    } 
                }
                return numeroNuevo.concat('$').split('').reverse().join('').concat('.00')
            }   
        }
    }else{
        return num;
    }
})

hbs.registerHelper('esIgual', (val1, val2) => {
    return val1 === val2 ? true : false;
})

hbs.registerHelper("pagina",(link)=>{
    if(link.length>1){
        return link.substr(0,1)
    }else{
       return link
    }
    
})

hbs.registerHelper("numeroIgual", (n1, n2) =>{
    return n1==n2?true:false;
})
hbs.registerHelper("anterior",(link)=>{
    if(link.length>1){
        const actual=link.substr(0,1)
        if(actual==1){
            return false
        }else{
            anterior=parseInt(actual)-1;
            return anterior+link.substr(1,link.length)
        }
    }else{
        return false
    }
})

function createButton(param = {}) { //Función para crear botones dependiendo el nombre de la oclumna que se tenga-
    // Se recibira el nombre de la columna y el nombre de las columnas que queremos que tengan boton
    if(param.aceptados.includes(param.nombre))return true
    else return false
}

hbs.registerHelper('columnas',(tabla, orden)=>{
    let columnas=[]
    let html='';
    switch(tabla){
        case 'vacantes':
            columnas.push({nombre:'ID', id:'idVac'},{nombre:'Vacante', id: 'nombreVac'},
                          {nombre:'Empresa', id: 'empresaVac'},{nombre:'Sucursal', id: 'sucursalVac'},
                          {nombre:'Area laboral', id: 'areaVac'},{nombre: 'Jornada', id: 'jornadaVac'},
                          {nombre: 'Salario', id: 'salarioVac'},{nombre:'Fecha de publicación', id: 'fechaVac'},
                          {nombre:'Estatus', id: 'estatusVac'},{nombre:'Opciones', id: 'Vac'})
        break;
        case 'empresas':
            columnas.push({nombre:'ID', id:'idEmp'},{nombre:'Empresa', id:'nombreEmp'},
                          {nombre:'Dirección', id:'direccionEmp'},{nombre:'Fecha de creación', id:'fechaEmp'},
                          {nombre:'Estatus', id:'estatusEmp'},{nombre:'Opciones', id:'accionesEmp'})
        break;
    }
    columnas.forEach((elemento)=>{
        html+=`<th scope="col" class=""
            onclick="if (!window.__cfRLUnblockHandlers) return false; ordenamiento('${elemento.nombre}')">
            <div class="d-flex gap-10">
                <div class="d-flex align-items-center">${elemento.nombre}</div>
                <!-- <small>${orden.split('-')}</small> --> 
                <div class="orden-info">
                ${createButton({nombre: elemento.nombre, aceptados: ['ID', 'Salario', 'Vacante', 'Empresa', 'Fecha de creación', 'Fecha de publicación']})
                ? `<button class="toggle-info btn text-white" onclick="ordenFiltro({id: '${elemento.id}',nombre: '${elemento.nombre}'})"><i id='${elemento.id}'
            
                ${ orden.includes(elemento.nombre == 'Fecha de publicación' ? 'publicacion':
                    elemento.nombre == 'Fecha de creación'? 'creacion': elemento.nombre )?`class= 'bx bx-sort-down'`:
                      `class= 'bx bx-sort-up'` }
                ></i></button>`: ''}         
                </div>
            </div>
        </th>` 
    })

    return html;
})

hbs.registerHelper('eq',(valor1,valor2)=>{
    if(valor1==valor2){
        return true
    }else{
        return false
    }
})

hbs.registerHelper('lon',(valor1,valor2)=>{
    const indice=(valor1+1)==valor2?true:false;
    return indice;
})

hbs.registerHelper('inc',(valor1)=>{
    return valor1+1
})