var express = require('express')
var router = express.Router()
var con = require('../config')
//OBTENIR TOUTES LES CATEGORIES
router.get('/', async function (req, res) {
    const [rows, field] = await con.promise().execute(`SELECT * FROM categorie`)
    return res.status(200).json(rows)
})

module.exports = router

