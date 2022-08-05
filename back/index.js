require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})
var con = require('./config')
const port = 8000
var indexRouter = require('./routes/index')
const cors = require('cors')
//import le paquet express
var express = require('express')
//crée une application express

var app = express()
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.listen(port, () => {
    console.log(`server start on localhost://${port}`)
})

app.use('/static', express.static('public'))
app.use('/', indexRouter);

con.connect()

module.exports = app;