//obtengo la base de dato
const db = require('../config/config');

const Order = {};


Order.findByStatus=(status,result)=>{

    const sql = `SELECT 
    CONVERT(O.id, CHAR) AS id,
    CONVERT(O.id_client, CHAR) AS id_client,
    CONVERT(O.id_direccion, CHAR) AS id_direccion,
    CONVERT(O.id_domiciliario, CHAR) AS id_domiciliario,
      O.statu,
      O.timetamp,
      A.direccion,
    
    JSON_OBJECT(
             'id', CONVERT(A.id, CHAR),
             'address', A.direccion,
             'barrio', A.nombre_barrio,
             'lat', A.lat,
             'lng', A.lng
         
     ) AS direccion_json,
     
    JSON_OBJECT(
             'id', CONVERT(U.id, CHAR),
             'name', U.name,
             'lastname', U.lastname,
             'image', U.image
         
     ) AS cliente_json,
     
    JSON_ARRAYAGG(
            JSON_OBJECT(
                 'id', CONVERT(P.id, char),
                 'name', P.name,
                 'description', P.description,
                 'image1', P.image1,
                 'image2', P.image2,
                 'image3', P.image3,
                 'price', P.price,
                 'cantidad', OrdensProduct.cantidad
             )
            ) AS produc
      
        FROM orders AS O

            INNER JOIN users AS U
            ON U.id = O.id_client    
            INNER JOIN address AS A 
            ON A.id = O.id_direccion    
            INNER JOIN orders_has_product AS OrdensProduct
            ON OrdensProduct.id_order=O.id
            INNER JOIN products  AS P
            ON P.id = OrdensProduct.id_product    
            WHERE O.statu = ?
            GROUP BY O.id

         `;

         db.query(
            sql,
            status,
            (err, data) => {
                if (err) {
                    console.log('Error:', err);
                    result(err, null);
                }
                else {
                    console.log('dataaaaaa', data);
                    result(null, data);
                }
            }
          )   

}

//crear pedido
Order.create=(order, result)=>{

   
    const sql = `
    INSERT INTO
    orders(
        id_client,
        id_direccion,
        statu,
        timetamp,
        created_at,
        updated_at
        )
    VALUES(?, ?, ?, ?, ?, ?)
`;

db.query(
    sql,
    [order.idClient,
     order.idDireccion,
     'PAGADO', //1: pagado, 2: despachado,  3: en camino 4: entregado
     Date.now(),
     new Date(),
     new Date()],
    (err, res) => {
        if (err) {
            console.log('Error:', err);
            result(err, null);
        }
        else {
            console.log('Id de la nueva orden del pedido=> ', res.insertId);
            result(null, res.insertId);
        }
    }
  )   
 }

 
module.exports = Order;
