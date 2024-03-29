var con = require("../config");

//AVOIR TOUS LES PRODUITS
async function getAll() {
    const [rows, field] = await con.promise().execute(`SELECT * FROM produits ORDER BY id ASC LIMIT 10`)
    return rows
}

async function getAllAdmin() {
    const [rows, field] = await con.promise().execute(`SELECT * FROM produits ORDER BY id ASC`)
    return rows
}

//AVOIR UN PRODUIT
async function getOne(id) {
    const [rows, field] = await con.promise().execute('SELECT * FROM produits WHERE id =?', [id])
    return(rows)
}

async function getOthers(theme, id) {
    const [rows, field] = await con.promise().execute('SELECT * FROM produits WHERE theme = ? AND id != ?', [theme, id])
    return (rows)
}

//AJOUTER UN PRODUIT
async function createProduct(body, id) {
    const [rows, field] = await con.promise().execute('INSERT INTO produits (`title`,`ref`, `description`, `price`, `categorie`, `theme`, `images`) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [body.title,  body.ref, body.description, body.price, body.categorie, body.theme, body.images])
    .catch(err => {
        console.log("erreur", err)
    })
    const [rows2, field2] = await con.promise().execute('SELECT * FROM produits WHERE id = (SELECT MAX(id) FROM produits) ')
    return rows2[0]
}

//UPDATE UN PRODUIT

async function updateProduct(body, id) {
    for (const property in body) {
        con.execute(`UPDATE produits SET ${property}= ? where id= ?`, [body[property], id])
    }
    const [rows, field] = await con.promise().execute('SELECT * FROM produits WHERE id = ?', [id])
    return rows[0]
}

module.exports = { createProduct, getAll, updateProduct, getOne, getOthers, getAllAdmin };