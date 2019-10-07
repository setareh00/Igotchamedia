const mysql = require('mysql');


const connection = mysql.createConnection({
    connectionLimit: 100000,
    host: 'db4free.net',
    user: 'igotcha',
    password: 'gqS8585@KT4&',
    database: 'igotchamedia'
});

module.exports = connection