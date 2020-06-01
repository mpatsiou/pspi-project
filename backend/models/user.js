const query = require('./db')

const getUser = async (id) => {
    return query(`
        select * from users
        where id = ?`,
        [id])
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

module.exports = {
    createUser,
    deleteUser
}
