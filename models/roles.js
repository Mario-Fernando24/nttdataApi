const db = require('../config/config');

const Rol = {}


//ejecutara una funcion que tiene como parametro el id del usuario y el id del rol

Rol.create = (id_user, id_rol, result) => {
    const sql = `
    INSERT INTO
        user_has_roles(
            id_user,
            id_rol,
            created_at,
            update_at
        )
    VALUES(?, ?, ?, ?)
    `;

    db.query(
        sql,
        [id_user, id_rol, new Date(), new Date()],
        
    )
}

module.exports = Rol;