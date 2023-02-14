//obtengo la base de dato
const db = require('../config/config');

const OrderHasProducts = {};

//crear pedido
OrderHasProducts.create=(id_orden,id_product,quantity, result)=>{
   
    const sql = `
    INSERT INTO
    orders_has_product(
        id_order,
        id_product,
        cantidad,
        created_at,
        updated_at
        )
    VALUES(?, ?, ?, ?, ?)
`;

db.query(
    sql,[
     id_orden,
     id_product,
     quantity,
     new Date(),
     new Date()],

    (err, res) => {
        if (err) {
            console.log('Error:', err);
            result(err, null);
        }
        else {
            console.log('Id de la nueva detalle_orden del pedido=> ', res.insertId);
            result(null, res.insertId);
        }
    }
  )   
 }

 
module.exports = OrderHasProducts;
