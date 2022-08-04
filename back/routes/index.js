var express = require('express')
var router = express.Router();

const route_auth = require('./route_auth')
const route_user = require('./route_user')
const route_profil = require('./route_profil')

router.get('/', function (req, res) {
    res.send("index");
})

router.use('/auth', route_auth);
router.use('/user', route_user )
router.use('/profil', route_profil)

module.exports = router;