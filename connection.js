const mysql = require('mysql')


// MYSQL

const pool = mysql.createPool({
    host            : 'fedent-api-do-user-10349940-0.b.db.ondigitalocean.com',
    port            :  "25060",
    user            : 'doadmin',
    password        : 'ASiEm5OBBilhaLg5',
    database        : 'defaultdb'
})

module.exports = pool