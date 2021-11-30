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
        const enfermedad_padre = req.body.enfermedad_padre //
        const madre_con_vida   = req.body.madre_con_vida //
        const enfermedad_madre     = req.body.enfermedad_madre //
        const paciente_enfermo   = req.body.paciente_enfermo //
        const tratamiento_paciente     = req.body.tratamiento_paciente//
        const medicamentos     = req.body.medicamentos//
        const medicamentos_cinco_años     = req.body.medicamentos_cinco_años//
        const alergico_droga_alimento = req.body.alergico_droga_alimento
        const que_droga_alimento = req.body.que_droga_alimento
        const cicatriza_bien = req.body.cicatriza_bien
        const tiene_fiebre_reumatica = req.body.tiene_fiebre_reumatica
        const tratamiento_fiebre_reumatica = req.body.tratamiento_fiebre_reumatica
        const diabetico = req.body.diabetico
        const diabetes_controlada_con = req.body.diabetes_controlada_con
        const problema_cardiaco = req.body.problema_cardiaco
        const que_problema_cardiaco = req.body.que_problema_cardiaco
        const toma_seguido_aspirina = req.body.toma_seguido_aspirina
        const frecuencia = req.body.frecuencia
        const tiene_presion_alta = req.body.tiene_presion_alta
        const tratamiento_presion = req.body.tratamiento_presion
        const problemas_renales = req.body.problemas_renales
        const ulcera_gastrica = req.body.ulcera_gastrica
        const hepatitis = req.body.hepatitis
        const tipo_hepatitis = req.body.tipo_hepatitis
        const problema_hepatico = req.body.problema_hepatico
        const cual_problema_hepatico = req.body.cual_problema_hepatico
        const convulsiones = req.body.convulsiones
        const epileptico = req.body.epileptico
        const medicamento_epilepcia = req.body.medicamento_epilepcia
        const fue_operado = req.body.fue_operado
        const operado_de = req.body.operado_de
        const problemas_respiratorios = req.body.problemas_respiratorios
        const que_problema_respiratorio = req.body.que_problema_respiratorio
        const fuma = req.body.fuma
        const cuantos_fuma = req.body.cuantos_fuma
        const esta_embarazada = req.body.esta_embarazada
        const de_cuantos_meses = req.body.de_cuantos_meses
        const constancia = req.body.constancia
        const que_constancia = req.body.que_constancia
       
        db.getConnection((err, connection) =>{
            if(err) throw err
            console.log(`conected as id ${connection.threadId}`)
    
            connection.query('INSERT INTO ficha(rut,fecha_nacimiento,fecha_ficha, enfermedad_padre, madre_con_vida, enfermedad_madre, paciente_enfermo,  tratamiento_paciente,medicamentos,medicamentos_cinco_años, padre_con_vida ,alergico_droga_alimento, que_droga_alimento, cicatriza_bien, tiene_fiebre_reumatica, tratamiento_fiebre_reumatica, diabetico, diabetes_controlada_con, problema_cardiaco, que_problema_cardiaco, toma_seguido_aspirina, frecuencia, tiene_presion_alta, tratamiento_presion, problemas_renales, ulcera_gastrica, hepatitis, tipo_hepatitis, problema_hepatico,cual_problema_hepatico, convulsiones, epileptico,medicamento_epilepcia, fue_operado, operado_de, problemas_respiratorios, que_problema_respiratorio, fuma, cuantos_fuma, esta_embarazada, de_cuantos_meses, constancia, que_constancia) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [rut,fecha_nacimiento,fecha_ficha, enfermedad_padre,madre_con_vida, enfermedad_madre, paciente_enfermo, tratamiento_paciente, medicamentos, medicamentos_cinco_años,padre_con_vida ,alergico_droga_alimento, que_droga_alimento, cicatriza_bien, tiene_fiebre_reumatica, tratamiento_fiebre_reumatica, diabetico, diabetes_controlada_con, problema_cardiaco, que_problema_cardiaco, toma_seguido_aspirina, frecuencia, tiene_presion_alta, tratamiento_presion, problemas_renales, ulcera_gastrica, hepatitis, tipo_hepatitis, problema_hepatico,cual_problema_hepatico, convulsiones, epileptico,medicamento_epilepcia, fue_operado, operado_de, problemas_respiratorios, que_problema_respiratorio, fuma, cuantos_fuma, esta_embarazada, de_cuantos_meses, constancia, que_constancia],
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