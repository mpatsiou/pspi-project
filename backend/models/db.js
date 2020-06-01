const db = require('mysql-promise')()

db.configure({
    host: "localhost",
    user: "mpats",
    password: "mpats",
    database: "pspi"
})
/*
db.query(`insert into users (email, name, role, surname, username, password)
values ("thanos@aek.gr", "thanos", "admin", "mpats", "mpatsioulars", "mpats")`)
    .then(console.log)
*/

const query = async (q, params) => {
    const res = await db.query(q, params)

    return res[0]
}

module.exports = query
