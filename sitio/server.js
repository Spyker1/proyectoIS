const express=require('express');
const hbs=require('hbs');
const path=require('path');
const fileUpload = require('express-fileupload');

const app=express();
const init = require('./config/sesion_seq');

const port=process.env.PORT || 3000

app.set('view engine','hbs');
app.set('views',path.join(__dirname,'./views'));
hbs.registerPartials(path.join(__dirname, `./views`));
hbs.registerPartials(path.join(__dirname, `./views/partials`));
require('./helpers/general')

// Configurar body-parser para manejar datos de formularios
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: false }));

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

app.use(express.json());
app.use(express.static(path.join(__dirname,'./assets')));
app.use('/producto',express.static(path.join(__dirname,'./Productos')));
app.use(init())
app.use(require('./routes/rt_index'))


app.listen(port,()=>{
    console.log(`Link del servidor http://localhost:${port}`)
})