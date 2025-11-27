const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Manasa@123',
    database: 'userdb'
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
    } else {
        console.log('MySQL Connected...');
    }
});

module.exports = db;


