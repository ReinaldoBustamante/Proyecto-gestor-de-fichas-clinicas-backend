const mysql = require('mysql')


// MYSQL

const pool = mysql.createPool({
    host            : '127.0.0.1',
    port            :  '3306',
    user            : 'root',
    
    database        : 'cfedent'
    
})

module.exports = pool