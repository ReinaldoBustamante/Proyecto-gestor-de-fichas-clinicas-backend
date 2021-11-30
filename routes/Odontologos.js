const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


// MYSQL

const pool = mysql.createPool({
    host            : 'x8autxobia7sgh74.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    port            :  "3306",
    user            : 'eh48gef9fjbqh1yx',
    password        : 'rslsscj2h19sovdb',
    database        : 'bp4p4qivuieteekb'
})

router.route("/odontologos")
    .get((req, res) => {

        pool.getConnection((err, connection) =>{
            if(err) throw err
            console.log(`conected as id ${connection.threadId}`)
    
            connection.query('SELECT * from odontologos', (err, rows) => {
                connection.release() // return the connection to pool
    
                if(!err){
                    res.send(rows)
                } else{
                    console.log("error")
                }
            })
        })
    })

