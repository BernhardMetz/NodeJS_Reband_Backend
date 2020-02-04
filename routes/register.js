const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

router.get('/',  (req, res) => {
    res.send('We are on Register page')
})

router.post('/', async (req, res) => {

    const user = new User({
        email: req.body.email,
        password: req.body.password
    })

    const saveUser = async () => {
        try {
            user.password = await bcrypt.hash(user.password, 10)
            const savedUser = await user.save()
            res.send(savedUser)
        } catch(err) {
            res.status(400).send({message: err})
        }
    }
    
    saveUser()
})

module.exports = router