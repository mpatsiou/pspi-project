const post = require('../models/post')

const getPost =  async (req, res) => {
    if (!req.query.id) {
        res.status(400).json({statusText: "Invalid Data"})
        return
    }

    const p = await post.get(req.query.id)
    return p ? res.json(p) : res.status(404).json({statusText: "Post Not Found"})
}

const createPost =  async (req, res) => {
    if (!req.body.content || !req.body.userId) {
        res.status(400).json({statusText: "Invalid Data"})
        return
    }

    await post.create(req.body.userId, req.body.content)

    res.json({statusText: "Post created"})
}

const updatePost = async (req, res) => {
    if (!req.body.content || !req.body.id) {
        res.status(400).json({statusText: "Invalid Data"})
        return
    }

    if (await post.update(req.body.id, {content: req.body.content})) {
        res.json({statusText: "Post updated"})
        return
    }

    res.status(400).json({statusText: "Invalid id given"})
}

const deletePost = async (req, res) => {
    if (!req.body.id) {
        res.status(400).json({statusText: "Invalid Id"})
        return
    }

    await post.del(req.body.id)
    res.json({statusText: "Post deleted"})
}

module.exports = {
    getPost,
    createPost,
    updatePost,
    deletePost
}