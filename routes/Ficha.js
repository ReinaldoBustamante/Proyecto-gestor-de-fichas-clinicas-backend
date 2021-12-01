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
                    console.log(err)
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
        const paciente_enfermo = req.body.paciente_enfermo
        const tratamiento_paciente = req.body.tratamiento_paciente
        const medicamentos = req.body.medicamentos
        const medicamentos_cinco_años = req.body.medicamentos_cinco_años
      

        db.getConnection((err, connection) =>{
            if(err) throw err
            console.log(`conected as id ${connection.threadId}`)
    
            connection.query('INSERT INTO ficha(rut,fecha_nacimiento,fecha_ficha,padre_con_vida,enfermedad_padre,madre_con_vida,enfermedad_madre,paciente_enfermo,tratamiento_paciente,medicamentos,medicamentos_cinco_años) VALUES (?,?,?,?,?,?,?,?,?,?,?)', [rut,fecha_nacimiento,fecha_ficha,padre_con_vida,enfermedad_padre,madre_con_vida,enfermedad_madre,paciente_enfermo,tratamiento_paciente,medicamentos,medicamentos_cinco_años],
            (err, rows) =>{
                connection.release() // return the connection to pool
    
                if(!err){
                    res.send(rows)
                } else{
                    console.log(err)
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