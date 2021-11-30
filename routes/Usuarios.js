const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const db = require("../connection")

const app = express()
const cors = require('cors');
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())



router.route("/usuarios")
    .get((req, res) => {

        db.getConnection((err, connection) =>{
            if(err) throw err
            console.log(`conected as id ${connection.threadId}`)
    
            connection.query('SELECT username, nombre, rut, correo, rol, id_usuario from usuarios', (err, rows) => {
                connection.release() // return the connection to db
    
                if(!err){
                    res.send(rows)
                } else{
                    console.log("error")
                }
            })
        })
    })
    .post((req, res) => {

        const username = req.body.username
        const password = req.body.password
        const nombre   = req.body.nombre
        const rut      = req.body.rut
        const correo   = req.body.correo
        const telefono = req.body.telefono
        const rol      = req.body.rol
    
        db.query(
            'INSERT INTO usuarios(username, password, nombre, rut, telefono, correo, rol) VALUES (?,?,?,?,?,?,?)', [username, password, nombre, rut, telefono, correo, rol],
            (err, rows) =>{
                connection.release()
                if(!err){
                    res.send(rows)
                }
                else{
                    console.log("error")
                }
        
            }
             
        )
       
    })

    
router.route("/usuarios/:id")
    .delete((req, res) => {
        db.getConnection((err, connection) => {
            if(err) throw err
            console.log(`connected as id ${connection.threadId}`)            
            connection.query("DELETE from usuarios WHERE id_usuario = ?", [req.params.id],
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