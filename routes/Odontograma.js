const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const db = require("../connection")

const app = express()
const cors = require('cors');
app.use(cors())


app.use(bodyParser.urlencoded({ extended: false }))


router.route("/odontograma/:rut")
    .get((req, res) => {
        db.getConnection((err, connection) => {
            if(err) throw err
            console.log(`connected as id ${connection.threadId}`)            
            connection.query("SELECT * from odontograma WHERE rut = ?", [req.params.rut],
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
router.route("/piezas/:rut/:pieza")
    .get((req, res) => {
        db.getConnection((err, connection) => {
            if(err) throw err
            console.log(`connected as id ${connection.threadId}`)            
            connection.query("SELECT DISTINCT pieza from odontograma WHERE rut=? AND pieza = ?", [req.params.rut, req.params.pieza],
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
    
    router.route("/odontograma/:rut/:fecha")
    
    .get((req, res) => {
        db.getConnection((err, connection) => {
            if(err) throw err
            console.log(`connected as id ${connection.threadId}`) 
            console.log(req.params.rut)           
            connection.query("SELECT * from odontograma WHERE (rut = ? AND fecha= ?) ", [req.params.rut, req.params.fecha],
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

router.route("/odontograma")
    .get((req, res) => {
        db.getConnection((err, connection) => {
            if(err) throw err
            console.log(`connected as id ${connection.threadId}`)            
            connection.query("SELECT * from odontograma",
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
    .post((req, res) => {
    
  
        const fecha = req.body.fecha
        const rut = req.body.rut
        const diagnostico   = req.body.diagnostico
        const pieza  = req.body.pieza
        const cara = req.body.cara
        const procedimiento = req.body.procedimiento
      
       
        db.getConnection((err, connection) =>{
            if(err) throw err
            console.log(`conected as id ${connection.threadId}`)
    
            connection.query('INSERT INTO odontograma(fecha, rut, diagnostico, pieza, cara, procedimiento) VALUES (?,?,?,?,?,?)', [fecha, rut, diagnostico, pieza, cara, procedimiento],
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



module.exports = router