const mysql = require('mysql')


// MYSQL

const pool = mysql.createPool({
    host            : 'yjo6uubt3u5c16az.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    port            :  '3306',
    user            : 'rvm60oxi1nj6xss7',
    password        : 'w5slqddkaoo937bv',
    database        : 'xdb7zi3os0mo4g8o'
    
})

module.exports = pool