const mysql = require('mysql')


// MYSQL

const pool = mysql.createPool({
    host            : 'x8autxobia7sgh74.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    port            :  "3306",
    user            : 'eh48gef9fjbqh1yx',
    password        : 'rslsscj2h19sovdb',
    database        : 'bp4p4qivuieteekb'
})

module.exports = pool