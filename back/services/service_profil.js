var con = require("../config");

async function updateInfo(body, id) {
    for (const property in body) {
        con.execute(`UPDATE users SET ${property}= ? where id= ?`, [body[property], id])
    }
    const [rows, field] = await con.promise().execute('SELECT * from users WHERE id = ?', [id])
    console.log(rows[0])
    return rows[0]
}

module.exports = { updateInfo };
