//obtengo la base de dato
const db = require('../config/config');

const Address = {};

Address.getAllAddress = (id_address_parametro,result)=>{
   
    const sql =`SELECT
                    CONVERT(A.id, char) AS id,
                    A.direccion,
                    A.nombre_barrio,
                    A.lat,
                    A.lng,
                    CONVERT(A.id_users, char) AS id_users
                FROM 
                  address AS A 
                WHERE 
                  A.id_users=?   
                ORDER BY 
                A.id`;

            db.query( 
                sql,[id_address_parametro], 
                (err,data) => {
                    console.log('ssssssssssss:', id_address_parametro);
                    if (err) {
                        console.log('Error:', err);
                        result(err, null);
                    }
                    else {
                        console.log(' ADDRESS:', data);
                        result(null, data);
                    }
                }
            )

} 



Address.create = (address, result) =>{

    const sql = `
        INSERT INTO
        address(
            direccion,
            nombre_barrio,
            lat,
            lng,
            create_at,
            update_at,
            id_users
            )
        VALUES(?, ?, ?, ?,?,?,?)
    `;

    db.query(
        sql,
        [address.direccion,
         address.nombreBarrio,
         address.lat,
         address.lng,
         new Date(),
         new Date(),
         address.idUsers,
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id de la nueva direccion usuario:', res.insertId);
                result(null, res.insertId);
            }
        }
    )

}


module.exports = Address;

