//obtengo la base de dato
const db = require('../config/config');

const Product = {};



//RETORNA TODAS LAS PRODUCTO
Product.findByProducts = (id_category,result)=>{
  
    const sql =`SELECT 
                    CONVERT(P.id, char) AS id,
                    P.name,
                    P.description,
                    P.price,
                    P.image1,
                    P.image2,
                    P.image3,
                    CONVERT(P.id_category, char) AS id_category,
                    P.created_at,
                    P.update_at

                FROM 
                   products AS P
                WHERE 
                   P.id_category=?   
                ORDER BY 
                   P.name`;

            db.query( 
                sql,[id_category], 
                (err,data) => {
                    if (err) {
                        console.log('Error:', err);
                        result(err, null);
                    }
                    else {
                        
                        console.log("================================");
                        console.log(' dataaaaa:', data);
                        console.log("================================");

                        result(null, data);
                    }
                }
            )

} 

Product.findByName = (product,result)=>{
    
    const sql =`SELECT 
                P.name
                FROM products AS P
                WHERE P.name=?`;

    db.query( sql,[product.name],
        (err,productt) => {
            if (productt=="") {
                result(true);
            }
            else {
                result(false);
            }
        }
    )
}


//funcion para crear un producto
Product.create = (product, result) =>{

    const sql = `
        INSERT INTO
        products(
            name,
            description,
            price,
            image1,
            image2,
            image3,
            id_category,
            created_at,
            update_at
            )
        VALUES(?, ?, ?, ?,?,?,?,?,?)
    `;

    db.query(
        sql,
        [product.name,
         product.description,
         product.price,
         product.image1,
         product.image2,
         product.image3,
         product.id_category,
         new Date(),
         new Date()],

         //devolvemos el colback
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del nuevo producto:', res.insertId);
                result(null, res.insertId);
            }
        }
    )

}





Product.update = (product, result) =>{

    const sql = `
       UPDATE 
          products
       SET 
         name=?,
         description=?,
         price=?,
         image1=?,
         image2=?,
         image3=?,
         id_category=?,
         update_at=?
       WHERE 
         id=?  
    `;

    db.query(
        sql,
        [product.name,
         product.description,
         product.price,
         product.image1,
         product.image2,
         product.image3,
         product.id_category,
         new Date(),
         product.id
        ],

         //devolvemos el colback
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del producto actualizado:', product.insertId);
                result(null, product.insertId);
            }
        }
    )

}

module.exports = Product;

