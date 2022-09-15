const Product = require('../models/products');
const jwt = require('jsonwebtoken');
const storage = require('../utils/cloud_storage');
const asyncForeach = require('../utils/async_foreach');


//exportar un objeto compelto
module.exports ={

  
findByProducts(req, res){

    //parametro de la categoria que nos envian por parametro para mostrar todos los productos relacionados a esa categoria
    const id_category_parametro=req.params.id_category;

    Product.findByProducts(id_category_parametro,(err, data)=>{
        if(err){
            return res.status(501).json({
                success: false,
                message: 'Hubo un error interno, por favor intentar mas tarde',
                error: err
            });
        } 

        if(data!=""){
            return res.status(201).json(data);
        }else{
            return res.status(400).json({
                success: false,
                message: 'Categoria no tiene productos disponibles',
            });
        }
    });
},
    
//funcion para agregar un nuevo producto recibimos el request del usuario
 create(req, res){
       // const product = req.body;
        const product = JSON.parse(req.body.product); // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE

        Product.findByName(product, async (validate)=>{

            if(validate){
                const files = req.files;
                //cuanta cuantas imagenes estan almacenada
                let inserts=0;

                if(files.length===0){

                    return res.status(501).json({
                        success: false,
                        message: 'Error al registrar el producto, no tiene imagenes',
                    });

                }else{

                    Product.create(product, (err, id_product)=>{

                        if(err){
                            return res.status(501).json({
                                success: false,
                                message: 'Hubo un error interno, por favor intentar mas tarde',
                                error: err
                            });
                        } 

                        product.id=id_product;
                        
                        //variable que ejecutara las variables asincronas
                        const startt = async ()=>{
                            //llamo a la funcion que recibe los archivos
                            await asyncForeach(files,async(file)=>{
                                const path = `image_${Date.now()}`;
                                const url = await storage(file, path);
                    
                                if (url != undefined && url != null) {
                                    if(inserts===0){ //se inserta la imagen numero 1
                                        product.image1=url;
                                    }
                                    if(inserts===1){ //se inserta la imagen numero 2
                                        product.image2=url;
                                    }
                                    if(inserts===2){ //se inserta la imagen numero 3
                                        product.image3=url;
                                    }
                                }

                                await Product.update(product,(err,data)=>{
                                    if(err){
                                        return res.status(501).json({
                                            success: false,
                                            message: 'Hubo un error interno, por favor intentar mas tarde',
                                            error: err
                                        });
                                    } 
                                    inserts=inserts+1;
                                    //termino de almacenar las 3 imagenes
                                    if(inserts==files.length){
                                        return res.status(201).json({
                                            success: true,
                                            message: 'Se creo correctamente el producto',
                                            data: `${id_product}` // id del nuevo usuario que se registro
                                        });
                                    }
                                });

                            });
                        }  

                        startt();
                    });

                }
        
            

                }else{
                    return res.status(401).json({
                        success: false,
                        message: 'El producto ya esta registrada\n',
                    });
                }
               
            });
            
    }



    
}