const Address = require('../models/address');
const jwt = require('jsonwebtoken');

module.exports ={

    getAddress(req, res){
        const id_address_parametro=69;

        console.log("=================================");
        console.log(id_address_parametro);
        console.log("=================================");



         Address.getAllAddress(id_address_parametro,(err, data)=>{
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


    create(req, res){
        const address = req.body;

        
        Address.create(address, (err, id_address)=>{

                        if(err){
                            return res.status(501).json({
                                success: false,
                                message: 'Hubo un error interno, por favor intentar mas tarde',
                                error: err
                            });
                        } 
                    
                        return res.status(201).json({
                            success: true,
                            message: 'Se creo correctamente la dirección del usuario',
                            data: `${id_address}` // id del nuevo usuario que se registro
                        });
                    });   

         }

}