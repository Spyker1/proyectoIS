const sql = require("mssql");
const { fecha } = require("../extras/fecha");
let sqlConfig = {};

if (process.env.CONN_BASE) {
  sqlConfig = process.env.CONN_BASE;
} else {
  sqlConfig = require("./credenciales");
}

let sqlConn = new sql.ConnectionPool(sqlConfig, (err) => {
  let date=fecha();
  if (err) {
    console.log("No se pudo conectar a la BD, volviendo a intentar...");
    connectSQL();
  } else {
    
    console.log("Conectado a la BD", date);
  }
});

let connectSQL = () => {
  let date=fecha();
  sqlConn
    .connect()
    .then(() => {
      console.log("Conectado a la BD");
    })
    .catch((err) => {
      if (err) {
        console.log(
          "No se pudo conectar a la BD, volviendo a intentar...",
          date,
          err
        );
        setTimeout(() => {
          connectSQL();
        }, 2500);
      }
    });
};

module.exports = {
  sqlConn,
  sql,
  sqlConfig
};
