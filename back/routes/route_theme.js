var express = require('express')
var router = express.Router()
var con = require('../config')

router.get('/', async function (req, res) {
    const [rows, field] = await con.promise().execute(`SELECT * FROM theme`)
    console.log(rows)
    return res.status(200).json(rows)
})

module.exports = router

