const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const db = require("../connection")

const app = express()


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

router.route("/login")
    .post((req, res) => {

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

module.exports = router