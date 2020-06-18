//importacion de librerias
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require ('dotenv').config({path: 'variables.env'});
//Cors permite que un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require('cors');

//conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.BD_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


//crear la app
const app = express();

//carpeta publica
app.use(express.static('uploads'));

//habilitar el body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//definir un dominio o dominios para recibir las peticiones
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: (origin, cb) => {
        //revisar si la peticion viene de un servidor en whitelist
        const existe = whitelist.some(dominio => dominio === origin);
        if(existe){
            cb(null, true);
        }else{
            cb(new Error('No permitido por CORS'));
        }
    }
}

//Habilitar cors
app.use(cors(corsOptions));

//rutas de la app
app.use('/', routes());

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

//iniciar ap
app.listen(port, host, () => {
    console.log('El servidor esta funcionando y listo');
});