const categoriesController = require('../controllers/categoriesController');
const passport = require('passport');

module.exports = (app) => {

    app.get('/api/category/getAllCategory',passport.authenticate('jwt',{session:false})  ,categoriesController.getAllCategory);
    //ruta para crear una categoria nueva
    app.post('/api/category/create',passport.authenticate('jwt',{session:false})  ,categoriesController.create);
    app.put('/api/category/update',passport.authenticate('jwt',{session:false})  ,categoriesController.updateCate);

}