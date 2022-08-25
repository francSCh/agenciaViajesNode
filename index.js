import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

//Nos conectamos a la base de datos
db.authenticate()
    .then( () => console.log('Base de datos conectada'))
    .catch(error => console.log(error));

const port = process.env.PORT || 4000; //Definimos el puerto

app.set('view engine','pug');

app.use((req,res,next) => {
    res.locals.actualYear = new Date().getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';
    next();
}); 
app.use(express.urlencoded({ extended: true })); //Agregar body parser para leer los datos del formulario
app.use(express.static('public')); //Definimos la carpeta pública
app.use('/',router); //agregar el router

app.listen(port,() => {
    console.log(`El servidor está funcionando en el puerto ${port}`);
});