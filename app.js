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


// USUARIOS

app.get('/usuarios', (req, res) => {

    pool.getConnection((err, connection) =>{
        if(err) throw err
        console.log(`conected as id ${connection.threadId}`)

        connection.query('SELECT username, nombre, rut, correo, rol, id_usuario from usuarios', (err, rows) => {
            connection.release() // return the connection to pool

            if(!err){
                res.send(rows)
            } else{
                console.log("error")
            }
        })
    })
})

// ELIMINAR USUARIO
app.delete("/usuarios/:id", (req, res) => {
    pool.getConnection((err, connection) => {
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

// REGISTRAR USUARIO

app.post('/register', (req, res) => {

    const username = req.body.username
    const password = req.body.password
    const nombre   = req.body.nombre
    const rut      = req.body.rut
    const correo   = req.body.correo
    const telefono = req.body.telefono
    const rol      = req.body.rol

    pool.query(
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

// LOGIN

app.post('/login', (req, res) => {

    const username = req.body.username
    const password = req.body.password


    pool.query(
        'SELECT * FROM usuarios WHERE username = ? AND password = ?', [username, password],
        (err, result) =>{

            if (err) {
                res.send({err: err})
            } 

            if (result.length > 0){
                res.send(result)
            }else{
                res.send({Message: 'Credenciales Incorrectas.'})
            }
     
        }
         
    )
   
})



//USUARIOS

//get
app.get('/usuarios', (req, res) => {

    pool.getConnection((err, connection) =>{
        if(err) throw err
        console.log(`conected as id ${connection.threadId}`)

        connection.query('SELECT (rol) from usuarios', (err, rows) => {
            connection.release() // return the connection to pool

            if(!err){
                res.send(rows)
            } else{
                console.log("error")
            }
        })
    })
})


//POST usuarios

app.post('/usuarios', (req, res) => {
    
    const username = req.body.username
    const password = req.body.password
    const nombre = req.body.nombre
    const rut = req.body.rut
    const correo   = req.body.correo
    const telefono     = req.body.telefono
    const rol = req.body.rol
   
    pool.getConnection((err, connection) =>{
        if(err) throw err
        console.log(`conected as id ${connection.threadId}`)

        connection.query('INSERT INTO usuarios(username, password, nombre, rut, correo, telefono,rol) VALUES (?,?,?,?,?,?,?)', [username, password, nombre, rut,telefono, correo, rol],
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



// -----------------------------PACIENTES-------------------------------------------------------------

app.get('/pacientes', (req, res) => {

    pool.getConnection((err, connection) =>{
        if(err) throw err
        console.log(`conected as id ${connection.threadId}`)

        connection.query('SELECT * from paciente', (err, rows) => {
            connection.release() // return the connection to pool

            if(!err){
                res.send(rows)
            } else{
                console.log("error")
            }
        })
    })
})

// ----------------post paciente---------------------------------
app.post('/pacientes', (req, res) => {
    
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
   
    pool.getConnection((err, connection) =>{
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

// DELETE PACIENTE
app.delete("/pacientes/:rut", (req, res) => {
    pool.getConnection((err, connection) => {
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



// PACIENTES rut

app.get('/pacientes/:rut', (req, res) => {

    pool.getConnection((err, connection) =>{
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

// ODONTOLOGOS

// GET ODONTOLOGOS

app.get('/odontologos', (req, res) => {

    pool.getConnection((err, connection) =>{
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

// POST ODONTOLOGO
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

// TONS

//GET TONS
app.get('/tons', (req, res) => {

    pool.getConnection((err, connection) =>{
        if(err) throw err
        console.log(`conected as id ${connection.threadId}`)

        connection.query('SELECT * from tons', (err, rows) => {
            connection.release() // return the connection to pool

            if(!err){
                res.send(rows)
            } else{
                console.log("error")
            }
        })
    })
})
// POST TONS
app.post('/tons', (req, res) => {
    
  
    const nombre = req.body.nombre
    const rut = req.body.rut
    const telefono   = req.body.telefono
    const correo  = req.body.correo
  
   
    pool.getConnection((err, connection) =>{
        if(err) throw err
        console.log(`conected as id ${connection.threadId}`)

        connection.query('INSERT INTO tons(nombre, rut, telefono, correo) VALUES (?,?,?,?)', [nombre, rut, telefono, correo],
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


//FICHA CLINICA

//GET FICHA
app.get('/fichas', (req, res) => {

    pool.getConnection((err, connection) =>{
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
//GET FICHA RUT
app.get('/fichas/:rut', (req, res) => {

    pool.getConnection((err, connection) =>{
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


// Listen on enviroment port or 5000

app.listen(port,() => console.log(`Listen on port ${port}`))