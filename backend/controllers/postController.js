const post = require('../models/post')

const getPost =  async (req, res) => {
    const p = await post.get()
    return res.json(p) 
}

const createPost =  async (req, res) => {
    if (!req.body.content) {
        res.status(400).json({statusText: "Invalid Data"})
        return
    }

    await post.create(req.user.id, req.body.content)

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

    if (req.user.role == 'normal') {
        const p  = await post.getOne(req.body.id)
        if (p['userId'] != req.user.id) {
            return res.status(401).json({statusText: "Unauthorized"})
        }
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