var con = require("../config");

async function createDevis(body) {
    const date = new Date()
    const [rows, field] = await con.promise().execute('INSERT INTO devis (`email`,`panier`, `date`) VALUES (?, ?, ?)',
        [body.email, body.panier, date])
        .catch(err => {
            console.log("erreur", err)
        })
    return rows[0]
}

async function getWait() {
    const [rows, field] = await con.promise().execute('SELECT * FROM devis WHERE status = 0')
    return rows
}

async function getProgress() {
    const [rows, field] = await con.promise().execute('SELECT * FROM devis WHERE status = 1')
    return rows
}

async function getDown() {
    const [rows, field] = await con.promise().execute('SELECT * FROM devis WHERE status = 2')
    return rows
}

module.exports = { createDevis, getWait, getProgress, getDown };