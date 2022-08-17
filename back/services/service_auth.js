// require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})
var express = require("express");
var router = express.Router();
var con = require("../config");
const bcrypt = require("bcrypt");
const SECRET = "PROUT";
const jwt = require("jsonwebtoken");
//REGISTER
async function register(body) {
    var date = new Date().toLocaleDateString("en-GB");
    const saltRounds = 10;
    const password = await bcrypt.hash(body.password, saltRounds);
        const [rows1, field1, error] = await con.promise().execute('INSERT INTO users(`nom`, `prenom`, `email`, `password`, `phone`, `creation_date`) VALUES(?, ?, ?, ?, ?, ?)', [body.nom, body.prenom, body.email, password, body.phone, date]);
        const [rows2, field2] = await con.promise().execute('SELECT * FROM users WHERE email= ?', [body.email]);
        return rows2[0];
    }
//LOGIN
    async function login (body) {
        const [rows, field] = await con.promise().execute('SELECT * FROM users WHERE email= ?', [body.email])
        const email = await rows[0].email
        const password = await rows[0].password
        const verifyPassword = await bcrypt.compare(body.password, password)
        const token = jwt.sign(
            {            
                id: rows[0].id,
                prenom: rows[0].prenom,
                email: rows[0].email,
                admin: rows[0].admin
            },
            SECRET,
            {expiresIn: "24 hours"}
        )
        if (email === body.email && verifyPassword){
            return { Token: token}
        }
        else {
            return "service"
        }
    }

    module.exports = {
        register, login
    };