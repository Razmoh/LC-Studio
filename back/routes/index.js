var express = require('express')
var router = express.Router();

const route_auth = require('./route_auth')
const route_user = require('./route_user')
const route_profil = require('./route_profil')
const route_product = require('./route_product')
const route_image = require('./route_image')

router.get('/', function (req, res) {
    res.send("index");
})

router.use('/auth', route_auth);
router.use('/user', route_user )
router.use('/profil', route_profil)
router.use('/create_product', route_product)
router.use('/image', route_image)



module.exports = router;