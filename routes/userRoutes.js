const usersController = require('../controllers/usersController');

//paquete para restringir las url por medio del token
const passport = require('passport');

module.exports = (app, upload) => {
    //le decimos que envie una imagen upload.array('image',1)
    app.post('/api/users/create',usersController.register);
    app.post('/api/users/login', usersController.login);
    app.post('/api/users/createWithImage',upload.array('image',1) ,usersController.registerWithImage);

    //,passport.authenticate('jwt',{session:false}) para que las url esten restringidas y puedan acceder por medio del token
    //ruta para actualizar el perfil sin imagenes
    app.put('/api/users/updateSinImagenes',passport.authenticate('jwt',{session:false}) ,usersController.updateProfileUsersSinImagenes);
    //ruta para actualizar el perfil con imagenes
    app.put('/api/users/updateWithImage',passport.authenticate('jwt',{session:false}) ,upload.array('image',1) ,usersController.updateProfileUsersWhithImage);
    //listar los domiciliario
    app.get('/api/users/findListarDomiciliario',passport.authenticate('jwt',{session:false}) ,upload.array('image',1) ,usersController.findListarDomiciliario);
    //ruta para las notificaciones
    app.put('/api/users/updateNotification',passport.authenticate('jwt',{session:false}) ,usersController.updateNotificationToken);

}

