var express = require('express')
var router = express.Router()
var con = require('../config')
const user = require("../services/service_user");


//OBTENIR LES INFOS DU USER
router.get('/:email', async function (req, res) {
    const email = req.params.email
    const [rows, field] = await con.promise().execute('SELECT * FROM users WHERE email =?', [email])
    return res.status(200).json(rows[0])
})

module.exports = router
