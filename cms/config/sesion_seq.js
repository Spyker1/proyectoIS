const session = require("express-session");
const Sequelize = require("sequelize");
const SequelizeStorage = require("connect-session-sequelize")(session.Store);

const init = () => {
  if (process.env.CONN_BASE_) {
    const sequelizeStorage = new SequelizeStorage({
      db: new Sequelize('CARTILLA', 'sa', 'sasa', {
        host: 'localhost',
        port: 1433,
        dialect: "mssql",
        logging: false,
        acquire: 20000,
        dialectOptions: {
          options: {
            encrypt: true,
          },
        },

        define: {
          tableName: "SESIONES_CMS_T",
        },
      }),

      tableName: "SESIONES_CMS_T",
      checkExpirationInterval: 5000,
      expiration: 1000 * 60 * 40,
    });

    sequelizeStorage.sync();

    return session({
      key: "user_sid",
      secret: "keyboard cat",
      resave: true,
      saveUninitialized: false,
      rolling: true,
      store: sequelizeStorage,
    });
  } else {
    const sequelizeStorage = new SequelizeStorage({
      db: new Sequelize('CARTILLA', 'sa', 'sasa',
        {
          host: 'localhost',
          port: 1433,
          dialect: "mssql",
          logging: false,
          acquire: 20000,
          dialectOptions: {
            options: {
              encrypt: true,
            },
          },
          define: {
            tableName: "SESIONES_CMS_T",
          },
        }
      ),
      tableName: "SESIONES_CMS_T",
      checkExpirationInterval: 5000,
      expiration: 1000 * 60 * 40,
    });
    sequelizeStorage.sync();

    return session({
      key: 'user_sid',
      secret: ' randCat ',
      resave: true,
      saveUninitialized: false,
      rolling: true,
      store: sequelizeStorage,
    });
  }
};

module.exports = init;
