const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const db = require("../connection")

const app = express()
const cors = require('cors');
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


router.route("/historiales-clinicos")
    .get((req, res) => {

        db.getConnection((err, connection) =>{
            if(err) throw err
            console.log(`conected as id ${connection.threadId}`)
    
            connection.query('SELECT * from historial_clinico', (err, rows) => {
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
    
        const fecha = req.body.fecha
        const razon_ingreso = req.body.razon_ingreso
        const detalles = req.body.detalles
        const rut = req.body.rut
       
       
        db.getConnection((err, connection) =>{
            if(err) throw err
            console.log(`conected as id ${connection.threadId}`)
    
            connection.query('INSERT INTO historial_clinico(fecha, razon_ingreso, detalles, rut) VALUES (?,?,?,?)', [fecha,razon_ingreso, detalles, rut],
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

router.route("/historiales-clinicos/:rut")
    .get((req, res) => {

        db.getConnection((err, connection) =>{
            if(err) throw err
            console.log(`conected as id ${connection.threadId}`)
    
            connection.query('SELECT * from historial_clinico WHERE rut = ?', [req.params.rut], (err, rows) => {
                connection.release() // return the connection to pool
    
                if(!err){
                    res.send(rows)
                } else{
                    console.log("error")
                }
            })
        })
    
    })
router.route("/historiales-clinicos/:rut/:fecha")
    .get((req, res) => {

        db.getConnection((err, connection) =>{
            if(err) throw err
            console.log(`conected as id ${connection.threadId}`)
    
            connection.query('SELECT * from historial_clinico WHERE rut = ? and fecha = ?', [req.params.rut, req.params.fecha], (err, rows) => {
                connection.release() // return the connection to pool
    
                if(!err){
                    res.send(rows)
                } else{
                    console.log("error")
                }
            })
        })
    
    })
    .delete((req, res) => {
        db.getConnection((err, connection) => {
            if(err) throw err
            console.log(`connected as id ${connection.threadId}`)
            
            connection.query("DELETE from historial_clinico WHERE rut = ?", [req.params.rut],
            (err, rows) => {
                connection.release()
                if(!err){
                    res.send(rows)
    
                } else{
                    console.log("error")
                }
            })
        })
    })
   

module.exports = router