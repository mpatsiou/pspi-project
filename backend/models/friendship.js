const db = require('./db')

const create = async (user_id, friend) => {
    const exists = await db('fiendship').count().where({ user_id, friend })

    if (exists) {
        return
    }

    return db('friendships').insert({
        user_id,
        friend
    })
}


const del = async (user_id, friend) => {
    return await db('fiendship').delete().where({ user_id, friend })
}

const getAll = async (user_id) => {
    return await db('fiendship')
        .select()
        .where({ user_id, friend })
}

module.exports = {
    create,
    del,
    getAll
}
