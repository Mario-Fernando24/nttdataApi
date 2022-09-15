const productsController = require('../controllers/productsController');
const passport = require('passport');

module.exports = (app,upload) => {

    //ruta para crear una categoria nueva
    app.post('/api/product/create',passport.authenticate('jwt',{session:false}),upload.array('image',3),productsController.create);
    app.get('/api/product/findByProducts/:id_category',passport.authenticate('jwt',{session:false})  ,productsController.findByProducts);

    
}