var con = require("../config");
//METTRE A JOUR SON PROFIL
async function updateInfo(body, id) {
    for (const property in body) {
        con.execute(`UPDATE users SET ${property}= ? where id= ?`, [body[property], id])
    }
    const [rows, field] = await con.promise().execute('SELECT * from users WHERE id = ?', [id])
    return rows[0]
}

module.exports = { updateInfo };
