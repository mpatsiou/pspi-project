const db = require('./db')

const get = async () => {
    return await db('posts')
        .join('users', 'posts.user_id', 'users.id')
        .select('users.id', 'posts.id', 'posts.content', 'users.username')
        .orderBy('posts.id', 'desc')
}

const getOne = async (id) => {
    const post = await db('posts')
        .join('users', 'posts.user_id', 'users.id')
        .select('users.id as userId', 'posts.id', 'posts.content', 'users.username')
        .where('posts.id', id)

    return post[0]
}

const create = async (userId, content) => {
    console.log(userId)
    console.log(content)
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
    getOne,
    get,
    update,
    del,
}