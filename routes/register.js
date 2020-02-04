const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/',  (req, res) => {
    res.send('We are on Register page')
})

router.post('/', async (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })

    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch(err) {
        res.status(400).send({message: err})
    }
})

module.exports = router