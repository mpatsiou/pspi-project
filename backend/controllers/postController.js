const post = require('../models/post')

const getPost =  async (req, res) => {
    console.log("getting a Post")
}

const createPost =  async (req, res) => {
    if (!req.body.text || !req.body.userId) {
        res.status(400).json({statusText: "Invalid Data"})
        return
    }

    await post.create(req.body.userId, req.body.text)

    res.json({statusText: "Post created"})
}

const updatePost = async (req, res) => {
    if (!req.body.text || !req.body.id) {
        res.status(400).json({statusText: "Invalid Data"})
        return
    }

    if (await post.update(req.body.id, {text: req.body.text})) {
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
