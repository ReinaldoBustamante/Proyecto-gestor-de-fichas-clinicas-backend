const mysql = require('mysql')


// MYSQL

const pool = mysql.createPool({
    host            : 'yjo6uubt3u5c16az.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    port            :  "3306",
    user            : 'yfhcwhzm7utto21m',
    password        : 'vyevade2qokrozx6',
    database        : 't5gq5q5srtibpk5s'
})

module.exports = pool