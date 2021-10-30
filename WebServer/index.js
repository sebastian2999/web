const express = require('express');
const path = require('path');
const session = require('express-session');
const morgan = require('morgan')


//Aplicación de express
const app = express();

//Cargar archivos estáticos

app.use(express.static('public'));

//Habilitar views
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//Habilitar body parser : Leer datos de formulario
app.use(morgan('dev')); //se indica que se va a usar morgan en modo dev
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Habilitar middleware de session

app.use(session({
    secret: 'session-1',
    resave: false,
    saveUninitialized: false
}));

//Rutas
app.use(require('./src/rutas/index.js'));

app.listen(8080);
console.log("Servidor corriendo el puerto 8080");
