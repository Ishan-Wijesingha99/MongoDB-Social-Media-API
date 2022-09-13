const express = require('express')
const router = express.Router()

const Reaction = require('../models/Reaction')
const Thought = require('../models/Thought')
const User = require('../models/User')



// GET routes





// POST routes

// add user to database
router.post('/adduser', async (req, res) => {
    try {
        let newUser

        if(req.body.username && req.body.email) {
            newUser = new User({
                username: req.body.username,
                email: req.body.email
            })
        }

        const returnedUser = await newUser.save()

        res.status(200).json(returnedUser)

    } catch (error) {
        res.status(400).json({ message: error.message})
    }
})





// PUT routes



// DELETE routes




module.exports = router