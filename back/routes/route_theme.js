var express = require('express')
var router = express.Router()
var con = require('../config')
//OBTENIR TOUS LES THEMES
router.get('/', async function (req, res) {
    const [rows, field] = await con.promise().execute(`SELECT * FROM theme`)
    return res.status(200).json(rows)
})

module.exports = router

