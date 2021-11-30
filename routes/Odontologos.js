const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

// FIX CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// MYSQL

const pool = mysql.createPool({
    host            : 'x8autxobia7sgh74.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    port            :  "3306",
    user            : 'eh48gef9fjbqh1yx',
    password        : 'rslsscj2h19sovdb',
    database        : 'bp4p4qivuieteekb'
})

app.post('/odontologos', (req, res) => {
    
  
    const nombre = req.body.nombre
    const rut = req.body.rut
    const telefono   = req.body.telefono
    const correo  = req.body.correo
  
   
    pool.getConnection((err, connection) =>{
        if(err) throw err
        console.log(`conected as id ${connection.threadId}`)

        connection.query('INSERT INTO odontologos(nombre, rut, telefono, correo) VALUES (?,?,?,?)', [nombre, rut, telefono, correo],
        (err, rows) =>{
            connection.release() // return the connection to pool

            if(!err){
                res.send(rows)
            } else{
                console.log("error")
            }
        })
    })
   
})