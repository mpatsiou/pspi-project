const query = require('./db')

// null if user not found else user
const getUser = async (id) => {
    const res = await query(`
        select * from users
        where id = ?`,
        [id])

    return res.length == 0 ? null : res[0]
}

const createUser =  async (email, username, password, name, surname) => {
    return query(`
        insert into users (email, name, role, surname, username, password)
        values (?, ?, ?, ?, ?, ?)`,
        [email, name, "normal", surname, username, password]
    )
}

const deleteUser = async (id) => {
    return query(`
        delete from users
        where id = ?`,
        [id]
    )
}

const updateUser = async (id, forUpdate = {}) => {
    let q = "update users set "
    for (const key in forUpdate) {
        q += ` ${key} = ? `
    }
    q += `where id = ?`
    console.log(forUpdate)

    const params = [...Object.values(forUpdate), id]
    console.log(q, params)
    return query(q, params)
}

module.exports = {
    createUser,
    deleteUser,
    getUser,
    updateUser
}
