const { Router } = require('express');
var express = require('express')
var router = express.Router()
var con = require('../config')
const devis = require("../services/service_devis");

router.post('/', async function (req, res) {
    const result = await devis.createDevis(req.body)
    return res.status(200).json(result)
})

router.get('/wait', async function (req, res) {
    const result = await devis.getWait()
    return res.status(200).json(result)
})

router.get('/progress', async function (req, res) {
    const result = await devis.getProgress()
    return res.status(200).json(result)
})

router.get('/down', async function (req, res) {
    const result = await devis.getDown()
    return res.status(200).json(result)
})

router.get('/:email', async function (req, res) {
    const getOne = await devis.getOne(req.params.email)
    if (getOne === "Bad request") {
      return res.status(400).json(getOne)
    }
    else {
      return res.status(200).json(getOne)
    }
  }
  )
router.put('/progress/:id', async function (req, res) {
    const id = req.params.id
    const [rows, field] = await con.promise().execute('UPDATE devis SET status = 1 WHERE id = ?', [id])
    return res.status(200).json("OK")

    // return res.status(200).json(rows[0])
})

router.put('/down/:id', async function (req, res) {
    const id = req.params.id
    const [rows, field] = await con.promise().execute('UPDATE devis SET status = 2 WHERE id = ?', [id])
    return res.status(200).json("OK")
    // return res.status(200).json(rows[0])
})
module.exports = router
