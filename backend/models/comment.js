const db = require('./db')

const create = async (user_id, post_id, content) => {
    return db('comments').insert({
        post_id,
        user_id,
        content
    })
}

const del = async (comment_id) => {
    return db('comments').delete().where({ comment_id })
}

const getAllForPost = async (post_id) => {
    return db('comments')
        .select()
        .where({ post_id })
}

module.exports = {
    create,
    del,
    getAllForPost
}
