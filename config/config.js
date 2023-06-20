const mysql = require('mysql');

const db = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'delivered',
  debug: false
});

db.getConnection((err, connection) => {
  if (err)
    throw err;
  console.log('DB connected 0k');
  connection.release();
});

module.exports = db;


