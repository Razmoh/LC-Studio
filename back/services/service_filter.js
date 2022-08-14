var con = require("../config");

async function findTheme(theme) {
    const [rows, field] = await con.promise().execute(`SELECT * FROM produits WHERE theme = "${theme}"`)
        .catch(err => {
            console.log("erreur", err)
        })
    if (rows[0] === undefined) {
        return "aucun produit"
    }
    return rows
}

async function findCategorie(categorie) {
    const [rows, field] = await con.promise().execute(`SELECT * FROM produits WHERE categorie = "${categorie}"`)
        .catch(err => {
            console.log("erreur", err)
        })
    if (rows[0] === undefined) {
        return "aucun produit"
    }
    return rows
}

module.exports = { findTheme, findCategorie };