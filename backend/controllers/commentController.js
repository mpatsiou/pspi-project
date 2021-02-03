const Comment = require('../models/comment')

const getComment = async  (req, res) => {
    if (!req.query.post_id) {
        return res.status(400).json({statusText: "Invalid Data"})
    }

    const comments = await Comment.getAllForPost(req.query.post_id)
    req.json({comments})
}

const createComment = async (req, res) => {
    if (!req.query.post_id || !req.query.content) {
        return res.status(400).json({statusText: "Invalid Data"})
    }

    await Comment.create(req.user.id, req.body.post_id, req.body.content)
    req.json({'statusText': "Comment created"})
}

const deleteComment = async (req, res) => {
    if (!req.query.post_id) {
        return res.status(400).json({statusText: "Invalid Data"})
    }

    await Comment.del(req.body.post_id)
    req.json({'statusText': "Comment deleted"})
}

module.exports = {
    getComment,
    createComment,
    deleteComment
}
