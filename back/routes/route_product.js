var express = require('express')
var router = express.Router()
var con = require('../config')
const product = require("../services/service_product");


//SELECTIONNER TOUS

router.get('/', async function (req, res) {
    const result = await product.getAll()
    return res.status(200).json(result)
})

router.get('/admin', async function (req, res) {
  const result = await product.getAllAdmin()
  return res.status(200).json(result)
})

router.get('/:id', async function(req, res){
  const result = await product.getOne(req.params.id)
  return res.status(200).json(result)
})

router.get('/theme/:theme/:id', async function(req, res){
  const result = await product.getOthers(req.params.theme, req.params.id)
  return res.status(200).json(result)
})

//AJOUTER UN PRODUIT

router.post('/', async function (req, res) {
    const result = await product.createProduct(req.body)
    return res.status(200).json(result)
})

//AJOUTER UN THEME
router.post('/theme', async function (req, res){
  const [rows, field] = await con.promise().execute('INSERT INTO theme (`title`) VALUES (?)', [req.body.title])
  return res.status(200).json("OK")
})

//AJOUTER UNE CATEGORIE 
router.post('/categorie', async function (req, res){
  const [rows, field] = await con.promise().execute('INSERT INTO categorie (`title`) VALUES (?)', [req.body.title])
  return res.status(200).json("OK")
})
//METTRE UN PRODUIT A JOUR

router.put('/:id', async function (req, res) {
    // const verify = middleware.verifyToken(req.headers.authorization)

    const update = await product.updateProduct(req.body, req.params.id)
    return res.status(200).json(update)
  })

  //SUPPRIMER UN PRODUIT

  router.delete('/:id', async function (req, res) {
    const [rows, field] = await con.promise().execute('DELETE FROM produits WHERE id = ?', [req.params.id])
    if (rows.affectedRows === 0) {
      return res.status(400).json("Erreur")
    }
    return res.status(200).json("Produit supprimé")
})
module.exports = router
