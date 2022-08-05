var con = require("../config");

async function createProduct(body, id) {
    const [rows, field] = await con.promise().execute('INSERT INTO produits (`title`, `description`, `price`, `categorie`, `theme`) VALUES (?, ?, ?, ?, ?)',
    [body.title, body.description, body.price, body.categorie, body.theme])
    .catch(err => {
        console.log("erreur", err)
    })
    const [rows2, field2] = await con.promise().execute('SELECT * FROM produits WHERE id = (SELECT MAX(id) FROM produits) ')
    return rows2[0]
}

module.exports = { createProduct };