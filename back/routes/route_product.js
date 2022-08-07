var express = require('express')
var router = express.Router()
var con = require('../config')
const product = require("../services/service_product");


//SELECTIONNER TOUS

router.get('/', async function (req, res) {
    const result = await con.query(`SELECT * FROM produits`)
    return res.status(200).json(result)
})

//AJOUTER UN PRODUIT

router.post('/', async function (req, res) {
    const result = await product.createProduct(req.body)
    return res.status(200).json(result)
})

module.exports = router
