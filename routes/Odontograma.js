const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const db = require("../connection")

const app = express()
const cors = require('cors');
app.use(cors())


app.use(bodyParser.urlencoded({ extended: false }))

router.route("/odontograma/:fecha")
    .get((req, res) => {
        db.getConnection((err, connection) => {
            if(err) throw err
            console.log(`connected as id ${connection.threadId}`)            
            connection.query("SELECT * from odontograma WHERE fecha = ?", [req.params.fecha],
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



module.exports = router