
const express = require('express');
const bodyParser = require('body-parser')

const app = express()

const port = process.env.PORT || 5000

//rutas
const usuarios = require("./routes/Usuarios")
const pacientes = require("./routes/Pacientes")
const odontologos = require("./routes/Odontologos")
const tons = require("./routes/Tons")
const fichas = require("./routes/Ficha")

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())



//conexion
const db = require("./connection")

//Login

app.post('/login', (req, res) => {

    const username = req.body.username
    const password = req.body.password


    db.query(
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

// API
app.use(usuarios)
app.use(pacientes)
app.use(odontologos)
app.use(tons)
app.use(fichas)
// Listen on enviroment port or 5000

app.listen(port,() => console.log(`Listen on port ${port}`))