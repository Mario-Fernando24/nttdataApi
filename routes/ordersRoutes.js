const ordersController = require('../controllers/ordersController');
const passport = require('passport');

module.exports = (app) => {

    app.post('/api/orders/create',passport.authenticate('jwt',{session:false})  ,ordersController.create);
    app.get('/api/orders/findByStatus/:status',passport.authenticate('jwt',{session:false})  ,ordersController.findByStatus);
    app.put('/api/orders/updateToDespachado',passport.authenticate('jwt',{session:false})  ,ordersController.updateToDespachado);

    
}