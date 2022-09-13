const express = require('express')
const router = express.Router()

const Reaction = require('../models/Reaction')
const Thought = require('../models/Thought')
const User = require('../models/User')


// middleware to find a user by id
const getSingleUser = async function(req, res, next) {
    let singleUser

    try {

        singleUser = await User.findById(req.params.id) 

        if(singleUser === null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

    res.user = singleUser
    next()
}



// GET routes

// get all users in database
router.get('/users', async (req, res) => {
    try {
        const allUsers = await User.find()

        res.status(200).json(allUsers)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
})

// get user by id
router.get('/users/:id', getSingleUser, async (req, res) => {
    res.status(200).json(res.user)
})






// POST routes

// add user to database
router.post('/users', async (req, res) => {
    try {
        let newUser

        if(req.body.username && req.body.email) {
            newUser = new User({
                username: req.body.username,
                email: req.body.email
            })
        }

        if(req.body.friends) {
            newUser.friends = req.body.friends
        }

        if(req.body.thoughts) {
            newUser.thoughts = req.body.thoughts
        }

        const returnedUser = await newUser.save()

        res.status(200).json(returnedUser)

    } catch (error) {
        res.status(400).json({ message: error.message})
    }
})





// PUT routes

// update a user by id
router.put('/users/:id', getSingleUser, async (req, res) => {
    if(req.body.username != null) {
        res.user.username = req.body.username
    }

    if(req.body.email != null) {
        res.user.email = req.body.email
    }

    if(req.body.thoughts != null) {
        res.user.thoughts = req.body.thoughts
    }

    if(req.body.friends != null) {
        res.user.friends = req.body.friends
    }

    try {
        const updatedUser = await res.user.save()

        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})





// DELETE routes

// delete a user by id
router.delete('/users/:id', getSingleUser, async (req, res) => {
    try {
        await res.user.remove()

        res.status(200).json({ message: 'Deleted user' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})






module.exports = router