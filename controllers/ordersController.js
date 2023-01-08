const Order = require('../models/orders');
const OrderHasProducts = require('../models/orders_has_products');
const jwt = require('jsonwebtoken');
const storage = require('../utils/cloud_storage');


module.exports ={




    findByDeliveryIdStatus(req, res){
   
    
        const status = req.params.status;
        const id_domiciliario = req.params.id_domiciliario;

   

       
        Order.ordersDomiciliarioIdStatus(id_domiciliario,status,(err, data)=>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: ' Hubo un error al momento de mostrar las ordenes del domiciliario',
                    error: err
                });
            }

            for(const d of data){
                d.domiciliario_json = JSON.parse(d.domiciliario_json)
                d.direccion_json = JSON.parse(d.direccion_json)
                d.cliente_json = JSON.parse(d.cliente_json)
                d.produc = JSON.parse(d.produc)

                
            }
            return res.status(201).json(data);
        });
    
    },



    findByStatus(req, res){
   
    
        const status = req.params.status;
       
        Order.findByStatus(status,(err, data)=>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: ' Hubo un error al momento de listar las ordenes del usuario',
                    error: err
                });
            }

            for(const d of data){
                d.domiciliario_json = JSON.parse(d.domiciliario_json)
                d.direccion_json = JSON.parse(d.direccion_json)
                d.cliente_json = JSON.parse(d.cliente_json)
                d.produc = JSON.parse(d.produc)

                
            }

        
            return res.status(201).json(data);
        });
    
    },

    async create(req, res){


        const orden = req.body;

            Order.create(orden, async (err, id_orden)=>{

                        if(err){
                            return res.status(501).json({
                                success: false,
                                message: ' Hubo un error al momento de crear la orden',
                                error: err
                            });
                        }
                        
                        //recorro de la orden los producto que voy a guardar en order_has_products
                        for(const product of orden.produc){
                            
                            await OrderHasProducts.create(id_orden,product.id,product.quantity,(err,id_data)=>{

                                if(err){
                                    return res.status(501).json({
                                        success: false,
                                        message: ' Hubo un error con la creación de los productos en la orden',
                                        error: err
                                    });
                                }

                            });

                        }

                          
                        return res.status(201).json({
                            success: true,
                            message: 'La orden se ha creado correctamente',
                            data: `${id_orden}` // id del nuevo usuario que se registro
                        });


                    
                    });
           
         },

         updateToDespachado(req, res){
            
            const orden = req.body;

             Order.updateToDespachado(orden.id,orden.id_domiciliario, async (err, id_orden)=>{
                
                if(err){
                    return res.status(501).json({
                        success: false,
                        message: ' Hubo un error con despachar la orden',
                        error: err
                    });
                }

                     
                return res.status(201).json({
                    success: true,
                    message: 'Orden actualizada a despachado',
                    data: `${id_orden}` // id del nuevo usuario que se registro
                });

            })

         },

         updateToIniciandoEntrega(req, res){
            
            const orden = req.body;

             Order.updateToEntregado(orden.id, async (err, id_orden)=>{
                
                if(err){
                    return res.status(501).json({
                        success: false,
                        message: ' Hubo un error con despachar la orden',
                        error: err
                    });
                }

                     
                return res.status(201).json({
                    success: true,
                    message: 'Iniciando entrega...',
                    data: `${id_orden}` // id del nuevo usuario que se registro
                });

            })

         }

         
        
       
         


}