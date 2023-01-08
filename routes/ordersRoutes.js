const ordersController = require('../controllers/ordersController');
const passport = require('passport');

module.exports = (app) => {

    app.post('/api/orders/create',passport.authenticate('jwt',{session:false})  ,ordersController.create);
    app.get('/api/orders/findByStatus/:status',passport.authenticate('jwt',{session:false})  ,ordersController.findByStatus);
    app.put('/api/orders/updateToDespachado',passport.authenticate('jwt',{session:false})  ,ordersController.updateToDespachado);
    app.put('/api/orders/updateToIniciandoEntrega',passport.authenticate('jwt',{session:false})  ,ordersController.updateToIniciandoEntrega);

    app.get('/api/orders/findByDeliveryIdStatus/:id_domiciliario/:status',passport.authenticate('jwt',{session:false})  ,ordersController.findByDeliveryIdStatus);

    
    
}