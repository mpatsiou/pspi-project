const db = require('./db')

// null if user not found else user
const getById = async (id) => {
    const res = await db('users').select().where({ id })
    if (res.length == 0)  {
        return null
    }
    const user = res[0]
    console.log(user)

    user.followers = (await db('friendships').count('friend as cnt').where('user_id', id))[0].cnt
    user.followees = (await db('friendships').count('friend as cnt').where('friend', id))[0].cnt

    return user
}

const getAll = async () => {
    return db('users').select()
}

const getByUsername = async (username) => {
    const res = await db('users').select().where({ username })

    return res.length == 0 ? null : res[0]
}

const createUser =  async (email, username, password, name, surname) => {
    const res = await db('users')
        .insert({
            email,
            username,
            password,
            name,
            surname
        })
    
    return res[0]
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
    getAll,
    getByUsername,
    updateUser
}