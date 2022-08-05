var express = require('express')
var router = express.Router()
var con = require('../config')
const profil = require("../services/service_profil");


//OBTENIR LES INFOS DU USER
router.get('/:email', async function (req, res) {
    const email = req.params.email
    const [rows, field] = await con.promise().execute('SELECT * FROM users WHERE email =?', [email])
    return res.status(200).json(rows[0])
})

//UPDATE 
router.put('/:id', async function (req, res) {
    const email = req.body.email
    const [rows, field] = await con.promise().execute('SELECT * FROM users WHERE email =?', [email])
    if (rows[0]) {
        return res.status(400).json({ message: 'Cette adresse email est déjà utilisée' })
    }
    else {
        const update = await profil.updateInfo(req.body, req.params.id)
        return res.status(200).json(update)
    }
})


module.exports = router
