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

router.get('/wait/:email', async function (req, res) {
    const email = req.params.email
    const [rows, field] = await con.promise().execute('SELECT * FROM devis WHERE email =? AND status = 0', [email])
    return res.status(200).json(rows)
})

router.get('/progress/:email', async function (req, res) {
    const email = req.params.email
    const [rows, field] = await con.promise().execute('SELECT * FROM devis WHERE email =? AND status = 1', [email])
    return res.status(200).json(rows)
})

router.get('/down/:email', async function (req, res) {
    const email = req.params.email
    const [rows, field] = await con.promise().execute('SELECT * FROM devis WHERE email =? AND status = 2', [email])   
    return res.status(200).json(rows)
})

//UPDATE 
router.put('/:id', async function (req, res) {
        const update = await profil.updateInfo(req.body, req.params.id)
        return res.status(200).json(update)
})


module.exports = router
