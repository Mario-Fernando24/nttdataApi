const productsController = require('../controllers/productsController');
const passport = require('passport');

module.exports = (app,upload) => {

    //ruta para crear una categoria nueva
    app.post('/api/product/create',upload.array('image',3),productsController.create);
    app.get('/api/product/findByProducts/:id_category' ,productsController.findByProducts);
    app.get('/api/product/findByProductSearch/:id_category/:name'  ,productsController.findByProductSearch);
    app.get('/api/product/getAllProducts',productsController.getAllProducts);

}