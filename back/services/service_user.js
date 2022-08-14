var con = require("../config");

async function getUsers() {
    const [rows, field] = await con.promise().execute('SELECT * FROM users')
    if (rows[0] === undefined) {
        return "Bad request"
    }
    return rows
}

async function getOne(email) {
    const [rows, field] = await con.promise().execute(`SELECT * FROM users WHERE email = "${email}"`)
        .catch(err => {
            console.log("erreur", err)
        })
    if (rows[0] === undefined) {
        return "Aucun utilisateur"
    }
    return rows
}

async function updateUser(body, id) {
    for (const property in body) {
        con.execute(`UPDATE users SET ${property}= ? where id= ?`, [body[property], id])
    }
    const [rows, field] = await con.promise().execute('SELECT * from users WHERE id = ?', [id])
    return rows[0]
}

module.exports = { getUsers, updateUser, getOne };
