const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'igotcha',
    password: 'gqS8585@KT4&',
    database: 'igotchamedia'
});

module.exports = connection