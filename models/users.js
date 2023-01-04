const db = require('../config/config');
const bcrypt = require('bcryptjs');
const User = {};

User.findById = (id,result)=>{
    
    const sql =`SELECT 
    U.id,
    U.email,
    U.name,
    U.lastname,
    U.phone,
    U.image,
    U.passwordd,
    JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', CONVERT(R.id, char),
                    'name', R.name,
                    'image', R.image,
                    'route', R.route
                )
            ) AS roles
            
    FROM users AS U 
    INNER JOIN user_has_roles UHR ON UHR.id_user=U.id
    INNER JOIN roles AS R ON UHR.id_rol=r.id
    WHERE U.id=?
    GROUP BY U.id`;

    db.query( sql,[id],
        (err, userss) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del nuevo usuario:', userss);
                result(null, userss);
            }
        }
    )
}




User.findByEmail = (email,result)=>{
    
    const sql =`SELECT 
                U.id,
                U.email,
                U.name,
                U.lastname,
                U.phone,
                U.image,
                U.passwordd,
                JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'id', CONVERT(R.id, char),
                                'name', R.name,
                                'image', R.image,
                                'route', R.route
                            )
                        ) AS roles
                        
                FROM users AS U 
                INNER JOIN user_has_roles UHR ON UHR.id_user=U.id
                INNER JOIN roles AS R ON UHR.id_rol=r.id
                WHERE U.email=?
                GROUP BY U.id`;

    db.query( sql,[email],
        (err, userss) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del nuevo usuario:', userss[0]);
                result(null, userss[0]);
            }
        }
    )
}



User.create = async (user, result) => {

    //encriptar contraseña y paso el hast
    const hash = await bcrypt.hash(user.passwordd,10);

    const sql = `
        INSERT INTO
            users(
                email,
                name,
                lastname,
                phone,
                image,
                passwordd,
                created_at,
                updated_at
            )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query
    (
        sql,
        [
            user.email,
            user.name,
            user.lastname,
            user.phone,
            user.image,
            hash,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del nuevo usuario:', res.insertId);
                result(null, res.insertId);
            }
        }
    )

}


//METODO PARA ACTUALIZAR LOS DATOS DEL PERFIL DEL CLIENTE
User.updateWhithImage=(user, result) =>{
   
    

    const sql = `
    UPDATE 
   users
    SET
   name= ?,
   lastname= ?,
   phone=?,
   image=?
   WHERE
    id =?
    `;


db.query
(
sql,
[
    user.name,
    user.lastname,
    user.phone,
    user.image,
    user.id
],
(err, res) => {

    if (err) {
        console.log('Error:', err);
        result(err, null);
    }
    if(res["affectedRows"]>0){
        result(user.id, true);
    }
    else {
        //si la respuesta es valida que me envie un true
        result(err, false);
    }
}
)



}


User.updateSinImage=(user, result) =>{
    
    
 
    const sql = `
        UPDATE 
       users
        SET
       name= ?,
       lastname= ?,
       phone=?
       WHERE
        id =?
        `;


db.query
(
    sql,
    [
        user.name,
        user.lastname,
        user.phone,
        user.id
    ],
    (err, res) => {
   
        if (err) {
            console.log('Error:', err);
            result(err, null);
        }
        if(res["affectedRows"]>0){
            result(user.id, true);
        }
        else {
            //si la respuesta es valida que me envie un true
            result(err, false);
        }
    }
)
}


 
    //CONSULTA PARA LISTAR LOS DOMICILIARIO
    User.findListarDomiciliario = (result) =>{

            const sql = `   
            SELECT 
            CONVERT(U.id, char) AS id,
            U.email,
            U.name,
            U.lastname,
            U.phone,
            U.image,
            U.passwordd
            FROM users AS U
            INNER JOIN user_has_roles AS UHR
            ON UHR.id_user=U.id
            INNER JOIN roles AS R
            ON R.id=UHR.id_rol
            WHERE R.id=2`;

             db.query
            (
                sql,
                (err, data) => {
            
                    if (err) {
                        console.log('Error:', err);
                        result(err, null);
                    }
                    else{
                        result(null, data);
                    }
                    
                }
            )

}

module.exports = User;