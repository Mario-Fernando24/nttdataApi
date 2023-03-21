const mercadoPago = require('mercadopago');
const Order = require('../models/orders');
const OrderHasProducts = require('../models/orders_has_products');
const User = require('../models/users')
const PushNotificationController = require('../controllers/pushNotificationController');


  mercadoPago.configure({
    sandbox: true,
    access_token: 'TEST-3169176000815274-011902-493c596b84c9c44313b2af322d409570-1133725316'
  });



  module.exports = {
     
    async createPayments(req, res){

        let payments = req.body;

        console.log(payments);

        const payment_data = {
            //token que nos envia el client
            token: payments.token,
            //
            issuer_id: payments.issuer_id,
            payment_method_id: payments.payment_method_id,
            //cantidad a pagar
            transaction_amount: payments.transaction_amount,
            //pago
            installments: payments.installments,
            //descripcion
            description: "",
            payer: {
                //email del cliente que paga
              email:payments.payer.email ,
              //solo se coloca esto es colombia, mexico y otros paises se omiten tipo de documento y numero de documento
              identification: {
                type: payments.payer.identification.type,
                number: payments.payer.identification.number
              },
            },
          }

          // le paso la data de la transaccion
          const data = await mercadoPago.payment.create(payment_data).catch((err)=>{

              console.log('error de mercado pago', err);
              return res.status(501).json({
                success: false,
                message: 'Error al crear el pago',
                error: err
            });
        });

        if (data.body !== null && data.body !== undefined) {
            console.log("Los datos del cliente son correcto", data);
            const orden= payments.order;
            
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
                            console.log('mario fernando muñoz 9');

                            return res.status(501).json({
                                success: false,
                                message: ' Hubo un error con la creación de los productos en la orden',
                                error: err
                            });
                        }
                    });
                }


                User.findNotificationMultipleDeviceAdmin((err, userss)=>{

                    console.log('======NOTIFICATION TOKEN======');
                    console.log( userss[0]);
                    console.log('======NOTIFICATION TOKEN======');

            
                    if (userss[0] !== undefined && userss[0] !== null) {

                        if(userss.length>0){

                            let tokens=[];

                            userss.array.forEach(element => {
                                tokens.push(element.notification_token)
                            });

                            console.log(tokens);

                            PushNotificationController.sendNotificationToMultipleDevice(tokens, {
                                title: 'COMPRA REALIZADA',
                                body: 'Un cliente ha realizado una compra',
                                id_notification: '2'
                            });

                        }
                        
                       
                    }
                });


                console.log('mario fernando muñoz 1');
  
                return res.status(201).json({
                    success: true,
                    message: 'La orden se ha creado correctamente',
                    data: data.response
                });
            });
            
        }

    },


    async createPaymentsCash(req, res){

        let paymentsCash = req.body;

        const orden= paymentsCash.order;
       
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
                            console.log('mario fernando muñoz 9');

                            return res.status(501).json({
                                success: false,
                                message: ' Hubo un error con la creación de los productos en la orden',
                                error: err
                            });
                        }
                    });
                }
                
                User.findNotificationMultipleDeviceAdmin((err, userss)=>{

                    console.log('======NOTIFICATION TOKEN======');
                    console.log( userss[0]);
                    console.log('======NOTIFICATION TOKEN======');

            
                    if (userss[0] !== undefined && userss[0] !== null) {

                        if(userss.length>0){

                            let tokens=[];

                            userss.forEach(element => {
                                tokens.push(element.notification_token)
                            });

                            console.log(tokens);

                            PushNotificationController.sendNotificationToMultipleDevice(tokens, {
                                title: 'COMPRA REALIZADA',
                                body: 'Un cliente ha realizado una compra',
                                id_notification: '2'
                            });

                        }
                        
                       
                    }
                });
  
                return res.status(201).json({
                    success: true,
                    message: 'La orden se ha creado correctamente',
                });
            });
            
        }

    }

  