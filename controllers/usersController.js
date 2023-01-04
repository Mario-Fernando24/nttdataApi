const User = require('../models/users');
const Roles = require('../models/roles');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage');
const { use } = require('passport');



//exportar un objeto compelto
module.exports ={


    login(req, res){
         const email =req.body.email;
         const passwordd = req.body.passwordd;

         User.findByEmail(email,async (err, myusers) =>{
            //si se ejecuto un error
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error interno, por favor intentar mas tarde',
                });
            } 
            if(!myusers){
                // no autorizada
                 return res.status(401).json({
                     success: false,
                     message: 'El email no fue encontrado',
                 });
             }

             //validamos si la contraseña es igual que la contraseña encriptada de la data
             const isPasswordValid = await bcrypt.compare(passwordd,myusers.passwordd);

             if(isPasswordValid){
                const token = jwt.sign({id: myusers.id, email: myusers.email}, keys.secreOrKey,{});
               
                const data = {
                    id: `${myusers.id}`,
                    name: myusers.name,
                    lastname: myusers.lastname,
                    email: myusers.email,
                    phone: myusers.phone,
                    image: myusers.image,
                    session_token: `JWT ${token}`,
                    roles:JSON.parse(myusers.roles)
                }

                // envio la data a flutter
                return res.status(201).json({
                    success: true,
                    message: 'Se autentico correctamente',
                    data: data //id del nuevo usuario que se registro
                });

             }else{
                 // no autorizada
                 return res.status(401).json({
                    success: false,
                    message: 'La contraseña no fue encontrada'
                });
             }

        } )
    },
    
    register(req, res){

        //capturo los datos que me envie la app de flutter
        const user =   req.body;
        
      
        User.create(user, (err, data) =>{
            //si se ejecuto un error
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario'
                });
            }else{
                return res.status(201).json({
                    success: true,
                    message: 'Se agrego correctamente el usuario',
                    data: data //id del nuevo usuario que se registro
                });
            }
        });
    },


    async registerWithImage(req, res) {

       
        const user = JSON.parse(req.body.user); // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
        const files = req.files;

        if (files.length > 0) {
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);

            if (url != undefined && url != null) {
                user.image = url;
            }
        }

        User.create(user, (err, data) => {
        
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }

            user.id = data;


            //creamos el rol del usuario con el rol numero 3 "Cliente"
            Roles.create(user.id,3);

            const tokenn = jwt.sign({id: data, email: user.email}, keys.secreOrKey,{});
               
            const dataaaaa = {
                id: `${user.id}`,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                phone: user.phone,
                image: user.image,
                session_token: `JWT ${tokenn}`
            }

                return res.status(201).json({
                    success: true,
                    message: 'El registro se realizo correctamente',
                    data: dataaaaa
                });
           
            }
           
        )},


        //FUNCION PARA ACTUALIZAR EL PERFIL DEL USUARIO CON IMAGEN
        async updateProfileUsersWhithImage(req, res) {

       
            const user = JSON.parse(req.body.user); // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
            const files = req.files;
    
            if (files.length > 0) {
                const path = `image_${Date.now()}`;
                const url = await storage(files[0], path);
    
                if (url != undefined && url != null) {
                    user.image = url;
                }
            }

           
            User.updateWhithImage(user, (userId, validatee) => {
             
            
                if (!validatee) {
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error al momento de actualizar su perfil',
                       // error: err
                    });
                }
        
                 if(validatee){
                    //envio el id del usuarip y obtengo la data del usuario para regresarlo en la API
                    User.findById(userId, (err, userData)=>{

                     
                        const dataaaaaa = {
                            id: `${userData[0]["id"]}`,
                            name: userData[0]["name"],
                            lastname: userData[0]["lastname"],
                            email: userData[0]["email"],
                            phone: userData[0]["phone"],
                            image: userData[0]["image"],
                            roles: JSON.parse(userData[0]["roles"])
                        }

                    return res.status(201).json({
                        success: true,
                        message: 'Perfil actualizado correctamente',
                        data: dataaaaaa
                    });  
       
                })

                 }else{
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error al momento de actualizar su perfil',
                       // error: err
                    });
                 }
               
                }
            )},
    
        
    
//FUNCION PARA ACTUALIZAR EL PERFIL DEL USUARIO SIN IMAGENES
async updateProfileUsersSinImagenes(req, res) {

       
  console.log(req.body);

    const user = req.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE PARA ACTUALIZAR EL PERFIL
  
    User.updateSinImage(user, (respuesta, validate) => {
    
        if (!validate) {
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al momento de actualizar su perfil',
               // error: err
            });
        }

     
         if(validate){

            User.findById(respuesta, (err, user)=>{

                console.log("problema");
              
                const dataaaaa = {
                    id: `${user[0]["id"]}`,
                    name: user[0]["name"],
                    lastname: user[0]["lastname"],
                    email: user[0]["email"],
                    phone: user[0]["phone"],
                    image: user[0]["image"],
                    roles: JSON.parse(user[0]["roles"])
                }
             return res.status(201).json({
                success: true,
                message: 'Perfil actualizado correctamente',
                data: dataaaaa
            });  
            })

           
         }else{
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al momento de actualizar su perfil',
               // error: err
            });
         }
       
        }
    )},


     findListarDomiciliario(req, res){
          
        User.findListarDomiciliario((err, data)=>{
            
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar los domiciliario',
                    error: err
                });
            }
            return res.status(201).json(data);


        })
    }





    
        }
        
    




