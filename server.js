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

//traemos el paquete socket y lo inicializamos con el servidor
const io = require('socket.io')(server);


  const mercadopago = require('mercadopago');
   
  mercadopago.configure({
        sandbox: true,
        //prueba
         access_token: 'TEST-3169176000815274-011902-493c596b84c9c44313b2af322d409570-1133725316'
        //produccion
      // access_token: 'APP_USR-3169176000815274-011902-c5a1554b6c735dbabcce47685b2d5b05-1133725316' 
    });




//Aqui se va a importar las rutas
const usersrRoutes = require('./routes/userRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const productsRoutes = require('./routes/productsRoutes');
const addressRoutes = require('./routes/addressRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const mercadoPagoRoutes = require('./routes/mercadoPagoRoutes');

//**************************************** */

//importamos los socket
const ordersSocket = require('./sockets/ordersSockets');

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

 
//llamados a los socket
ordersSocket(io);

// const hostname = 'localhost';

//imagenes 
    //"socket.io": "^2.4.1"
const upload = multer({
  storage:multer.memoryStorage()
});


//Aqui se va a importar las rutas le pasamos como parametro la aplicacion
usersrRoutes(app,upload);
categoriesRoutes(app);
productsRoutes(app,upload);
addressRoutes(app);
ordersRoutes(app);
mercadoPagoRoutes(app);

//********************************************** */

server.listen(3000,'192.168.1.8' || 'localhost', function(){
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

module.exports = {
  app: app,
  server: server
}