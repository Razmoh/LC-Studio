var express = require('express')
var router = express.Router();

const route_auth = require('./route_auth')
const route_user = require('./route_user')
const route_profil = require('./route_profil')
const route_product = require('./route_product')
const route_image = require('./route_image')
const route_delete = require('./route_delete')
const route_filter = require('./route_filter')
const route_theme = require('./route_theme')
const route_categorie = require ('./route_categorie')

router.get('/', function (req, res) {
    res.send("index");
})
//REDIRIGE SUIVANT L'ADRESSE DU FETCH
router.use('/auth', route_auth);
router.use('/user', route_user )
router.use('/profil', route_profil)
router.use('/create_product', route_product)
router.use('/image', route_image)
router.use('/delete', route_delete)
router.use('/filter', route_filter)
router.use('/theme', route_theme)
router.use('/categorie', route_categorie)



module.exports = router;