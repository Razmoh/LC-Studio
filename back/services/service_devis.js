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

async function getOne(email) {
    const [rows, field] = await con.promise().execute(`SELECT * FROM devis WHERE email = "${email}" AND status = 2`)
        .catch(err => {
            console.log("erreur", err)
        })
    if (rows[0] === undefined) {
        return "NONE"
    }
    console.log(rows)
    return rows
}

module.exports = { createDevis, getWait, getProgress, getDown, getOne };