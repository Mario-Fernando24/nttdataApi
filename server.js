//instanciamos express
const express = require('express');
//ejecutando express para inicializar nuestra app   npm i express
const app = express();
//instalamos   npm i http
const http = require('http');
//inicializa
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
//Aqui se va a importar las rutas
const usersrRoutes = require('./routes/userRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const productsRoutes = require('./routes/productsRoutes');
const addressRoutes = require('./routes/addressRoutes');
const ordersRoutes = require('./routes/ordersRoutes');

//**************************************** */

const multer = require('multer');


const port = process.env.port || 3000;

//debuger los posibles errores
app.use(logger('dev'));
//parsear la respuesta que traemos en formato json
app.use(express.json());
app.use(express.urlencoded({
  extended:true
}));

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/password')(passport);

app.disable('x-powered-by');

app.set('port',port);
const hostname = 'localhost';

//imagenes
const upload = multer({
  storage:multer.memoryStorage()
});


//Aqui se va a importar las rutas le pasamos como parametro la aplicacion
usersrRoutes(app,upload);
categoriesRoutes(app);
productsRoutes(app,upload);
addressRoutes(app);
ordersRoutes(app);

//********************************************** */

server.listen(3000,'192.168.1.5' || 'localhost', function(){
    console.log('http://localhost'+port+ ' iniciada...');
    
}); 
//192.168.61.251:3000
//ruta raiz
app.get('/',(req, res) => {
  
   res.send('Ruta raiz del backend');
});

//MANEJO DE ERRORES
app.use((err, req, res, next)=>{

    res.status(err.status || 500).send(err.stack);
});