// set up express router
const express = require('express')
const router = express.Router()

// import relevant models
const Reaction = require('../models/Reaction')
const Thought = require('../models/Thought')
const User = require('../models/User')



// middleware to find a user by userId
const getSingleUser = async function(req, res, next) {
    let singleUser

    try {
        singleUser = await User.findById(req.params.userId) 

        if(singleUser === null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

    res.user = singleUser
    next()
}

// middleware to find a thought by thoughtId
const getSingleThought = async function(req, res, next) {
    let singleThought

    try {
        singleThought = await Thought.findById(req.params.thoughtId) 

        if(singleThought === null) {
            return res.status(404).json({ message: 'Cannot find thought' })
        }
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

    res.thought = singleThought
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

// get user by userId
router.get('/users/:userId', getSingleUser, async (req, res) => {
    res.status(200).json(res.user)
})

// get all thoughts
router.get('/thoughts', async (req, res) => {
    try {
        const allThoughts = await Thought.find()

        res.status(200).json(allThoughts)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// get thought by thoughtId
router.get('/thoughts/:thoughtId', getSingleThought, async (req, res) => {
    res.status(200).json(res.thought)
})



// POST routes

// add user to User model
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

            if(req.body.thoughts.length !== 0) {
                req.body.thoughts.forEach(async (element) => {
                    const newThought = new Thought({
                        thoughtText: element,
                        username: req.body.username
                    })
                    
                    await newThought.save()
                })
            }
        }

        const returnedUser = await newUser.save()

        res.status(200).json(returnedUser)

    } catch (error) {
        res.status(400).json({ message: error.message})
    }
})

// add friend to user
router.post('/users/:userId/friends/:friendId', getSingleUser, async (req, res) => {

    if(!res.user) {
        return res.status(404).json({ message: 'user not found' })
    }

    try {
        res.user.friends.push(req.params.friendId)

        await res.user.save()

        res.status(200).json(res.user)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
})

// add thought to Thought model
router.post('/thoughts', async (req, res) => {

    let newThought

    try {
        const allUsers = await User.find()

        allUsers.forEach(async (element, i) => {

            console.log(element.username, '---', req.body.username)

            if(element.username === req.body.username) {

                if(req.body.thoughtText) {
                    newThought = new Thought({
                        username: req.body.username,
                        thoughtText: req.body.thoughtText
                    })
                }
        
                const returnedThought = await newThought.save()

                const currentUser = await User.findById(element._id.toString())
                currentUser.thoughts.push(returnedThought)

                await currentUser.save()
        
                return res.status(200).json(returnedThought)
            }

        })

    } catch (error) {
        res.status(400).json({ message: error.message})
    }
})

// add a reaction to Reaction model and to the particular thought
router.post('/thoughts/:thoughtId/reactions', getSingleThought, async (req, res) => {
    let newReaction

    try {
        const allUsers = await User.find()
    
        allUsers.forEach(async (element, i) => {
            if(element.username === req.body.username && req.body.reactionBody) {
                
                newReaction = new Reaction({
                    username: req.body.username,
                    reactionBody: req.body.reactionBody,
                    thoughtReactionId: res.thought._id.toString()
                })

                await newReaction.populate("thoughtReactionId")

                res.thought.reactions.push(newReaction._id.toString())

                await res.thought.save()

                const returnedReaction = await newReaction.save()

                res.status(200).json(returnedReaction)
            }

        })

    } catch (error) {
        res.status(400).json({ message: error.message})
    }

})



// PUT routes

// update a user by userId
router.put('/users/:userId', getSingleUser, async (req, res) => {
    if(req.body.username != null) {
        res.user.username = req.body.username
    }

    if(req.body.email != null) {
        res.user.email = req.body.email
    }

    if(req.body.thoughts != null) {
        res.user.thoughts = req.body.thoughts

        if(req.body.thoughts !== 0) {
            req.body.thoughts.forEach(async (element) => {

                const newThought = new Thought({
                    thoughtText: element,
                    username: res.user.username
                })

                await newThought.save()
            })
        }
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

// update a thought by thoughtId
router.put('/thoughts/:thoughtId', getSingleThought, async (req, res) => {

    if(req.body.username != null) {
        res.thought.username = req.body.username
    }

    if(req.body.thoughtText != null) {
        res.thought.thoughtText = req.body.thoughtText
    }

    try {
        const updatedThought = await res.thought.save()

        res.status(200).json(updatedThought)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})



// DELETE routes

// delete user by userId
router.delete('/users/:userId', getSingleUser, async (req, res) => {
    try {
        await res.user.remove()

        res.status(200).json({ message: 'Deleted user' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// delete friend from user
router.delete('/users/:userId/friends/:friendsId', getSingleUser, async (req, res) => {
    try {
        if(res.user.friends.length === 0) {
            return res.status(400).json({ message: 'This user has no friends' })
        }

        res.user.friends.forEach((element, i) => {
            if(element === req.params.friendsId) {
                res.user.friends.splice(i, 1)
            }
        })

        await res.user.save()

        res.status(200).json({ message: 'Deleted friend'})

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// delete thought by thoughtId
router.delete('/thoughts/:thoughtId', getSingleThought, async (req, res) => {
    try {
        await res.thought.remove()

        res.status(200).json({ message: 'Deleted thought' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// delete reaction from Reaction model and from reactions array of that single thought
router.delete('/thoughts/:thoughtId/reactions/:reactionId', getSingleThought, async (req, res) => {

    res.thought.reactions.forEach(async (element, i) => {
        if(element === req.params.reactionId) {
            res.thought.reactions.splice(i, 1)

            await res.thought.save()
        }
    })

    try {
        const currentReaction = await Reaction.findById(req.params.reactionId)

        await currentReaction.remove() 
        
        res.status(200).json({ message: "Reaction deleted" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})



module.exports = router