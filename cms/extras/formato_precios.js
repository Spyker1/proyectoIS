function formatoNumeros (num) {
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
                    }
                    else{
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
} else{
    return num;
}
}

module.exports = formatoNumeros