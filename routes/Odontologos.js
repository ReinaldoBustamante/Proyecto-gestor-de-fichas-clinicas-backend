const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const db = require("../connection")

const app = express()
const cors = require('cors');
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


router.route("/odontologos")
    .get((req, res) => {

        db.getConnection((err, connection) =>{
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

    .post((req, res) => {
    
  
        const nombre = req.body.nombre
        const rut = req.body.rut
        const telefono   = req.body.telefono
        const correo  = req.body.correo
      
       
        db.getConnection((err, connection) =>{
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
    
router.route("/odontologos/:rut")
    
    .delete((req, res) => {
        db.getConnection((err, connection) => {
            if(err) throw err
            console.log(`connected as id ${connection.threadId}`)            
            connection.query("DELETE from odontologos WHERE rut = ?", [req.params.rut],
            (err, rows) => {
                connection.release()
                if(!err){
                    res.send(rows)
                }
                else{
                    console.log("error")
                }
            })
        })
    })

module.exports = router