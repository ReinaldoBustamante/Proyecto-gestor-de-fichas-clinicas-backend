const mysql = require('mysql')


// MYSQL

const pool = mysql.createPool({
    host            : 'us-cdbr-east-04.cleardb.com',
    port            :  '3306',
    user            : 'bbd5a00deabf5a',
    password        : '6b84093d ',
    database        : 'heroku_8f882350380fb7c'
    
})

module.exports = pool