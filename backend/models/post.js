const db = require('./db')

const get = async (id) => {
    const res = await db('posts').select().where({ id })

    if (res.length == 0) {
        return null
    }
    const {user_id, content} = res[0]
    return {userId: user_id , content, id}
}

const create = async (userId, content) => {
    return db('posts').insert({
        user_id: userId,
        content,
        likes: 0
    })
}


const del = async (id) => {
    return db('posts')
        .delete()
        .where({id})
}

const update = async (id, params) => {
    const res = await db('posts').update(params).where({ id }).limit(1)

    return res == 1
}

module.exports = {
    create,
    get,
    update,
    del,
}