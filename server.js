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

const multer = require('multer');

const port = process.env.port || 3000;

app.use(logger('dev'));
//parsear la respuesta que traemos en formato json
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/password')(passport);

app.disable('x-powered-by');

app.set('port', port);


const upload = multer({
  storage: multer.memoryStorage()
});


usersrRoutes(app, upload);
categoriesRoutes(app);
productsRoutes(app, upload);


server.listen(3000, '192.168.1.10' || 'localhost', function () {
  console.log('http://localhost' + port + ' iniciada...');

});

app.get('/', (req, res) => {
  res.send('Ruta raiz del backend');
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.stack);
});

module.exports = {
  app: app,
  server: server
}