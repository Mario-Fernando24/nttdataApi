const Category = require('../models/category');
const jwt = require('jsonwebtoken');
const storage = require('../utils/cloud_storage');


//exportar un objeto compelto
module.exports ={

    
        //funcion para agregar las categoria recibimos el request del usuario
    create(req, res){
        const category = req.body;

        Category.findByName(category, (validate)=>{

            if(validate){
               
                    Category.create(category, (err, id_category)=>{

                        if(err){
                            return res.status(501).json({
                                success: false,
                                message: 'Hubo un error interno, por favor intentar mas tarde',
                                error: err
                            });
                        } 
                    
                        return res.status(201).json({
                            success: true,
                            message: 'Se creo correctamente la categoria',
                            data: `${id_category}` // id del nuevo usuario que se registro
                        });
                    });
            

            }else{
                return res.status(401).json({
                    success: false,
                    message: 'La categoria ya esta registrada\n',
                });
            }
           
        });

           

    },



    getAllCategory(req, res){
       
        Category.getAllCategory((err, data)=>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error interno, por favor intentar mas tarde',
                    error: err
                });
            } 

            return res.status(201).json(data);
        });
    },


    updateCate(req, res){
            
        const catego = req.body;

     

        Category.updateCategory(catego, async (err, id)=>{
            
            if(err){
                return res.status(501).json({
                    success: false,
                    message: ' Hubo un error al actualizar la categoria',
                    error: err
                });
            }

                 
            return res.status(201).json({
                success: true,
                message: 'categoria actualizada correctamente',
                data: `${id}` // id del nuevo usuario que se registro
            });

        })

     },
}