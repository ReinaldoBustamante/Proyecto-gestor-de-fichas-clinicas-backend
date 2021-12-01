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
        const paciente_enfermo = req.body.paciente_enfermo,
        const tratamiento_paciente = req.body.tratamiento_paciente,
        const medicamentos = req.body.medicamentos,
        const medicamentos_cinco_años = req.body.medicamentos_cinco_años,
        const alergico_droga_alimento = req.body.alergico_droga_alimento,
        const que_droga_alimento = req.body.que_droga_alimento,
        const cicatriza_bien = req.body.cicatriza_bien,
        const tiene_fiebre_reumatica = req.body.tiene_fiebre_reumatica,
        const tratamiento_fiebre_reumatica = req.body.tratamiento_fiebre_reumatica,
        const diabetico = req.body.diabetico,
        const diabetes_controlada_con = req.body.diabetes_controlada_con,
        const problema_cardiaco = req.body.problema_cardiaco,
        const que_problema_cardiaco = req.body.que_problema_cardiaco

        db.getConnection((err, connection) =>{
            if(err) throw err
            console.log(`conected as id ${connection.threadId}`)
    
            connection.query('INSERT INTO ficha(rut,fecha_nacimiento,fecha_ficha,padre_con_vida,enfermedad_padre,madre_con_vida,enfermedad_madre,paciente_enfermo,tratamiento_paciente,medicamentos,medicamentos_cinco_años,alergico_droga_alimento,que_droga_alimento,cicatriza_bien,tiene_fiebre_reumatica,tratamiento_fiebre_reumatica,diabetico,diabetes_controlada_con,problema_cardiaco,que_problema_cardiaco) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [rut,fecha_nacimiento,fecha_ficha,padre_con_vida,enfermedad_padre,madre_con_vida,enfermedad_madre,paciente_enfermo,tratamiento_paciente,medicamentos,medicamentos_cinco_años,alergico_droga_alimento,que_droga_alimento,cicatriza_bien,tiene_fiebre_reumatica,tratamiento_fiebre_reumatica,diabetico,diabetes_controlada_con,problema_cardiaco,que_problema_cardiaco],
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