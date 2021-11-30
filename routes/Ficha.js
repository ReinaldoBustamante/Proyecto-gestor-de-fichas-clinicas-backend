const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const db = require("../connection")

const app = express()
const cors = require('cors');
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())



router.route("/fichas")
    .get((req, res) => {

        db.getConnection((err, connection) =>{
            if(err) throw err
            console.log(`conected as id ${connection.threadId}`)
    
            connection.query('SELECT * from ficha', (err, rows) => {
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
        const rut = req.body.rut
        const fecha_nacimiento = req.body.fecha_nacimiento
        const fecha_ficha = req.body.fecha_ficha
        const padre_con_vida = req.body.padre_con_vida
        const enfermedad_padre = req.body.enfermedad_padre
        const madre_con_vida = req.body.madre_con_vida
        const enfermedad_madre = req.body.enfermedad_madre
        db.getConnection((err, connection) =>{
            if(err) throw err
            console.log(`conected as id ${connection.threadId}`)
    
            connection.query('INSERT INTO ficha(enfermedad_madre,madre_con_vida,enfermedad_padre,padre_con_vida,rut, fecha_nacimiento, fecha_ficha) VALUES (?,?,?,?,?,?,?)',
            [enfermedad_madre,madre_con_vida,enfermedad_padre,padre_con_vida,rut, fecha_nacimiento,fecha_ficha],
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

router.route("/fichas/:rut")
    .get((req, res) => {

        db.getConnection((err, connection) =>{
            if(err) throw err
            console.log(`conected as id ${connection.threadId}`)
    
            connection.query('SELECT * from ficha WHERE rut = ?', [req.params.rut], (err, rows) => {
                connection.release() // return the connection to pool
    
                if(!err){
                    res.send(rows)
                } else{
                    console.log("error")
                }
            })
        })
    })

module.exports = router