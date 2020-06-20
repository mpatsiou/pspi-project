const Friendship = require('../models/friendship')

const getFriendships = async (req, res) => {
    const userId = req.query.id ? req.query.id : req.user.id

    const friendships = await Friendship.getAll(req.user.id)
    res.json({ friendships })
}

const createFriendship = async (req, res) => {
    if (!req.body.friend) {
        res.status(400).json({statusText: "Invalid Data"})
        return
    }

    await Friendship.create(req.user.id, req.body.friend)
    res.json({"statusText": "Friendship Created"})
}

const deleteFriendship = async (req, res) => {
    if (!req.body.friend) {
        res.status(400).json({statusText: "Invalid Data"})
        return
    }

    await Friendship.del(req.user.id, req.body.friend)
    res.json({"statusText": "Friendship deleted"})
}

module.exports = {
    getFriendships,
    createFriendship,
    deleteFriendship
}