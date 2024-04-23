const aleatorio = (inferior = 1000, superior = 9999) => {
    var numPosibilidades = superior - inferior;
    var aleatorio = Math.random() * (numPosibilidades + 1);
    aleatorio = Math.floor(aleatorio);
    return inferior + aleatorio;
    }

    
module.exports = aleatorio;