function fecha(){
    var moment = require('moment');
    moment.locale('es-mx');
    var now = moment().format("YYYY/MM/DD HH:mm:ss");
    return now;
}



module.exports={
    fecha
}