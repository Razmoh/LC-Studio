var con = require("../config");

async function findTheme(theme) {
    const [rows, field] = await con.promise().execute(`SELECT * FROM produits WHERE theme = "${theme}"`)
        .catch(err => {
            console.log("erreur", err)
        })
        return rows
}

async function findCategorie(categorie) {
    const [rows, field] = await con.promise().execute(`SELECT * FROM produits WHERE categorie = "${categorie}"`)
        .catch(err => {
            console.log("erreur", err)
        })
        return rows
}

module.exports = { findTheme, findCategorie };