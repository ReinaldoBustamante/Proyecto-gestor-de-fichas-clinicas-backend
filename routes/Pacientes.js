const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const db = require("../connection")

const app = express()
const cors = require('cors');
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

router.route("/pacientes")
    .get((req, res) => {

        db.getConnection((err, connection) =>{
            if(err) throw err
            console.log(`conected as id ${connection.threadId}`)
    
            connection.query('SELECT * from paciente', (err, rows) => {
                connection.release() // return the connection to pool
    
                if(!err){
                    res.send(rows)
                } else{
                    console.log(err)
                }
            })
        })
    })

    .post((req, res) => {
    
        const id_odontologo = req.body.id_odontologo
        const nombre = req.body.nombre
        const sexo = req.body.sexo
        const rut = req.body.rut
        const telefono   = req.body.telefono
        const celular     = req.body.celular
        const estado_civil   = req.body.estadoCivil
        const fecha_nacimiento = req.body.fecha_nacimiento
        const domicilio     = req.body.domicilio
        const profesion     = req.body.profesion
        const lugar_trabajo     = req.body.lugarTrabajo
       
        db.getConnection((err, connection) =>{
            if(err) throw err
            console.log(`conected as id ${connection.threadId}`)
    
            connection.query('INSERT INTO paciente(id_odontologo,nombre, rut, telefono, celular, estado_civil, fecha_nacimiento, domicilio,profesion,lugar_trabajo, sexo) VALUES (?,?,?,?,?,?,?,?,?,?,?)', [id_odontologo,nombre, rut,telefono, celular, estado_civil, fecha_nacimiento, domicilio, profesion, lugar_trabajo,sexo],
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

router.route("/pacientes/:rut")
    .get((req, res) => {

        db.getConnection((err, connection) =>{
            if(err) throw err
            console.log(`conected as id ${connection.threadId}`)
    
            connection.query('SELECT * from paciente WHERE rut = ?', [req.params.rut], (err, rows) => {
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
            
            connection.query("DELETE from paciente WHERE rut = ?", [req.params.rut],
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