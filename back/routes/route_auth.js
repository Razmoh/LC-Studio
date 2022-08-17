var express = require('express')
var router = express.Router()
var con = require('../config')
const authentication = require('../services/service_auth')
const res = require('express/lib/response')
//REGISTER + GESTION ERREUR
router.post("/register", async function (req, res) {
    if (!req.body.nom || !req.body.prenom || !req.body.password || !req.body.email || !req.body.phone) {
        return res.status(400).json({ message: "Vérifiez que tout les champs sont remplis" })
    }
    else if (req.body.nom == "" || req.body.prenom == "" || req.body.password == "" || req.body.email == "" || req.body.phone == "") {
        return res.status(400).json({ message: "Vérifier que tout les champs sont remplis" })
    }
    const user = await req.body
    con.query(`SELECT * from users WHERE email= '${user.email}'`,
        async function (err, rows, fields) {
            if (rows[0]) {
                return res.status(400).json({ message: 'Cette adresse email est déjà utilisée' })
            }
        }
    )
    const result = await authentication.register(req.body);
    return res.status(200).json(result)
})
//LOGIN + GESTION ERREUR
router.post('/login', async function (req, res) {
    const user = await req.body
    con.query(
        `SELECT * FROM users WHERE email='${user.email}'`,
        async function (err, rows, field) {
            if (!rows[0]) {
                return res.status(400).json({ message: "route" })
            }
        }
    )
    const result = await authentication.login(req.body)
    return res.status(200).json(result)
})

module.exports = router;