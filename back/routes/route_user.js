var express = require('express')
var router = express.Router()
var con = require('../config')
const user = require("../services/service_user");


//OBTENIR TOUS LES UTILISATEURS (ADMIN)
router.get('/', async function (req, res) {

    const getAll = await user.getUsers()
    if (getAll === "Bad request") {
        return res.status(400).json(getAll)
    }
    return res.status(200).json(getAll)
})
module.exports = router

//SUPPRIMER UN UTILISATEUR(ADMIN)

router.delete('/:id', async function (req, res) {
    const [rows, field] = await con.promise().execute('DELETE FROM users WHERE id = ?', [req.params.id])
    if (rows.affectedRows === 0) {
      return res.status(400).json("Erreur")
    }
    return res.status(200).json("Utilisateur supprimé")
})

//MODIFIER UN UTLISATEUR(ADMIN)

router.put('/:id', async function (req, res) {
    // const verify = middleware.verifyToken(req.headers.authorization)
    
    const id = req.params.id
    const [rows, field] = await con.promise().execute('SELECT * from users WHERE id = ?', [id])
    if (rows[0] == undefined) {
      return res.status(400).json({ message: 'user does not exist' }) 
    }
    const update = await user.updateUser(req.body, req.params.id)
    return res.status(200).json(update)
  })