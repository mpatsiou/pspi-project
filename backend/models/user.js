const db = require('./db')

// null if user not found else user
const getById = async (id) => {
    const res = await db('users').select().where({ id })

    return res.length == 0 ? null : res[0]
}

const getByUsername = async (username) => {
    const res = await db('users').select().where({ username })

    return res.length == 0 ? null : res[0]
}

const createUser =  async (email, username, password, name, surname) => {
    return db('users')
        .insert({
            email,
            username,
            password,
            name,
            surname
        })
}

const deleteUser = async (id) => {
    return db('users')
        .delete()
        .where({ id })
        .limit(1)
}

const updateUser = async (id, params = {}) => {
    return db('users').update(params).where({ id })
}

module.exports = {
    createUser,
    deleteUser,
    getById,
    getByUsername,
    updateUser
}