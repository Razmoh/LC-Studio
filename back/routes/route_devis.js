const { Router } = require('express');
var express = require('express')
var router = express.Router()
var con = require('../config')
const devis = require("../services/service_devis");

router.post('/', async function(req, res){
    const result = await devis.createDevis(req.body)
    return res.status(200).json(result)
})

router.get('/wait', async function(req, res){
    const result = await devis.getWait()
    return res.status(200).json(result)
})

router.get('/progress', async function(req, res){
    const result = await devis.getProgress()
    return res.status(200).json(result)
})

router.get('/down', async function(req, res){
    const result = await devis.getDown()
    return res.status(200).json(result)
})

module.exports = router
