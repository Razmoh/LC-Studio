var express = require('express')
var router = express.Router()
var con = require('../config')
const filter = require("../services/service_filter");
//RECHERCHER PAR THEME
router.get('/theme/:theme', async function (req, res) {
    const find = await filter.findTheme(req.params.theme)
    return res.status(200).json(find)
})
//RECHERCHER PAR CATEGORIE
router.get('/categorie/:categorie', async function (req, res) {
    const find = await filter.findCategorie(req.params.categorie)
    return res.status(200).json(find)
})

module.exports = router

