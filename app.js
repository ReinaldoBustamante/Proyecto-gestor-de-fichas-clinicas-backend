
const express = require('express');
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 5000

//rutas
const usuarios = require("./routes/Usuarios")
const login = require("./routes/Login")
const pacientes = require("./routes/Pacientes")
const odontologos = require("./routes/Odontologos")
const tons = require("./routes/Tons")
const fichas = require("./routes/Ficha")
// FIX CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// API
app.use(login)
app.use(usuarios)
app.use(pacientes)
app.use(odontologos)
app.use(tons)
app.use(fichas)
// Listen on enviroment port or 5000

app.listen(port,() => console.log(`Listen on port ${port}`))