const addressController = require('../controllers/addressController');
const passport = require('passport');

module.exports = (app) => {

    app.get('/api/address/getByfind/:id_user',passport.authenticate('jwt',{session:false}) ,addressController.getAddress);
    app.post('/api/address/create',passport.authenticate('jwt',{session:false})  ,addressController.create);
    
}