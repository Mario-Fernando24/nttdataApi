//obtengo la base de dato
const db = require('../config/config');

const Category = {};



//RETORNA TODAS LAS CATEGORIA
Category.getAllCategory = (result)=>{
  
    const sql =`SELECT 
                    CONVERT(C.id, char) AS id,
                    C.name,
                    C.description AS descripcion
                FROM 
                    categories AS C 
                ORDER BY 
                    C.name`;

            db.query( 
                sql,
                (err,data) => {
                    if (err) {
                        console.log('Error:', err);
                        result(err, null);
                    }
                    else {
                        console.log(' categorias:', data);
                        result(null, data);
                    }
                }
            )

} 

//BUSCAR NOMBRE DE LA CATEGORIA Y RETORNA UN BOOLEANO
Category.findByName = (category,result)=>{
    
    const sql =`SELECT 
                C.name,
                C.description AS descripcion
                FROM categories AS C 
                WHERE C.name=?`;

    db.query( sql,[category.name],
        (err,category) => {
            if (category=="") {
                result(true);
            }
            else {
                result(false);
            }
        }
    )
}

//funcion para crear una categoria
Category.create = (category, result) =>{

    const sql = `
        INSERT INTO
        categories(
                name,
                description,
                created_at,
                update_at
            )
        VALUES(?, ?, ?, ?)
    `;

    db.query(
        sql,
        [category.name,
         category.description,
         new Date(),
         new Date()],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id de la nueva categoria usuario:', res.insertId);
                result(null, res.insertId);
            }
        }
    )

}


Category.updateCategory=(category, result)=>{
     
    const sql = `
         UPDATE 
          categories
         SET     
            name=?,
            description=?,
            update_at=?
         WHERE 
            id=?  
        `;

        db.query(
            sql,
            [
              category.name,
              category.descripcion,
              new Date(),
              category.id
            ],
            (err, res) => {
                if (err) {
                    result(err, null);
                }
                else {
                    result(null, category.id);
                }
            }
        )

 },





module.exports = Category;

